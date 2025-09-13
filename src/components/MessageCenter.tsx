import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Send, 
  ArrowLeft,
  Users,
  Zap
} from 'lucide-react';
import { useMessages, useConversationMessages } from '@/hooks/useMessages';
import { useAuth } from '@/contexts/AuthContext';
import { ConversationWithParticipants } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';

interface MessageCenterProps {
  onClose?: () => void;
}

const MessageCenter = ({ onClose }: MessageCenterProps) => {
  const { profile } = useAuth();
  const { conversations, loading, sendMessage, markAsRead } = useMessages();
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithParticipants | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, loading: messagesLoading } = useConversationMessages(
    selectedConversation?.id || null
  );

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSelectConversation = async (conversation: ConversationWithParticipants) => {
    setSelectedConversation(conversation);
    await markAsRead(conversation.id);
  };

  const handleSendMessage = async () => {
    if (!selectedConversation || !newMessage.trim()) return;

    try {
      await sendMessage(selectedConversation.id, newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getOtherParticipant = (conversation: ConversationWithParticipants) => {
    return conversation.participant_1_profile.id === profile?.id
      ? conversation.participant_2_profile
      : conversation.participant_1_profile;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[600px] bg-background border rounded-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Messages</h3>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        
        <ScrollArea className="h-[calc(600px-73px)]">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No conversations yet</p>
            </div>
          ) : (
            <div className="p-2">
              {conversations.map((conversation) => {
                const otherParticipant = getOtherParticipant(conversation);
                return (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation?.id === conversation.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={otherParticipant.profile_picture_url} />
                        <AvatarFallback>
                          {otherParticipant.user_type === 'investor' ? (
                            <Users className="w-5 h-5" />
                          ) : (
                            <Zap className="w-5 h-5" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm text-foreground truncate">
                            {otherParticipant.full_name}
                          </p>
                          {conversation.unread_count! > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {conversation.unread_count}
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs mb-1">
                          {otherParticipant.user_type}
                        </Badge>
                        {conversation.last_message && (
                          <p className="text-xs text-muted-foreground truncate">
                            {conversation.last_message.content}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={getOtherParticipant(selectedConversation).profile_picture_url} />
                  <AvatarFallback>
                    {getOtherParticipant(selectedConversation).user_type === 'investor' ? (
                      <Users className="w-5 h-5" />
                    ) : (
                      <Zap className="w-5 h-5" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">
                    {getOtherParticipant(selectedConversation).full_name}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {getOtherParticipant(selectedConversation).user_type}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              {messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Start the conversation!</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isOwn = message.sender_id === profile?.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            isOwn
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                          }`}>
                            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-foreground mb-2">Select a conversation</p>
              <p className="text-muted-foreground">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter;
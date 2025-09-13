import { useState, useEffect } from 'react';
import { supabase, ConversationWithParticipants, MessageWithSender } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export const useMessages = () => {
  const { profile } = useAuth();
  const [conversations, setConversations] = useState<ConversationWithParticipants[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchConversations();
      subscribeToMessages();
    }
  }, [profile]);

  const fetchConversations = async () => {
    if (!profile) return;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          participant_1_profile:participant_1(id, full_name, user_type, profile_picture_url),
          participant_2_profile:participant_2(id, full_name, user_type, profile_picture_url)
        `)
        .or(`participant_1.eq.${profile.id},participant_2.eq.${profile.id}`)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Fetch last message and unread count for each conversation
      const conversationsWithDetails = await Promise.all(
        data.map(async (conv) => {
          const { data: lastMessage } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          const { count: unreadCount } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('conversation_id', conv.id)
            .neq('sender_id', profile.id)
            .is('read_at', null);

          return {
            ...conv,
            last_message: lastMessage,
            unread_count: unreadCount || 0,
          };
        })
      );

      setConversations(conversationsWithDetails);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    if (!profile) return;

    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const createConversation = async (otherUserId: string) => {
    if (!profile) throw new Error('No profile found');

    // Check if conversation already exists
    const { data: existing } = await supabase
      .from('conversations')
      .select('*')
      .or(
        `and(participant_1.eq.${profile.id},participant_2.eq.${otherUserId}),and(participant_1.eq.${otherUserId},participant_2.eq.${profile.id})`
      )
      .single();

    if (existing) {
      return existing.id;
    }

    // Create new conversation
    const { data, error } = await supabase
      .from('conversations')
      .insert([{
        participant_1: profile.id,
        participant_2: otherUserId,
      }])
      .select()
      .single();

    if (error) throw error;

    await fetchConversations();
    return data.id;
  };

  const sendMessage = async (conversationId: string, content: string) => {
    if (!profile) throw new Error('No profile found');

    const { error } = await supabase
      .from('messages')
      .insert([{
        conversation_id: conversationId,
        sender_id: profile.id,
        content,
      }]);

    if (error) throw error;

    // Update conversation timestamp
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);
  };

  const markAsRead = async (conversationId: string) => {
    if (!profile) return;

    await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_id', profile.id)
      .is('read_at', null);

    await fetchConversations();
  };

  return {
    conversations,
    loading,
    createConversation,
    sendMessage,
    markAsRead,
    refreshConversations: fetchConversations,
  };
};

export const useConversationMessages = (conversationId: string | null) => {
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
      subscribeToMessages();
    }
  }, [conversationId]);

  const fetchMessages = async () => {
    if (!conversationId) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id(id, full_name, user_type, profile_picture_url)
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToMessages = () => {
    if (!conversationId) return;

    const subscription = supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  return {
    messages,
    loading,
    refreshMessages: fetchMessages,
  };
};
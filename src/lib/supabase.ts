import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
  profile_picture_url?: string;
  user_type: 'investor' | 'founder';
  created_at: string;
  updated_at: string;
}

export interface InvestorPreferences {
  id: string;
  profile_id: string;
  investor_type: string;
  investment_sectors: string[];
  stage_preferences: string[];
  min_investment_amount?: number;
  max_investment_amount?: number;
  created_at: string;
  updated_at: string;
}

export interface FounderCompany {
  id: string;
  profile_id: string;
  company_name: string;
  industry: string;
  startup_stage: string;
  location: string;
  company_description: string;
  website?: string;
  linkedin?: string;
  other_links?: string;
  amount_raised: number;
  funding_required: number;
  key_investors?: string;
  team_size: number;
  key_members: string;
  investor_types: string[];
  preferred_investment_size?: string;
  target_geographies: string[];
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  participant_1: string;
  participant_2: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  read_at?: string;
}

export interface ConversationWithParticipants extends Conversation {
  participant_1_profile: Profile;
  participant_2_profile: Profile;
  last_message?: Message;
  unread_count?: number;
}

export interface MessageWithSender extends Message {
  sender: Profile;
}
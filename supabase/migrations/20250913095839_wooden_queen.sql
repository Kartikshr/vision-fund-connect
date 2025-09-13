/*
  # Create users and messaging system

  1. New Tables
    - `profiles` - User profiles for both investors and founders
    - `conversations` - Conversation threads between users
    - `messages` - Individual messages in conversations
    - `investor_preferences` - Investor investment preferences
    - `founder_companies` - Founder company information

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for messaging between users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  phone text,
  profile_picture_url text,
  user_type text NOT NULL CHECK (user_type IN ('investor', 'founder')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create investor preferences table
CREATE TABLE IF NOT EXISTS investor_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  investor_type text NOT NULL,
  investment_sectors text[] DEFAULT '{}',
  stage_preferences text[] DEFAULT '{}',
  min_investment_amount numeric DEFAULT 0,
  max_investment_amount numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create founder companies table
CREATE TABLE IF NOT EXISTS founder_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  industry text NOT NULL,
  startup_stage text NOT NULL,
  location text NOT NULL,
  company_description text NOT NULL,
  website text,
  linkedin text,
  other_links text,
  amount_raised numeric DEFAULT 0,
  funding_required numeric NOT NULL,
  key_investors text,
  team_size integer DEFAULT 1,
  key_members text,
  investor_types text[] DEFAULT '{}',
  preferred_investment_size text,
  target_geographies text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_1 uuid REFERENCES profiles(id) ON DELETE CASCADE,
  participant_2 uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(participant_1, participant_2)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read_at timestamptz
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE founder_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read other profiles for messaging"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Investor preferences policies
CREATE POLICY "Users can manage own investor preferences"
  ON investor_preferences
  FOR ALL
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Founder companies policies
CREATE POLICY "Users can manage own company info"
  ON founder_companies
  FOR ALL
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can read company info for discovery"
  ON founder_companies
  FOR SELECT
  TO authenticated
  USING (true);

-- Conversations policies
CREATE POLICY "Users can read own conversations"
  ON conversations
  FOR SELECT
  TO authenticated
  USING (
    participant_1 IN (SELECT id FROM profiles WHERE user_id = auth.uid()) OR
    participant_2 IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create conversations"
  ON conversations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    participant_1 IN (SELECT id FROM profiles WHERE user_id = auth.uid()) OR
    participant_2 IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Messages policies
CREATE POLICY "Users can read messages in their conversations"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE participant_1 IN (SELECT id FROM profiles WHERE user_id = auth.uid())
         OR participant_2 IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their conversations"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()) AND
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE participant_1 IN (SELECT id FROM profiles WHERE user_id = auth.uid())
         OR participant_2 IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can update their own messages"
  ON messages
  FOR UPDATE
  TO authenticated
  USING (sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_conversations_participants ON conversations(participant_1, participant_2);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investor_preferences_updated_at BEFORE UPDATE ON investor_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_founder_companies_updated_at BEFORE UPDATE ON founder_companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
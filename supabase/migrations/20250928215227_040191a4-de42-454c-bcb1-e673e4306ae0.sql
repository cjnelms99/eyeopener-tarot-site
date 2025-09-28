-- Fix foreign key constraint for readings table
-- Drop the existing constraint that references auth.users
ALTER TABLE public.readings DROP CONSTRAINT IF EXISTS readings_user_id_fkey;

-- Add proper foreign key constraint referencing profiles table
ALTER TABLE public.readings 
ADD CONSTRAINT readings_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;
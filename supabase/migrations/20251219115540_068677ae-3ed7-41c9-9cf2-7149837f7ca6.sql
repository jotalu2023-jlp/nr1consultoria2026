-- Add foreign key constraint on downloads_log.user_id
ALTER TABLE public.downloads_log 
ADD CONSTRAINT downloads_log_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_downloads_log_user_id ON public.downloads_log(user_id);

-- Add CHECK constraints on documents table for input length limits
ALTER TABLE public.documents
ADD CONSTRAINT documents_title_length CHECK (char_length(title) <= 200),
ADD CONSTRAINT documents_description_length CHECK (description IS NULL OR char_length(description) <= 2000);

-- Add CHECK constraint on profiles table for name length
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_full_name_length CHECK (full_name IS NULL OR char_length(full_name) <= 100);
-- Make storage buckets private
UPDATE storage.buckets SET public = false WHERE id IN ('documents', 'videos');
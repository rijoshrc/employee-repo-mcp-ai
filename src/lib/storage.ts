import { supabase } from "@/lib/supabase";

// Storage bucket names
export const STORAGE_BUCKETS = {
  USER_AVATARS: "user-avatars",
  CHAT_FILES: "chat-files",
  EXPORTS: "exports",
  TEMP: "temp",
} as const;

// Initialize storage buckets
export const initializeStorage = async () => {
  try {
    // Create user avatars bucket
    await supabase.storage.createBucket(STORAGE_BUCKETS.USER_AVATARS, {
      public: false,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
      fileSizeLimit: 5242880, // 5MB
    });

    // Create chat files bucket
    await supabase.storage.createBucket(STORAGE_BUCKETS.CHAT_FILES, {
      public: false,
      allowedMimeTypes: [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      fileSizeLimit: 10485760, // 10MB
    });

    // Create exports bucket
    await supabase.storage.createBucket(STORAGE_BUCKETS.EXPORTS, {
      public: false,
      allowedMimeTypes: ["application/json", "text/csv", "application/pdf"],
      fileSizeLimit: 52428800, // 50MB
    });

    // Create temp bucket
    await supabase.storage.createBucket(STORAGE_BUCKETS.TEMP, {
      public: false,
      allowedMimeTypes: ["*/*"],
      fileSizeLimit: 10485760, // 10MB
    });

    console.log("Storage buckets initialized successfully");
  } catch (error) {
    console.error("Error initializing storage buckets:", error);
  }
};

// File upload utilities
export const uploadFile = async (
  bucket: string,
  path: string,
  file: File,
  options?: {
    cacheControl?: string;
    upsert?: boolean;
  }
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, options);

  if (error) throw error;
  return data;
};

export const getFileUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
};

export const deleteFile = async (bucket: string, path: string) => {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) throw error;
};

export const listFiles = async (bucket: string, path?: string) => {
  const { data, error } = await supabase.storage.from(bucket).list(path);

  if (error) throw error;
  return data;
};

// Storage policies (to be applied via SQL)
export const STORAGE_POLICIES = `
-- User avatars bucket policies
CREATE POLICY "Users can view own avatars" ON storage.objects
  FOR SELECT USING (
    bucket_id = '${STORAGE_BUCKETS.USER_AVATARS}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload own avatars" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = '${STORAGE_BUCKETS.USER_AVATARS}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own avatars" ON storage.objects
  FOR UPDATE USING (
    bucket_id = '${STORAGE_BUCKETS.USER_AVATARS}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own avatars" ON storage.objects
  FOR DELETE USING (
    bucket_id = '${STORAGE_BUCKETS.USER_AVATARS}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Chat files bucket policies
CREATE POLICY "Users can view chat files" ON storage.objects
  FOR SELECT USING (
    bucket_id = '${STORAGE_BUCKETS.CHAT_FILES}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload chat files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = '${STORAGE_BUCKETS.CHAT_FILES}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete chat files" ON storage.objects
  FOR DELETE USING (
    bucket_id = '${STORAGE_BUCKETS.CHAT_FILES}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Exports bucket policies
CREATE POLICY "Users can view own exports" ON storage.objects
  FOR SELECT USING (
    bucket_id = '${STORAGE_BUCKETS.EXPORTS}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload exports" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = '${STORAGE_BUCKETS.EXPORTS}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own exports" ON storage.objects
  FOR DELETE USING (
    bucket_id = '${STORAGE_BUCKETS.EXPORTS}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Temp bucket policies (auto-cleanup after 24 hours)
CREATE POLICY "Users can upload temp files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = '${STORAGE_BUCKETS.TEMP}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete temp files" ON storage.objects
  FOR DELETE USING (
    bucket_id = '${STORAGE_BUCKETS.TEMP}' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );
`;


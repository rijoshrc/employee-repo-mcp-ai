export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  podio_user_id?: number;
  podio_access_token?: string;
  podio_refresh_token?: string;
  podio_token_expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  podio_item_id: number;
  title?: string;
  status: "active" | "archived" | "deleted";
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  session_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  reasoning?: string;
  mcp_tools_used?: Record<string, unknown>;
  gemini_model_used?: string;
  token_usage?: number;
  created_at: string;
}

export interface PodioCache {
  id: string;
  user_id: string;
  cache_key: string;
  cache_data: Record<string, unknown>;
  expires_at: string;
  created_at: string;
}

export interface File {
  id: string;
  user_id: string;
  session_id?: string;
  podio_file_id?: number;
  file_name: string;
  file_size?: number;
  mime_type?: string;
  storage_path?: string;
  created_at: string;
}

export interface SystemSetting {
  id: string;
  setting_key: string;
  setting_value: Record<string, unknown>;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Database enums
export type ChatSessionStatus = "active" | "archived" | "deleted";
export type MessageRole = "user" | "assistant" | "system";

// Insert types (for creating new records)
export type UserInsert = Omit<User, "id" | "created_at" | "updated_at">;
export type ChatSessionInsert = Omit<
  ChatSession,
  "id" | "created_at" | "updated_at"
>;
export type MessageInsert = Omit<Message, "id" | "created_at">;
export type PodioCacheInsert = Omit<PodioCache, "id" | "created_at">;
export type FileInsert = Omit<File, "id" | "created_at">;
export type SystemSettingInsert = Omit<
  SystemSetting,
  "id" | "created_at" | "updated_at"
>;

// Update types (for updating existing records)
export type UserUpdate = Partial<
  Omit<User, "id" | "created_at" | "updated_at">
>;
export type ChatSessionUpdate = Partial<
  Omit<ChatSession, "id" | "created_at" | "updated_at">
>;
export type MessageUpdate = Partial<Omit<Message, "id" | "created_at">>;
export type PodioCacheUpdate = Partial<Omit<PodioCache, "id" | "created_at">>;
export type FileUpdate = Partial<Omit<File, "id" | "created_at">>;
export type SystemSettingUpdate = Partial<
  Omit<SystemSetting, "id" | "created_at" | "updated_at">
>;

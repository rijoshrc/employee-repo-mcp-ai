import { supabase } from "@/lib/supabase";
import type {
  User,
  UserInsert,
  UserUpdate,
  ChatSession,
  ChatSessionInsert,
  ChatSessionUpdate,
  Message,
  MessageInsert,
  MessageUpdate,
  PodioCache,
  PodioCacheInsert,
  File,
  FileInsert,
  SystemSetting,
  SystemSettingInsert,
} from "@/types/database";

// User operations
export const userService = {
  async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;
    return data;
  },

  async createUser(userData: UserInsert): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .insert(userData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateUser(id: string, updates: UserUpdate): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// Chat session operations
export const chatSessionService = {
  async getSessions(): Promise<ChatSession[]> {
    const { data, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getSession(id: string): Promise<ChatSession | null> {
    const { data, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createSession(sessionData: ChatSessionInsert): Promise<ChatSession> {
    const { data, error } = await supabase
      .from("chat_sessions")
      .insert(sessionData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSession(
    id: string,
    updates: ChatSessionUpdate
  ): Promise<ChatSession> {
    const { data, error } = await supabase
      .from("chat_sessions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSession(id: string): Promise<void> {
    const { error } = await supabase
      .from("chat_sessions")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};

// Message operations
export const messageService = {
  async getMessages(sessionId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async createMessage(messageData: MessageInsert): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .insert(messageData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateMessage(id: string, updates: MessageUpdate): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// Podio cache operations
export const podioCacheService = {
  async getCacheEntry(key: string): Promise<PodioCache | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("podio_cache")
      .select("*")
      .eq("user_id", user.id)
      .eq("cache_key", key)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (error) return null;
    return data;
  },

  async setCacheEntry(cacheData: PodioCacheInsert): Promise<PodioCache> {
    const { data, error } = await supabase
      .from("podio_cache")
      .upsert(cacheData, { onConflict: "user_id,cache_key" })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async clearExpiredCache(): Promise<void> {
    const { error } = await supabase
      .from("podio_cache")
      .delete()
      .lt("expires_at", new Date().toISOString());

    if (error) throw error;
  },
};

// File operations
export const fileService = {
  async getFiles(sessionId?: string): Promise<File[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    let query = supabase.from("files").select("*").eq("user_id", user.id);

    if (sessionId) {
      query = query.eq("session_id", sessionId);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;
    return data || [];
  },

  async createFile(fileData: FileInsert): Promise<File> {
    const { data, error } = await supabase
      .from("files")
      .insert(fileData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteFile(id: string): Promise<void> {
    const { error } = await supabase.from("files").delete().eq("id", id);

    if (error) throw error;
  },
};

// System settings operations
export const systemSettingService = {
  async getSetting(key: string): Promise<SystemSetting | null> {
    const { data, error } = await supabase
      .from("system_settings")
      .select("*")
      .eq("setting_key", key)
      .single();

    if (error) return null;
    return data;
  },

  async setSetting(settingData: SystemSettingInsert): Promise<SystemSetting> {
    const { data, error } = await supabase
      .from("system_settings")
      .upsert(settingData, { onConflict: "setting_key" })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

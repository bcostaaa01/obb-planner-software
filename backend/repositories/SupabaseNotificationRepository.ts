import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { NotificationRepository, Notification } from "../types/Notifications";
import dotenv from "dotenv";
import path from "path";
import { config } from "../config";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// The repository layer is responsible for interacting with the database.
export class SupabaseNotificationRepository implements NotificationRepository {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(config.supabase.url, config.supabase.key);
  }

  async create(notification: Notification): Promise<Notification> {
    const { data, error } = await this.supabase
      .from("notifications")
      .insert(notification)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    const { data, error } = await this.supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId);
    if (error) throw error;
    return data;
  }

  async markAsRead(id: string): Promise<void> {
    const { error } = await this.supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);
    if (error) throw error;
  }
}

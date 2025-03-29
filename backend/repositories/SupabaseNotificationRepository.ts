import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NotificationRepository, Notification } from '../types/Notifications';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

// The repository layer is responsible for interacting with the database.
export class SupabaseNotificationRepository implements NotificationRepository {

    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_ANON_KEY!
        );
    }

    async create(notification: Notification): Promise<Notification> {
        const { data, error } = await this.supabase.from('notifications').insert(notification).select().single();
        if (error) throw error;
        return data;
    }

    async findByUserId(userId: string): Promise<Notification[]> {
        const { data, error } = await this.supabase.from('notifications').select('*').eq('user_id', userId);
        if (error) throw error;
        return data;
    }

    async markAsRead(id: string): Promise<void> {
        const { error } = await this.supabase.from('notifications').update({ read: true }).eq('id', id);
        if (error) throw error;
    }
}

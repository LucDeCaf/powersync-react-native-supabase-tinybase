import { PowerSyncDatabase } from '@powersync/react-native';
import { AppSchema } from './schema';
import { SupabaseConnector } from './connector';
import { supabase } from './supabase';
import { config } from './config';

export const powersync = new PowerSyncDatabase({
    schema: AppSchema,
    database: {
        dbFilename: 'sqlite.db',
    },
});

export async function openConnection() {
    /**
     * In a real application, this function would be called after the user logs in with their own details and a login screen.
     * For demo purposes, the login screen is skipped and instead the user's details are configured in .env.local.
     */
    const {
        data: { user },
        error,
    } = await supabase.auth.signInWithPassword({
        email: config.userEmail,
        password: config.userPassword,
    });

    if (!user || error) {
        throw new Error('Failed to login to Supabase');
    }

    await powersync.connect(new SupabaseConnector());

    // Return user object for convenience
    return user;
}

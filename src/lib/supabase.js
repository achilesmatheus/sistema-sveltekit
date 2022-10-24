import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/static/public';

export const supabaseClient = createClient(
	import.meta.env.PUBLIC_SUPABASE_URL ?? '',
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? ''
);

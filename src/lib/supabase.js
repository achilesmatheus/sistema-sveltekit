import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';

export const supabaseClient = createClient(
	'https://onwawyyanpyojbwqjnqt.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ud2F3eXlhbnB5b2pid3FqbnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTExODEwNjUsImV4cCI6MTk2Njc1NzA2NX0.TflXXOV-7sHC6eLK09TVAnVz-jAaKlEJyAz6Uyzs0ls'
);

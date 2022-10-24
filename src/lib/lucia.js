// import lucia from 'lucia-sveltekit';
// import supabase from '@lucia-sveltekit/adapter-supabase';
// import { dev } from '$app/environment';
// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// const supabaseURL = 'https://onwawyyanpyojbwqjnqt.supabase.co';
// const supabaseSecret =
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ud2F3eXlhbnB5b2pid3FqbnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTExODEwNjUsImV4cCI6MTk2Njc1NzA2NX0.TflXXOV-7sHC6eLK09TVAnVz-jAaKlEJyAz6Uyzs0ls';

// export const auth = lucia({
// 	adapter: supabase(supabaseURL, supabaseSecret, (error) => console.log('Postgres Error', error)),
// 	env: dev ? 'DEV' : 'PROD'
// });

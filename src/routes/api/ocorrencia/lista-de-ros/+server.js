import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export async function GET(event) {
	const { supabaseClient, session } = await getSupabase(event);

	try {
		const { error, data } = await supabaseClient
			.from('ocorrencias')
			.select()
			.eq('user_id', session.user.id);

		if (error) throw new Error('Não foi possível buscar a lista de ocorrências');

		return new Response(JSON.stringify({ data }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 400 });
	}
}

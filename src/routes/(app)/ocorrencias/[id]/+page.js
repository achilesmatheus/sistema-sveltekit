import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const { supabaseClient } = await getSupabase(event);
	const roNumber = event.params.id;
	try {
		const { data, error } = await supabaseClient.from('ocorrencias').select('*').eq('ro', roNumber);

		if (error) throw new Error("Não foi possível buscar a lista de Ro's");

		return { roNumber: data };
	} catch (e) {
		throw error(404, e.message);
	}
}

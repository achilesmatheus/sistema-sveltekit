import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export async function load(event) {
	const { supabaseClient } = await getSupabase(event);

	try {
		const { data, error } = await supabaseClient.from('ocorrencias').select();

		if (error) throw new Error("Não foi possível buscar os dados dos RO's");

		return { ocorrenciasTable: data };
	} catch (error) {
		return { error: error.message };
	}
}

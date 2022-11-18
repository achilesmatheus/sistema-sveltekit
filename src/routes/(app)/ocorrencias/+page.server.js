import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { invalid } from '@sveltejs/kit';

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

/** @type {import('./$types').Actions} */
export const actions = {
	async default(event) {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);

		const { data } = await supabaseClient.from('ocorrencias').select();

		// return { result };
	}
};

// export async function load(event) {
// 	const { supabaseClient } = await getSupabase(event);

// 	const { data, error } = await supabaseClient.from('ocorrencias').select();

// 	if (error) {
// 		return invalid(404, { error: error.message });
// 	}

// 	const [result] = data;
// 	console.log(result);

// 	console.log(new Date(result.created_at).getHours());
// 	console.log(new Date(result.updated_at).getHours());
// }

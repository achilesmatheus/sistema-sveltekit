import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { invalid } from '@sveltejs/kit';

//

export const actions = {
	async default(event) {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);

		const { data } = await supabaseClient.from('ocorrencias').select();

		// return { result };
	}
};

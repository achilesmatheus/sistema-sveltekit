import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { invalid } from '@sveltejs/kit';

export const actions = {
	async default(event) {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email');

		if (!email) {
			return invalid(400, {
				error: 'Digite seu email'
			});
		}

		const { error } = await supabaseClient.auth.updateUser({ email });

		if (error) {
			return invalid(500, {
				error: error.message,
				values: {
					email
				}
			});
		}

		return { success: 'Foi enviado um link para seu novo email.' };
	}
};

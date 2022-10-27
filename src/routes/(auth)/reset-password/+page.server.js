import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { invalid } from '@sveltejs/kit';

export const actions = {
	async default(event) {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const password = formData.get('senha');
		const confirm_password = formData.get('confirme_sua_senha');

		if (!password) {
			return invalid(400, {
				error: 'Digite a senha'
			});
		}
		if (!confirm_password) {
			return invalid(400, {
				error: 'Digite a senha'
			});
		}
		if (password !== confirm_password) {
			return invalid(400, {
				error: 'As senhas devem ser iguais'
			});
		}

		const { data, error } = await supabaseClient.auth.updateUser({ password });

		if (error) {
			if (error.status === 400) {
				return invalid(400, {
					error: error.message
				});
			}

			return invalid(500, {
				error: error.message,
				values: error.message
			});
		}
		// return { success: data };
		console.log(data);
		return { success: 'Senha atualizada' };
	}
};

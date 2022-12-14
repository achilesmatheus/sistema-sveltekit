import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { invalid, redirect } from '@sveltejs/kit';

export const actions = {
	async default(event) {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		if (!email) {
			return invalid(400, {
				error: 'Digite seu email'
			});
		}
		if (!password) {
			return invalid(400, {
				error: 'Digite sua senha',
				values: {
					email
				}
			});
		}

		const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

		if (error) {
			if (error.status === 400) {
				return invalid(400, {
					error: 'Login ou senha incorretos',
					values: {
						email
					}
				});
			}

			return invalid(500, {
				error: 'Erro no servidor. Tente novamente' + error.message,
				values: {
					email
				}
			});
		}

		throw redirect(303, '/profile');
	}
};

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

		const { data, error } = await supabaseClient
			.from('profiles')
			.select('email')
			.eq('email', email);

		if (error) return invalid(400, { error: error.message });

		if (data) {
			// Se o email não existir, 'data' retorna um array vazio.
			if (data.length === 0) return invalid(404, { error: 'Email não encontrado' });

			// Se o email for encontrado, significa que o usuário está cadastrado
			// e então podemos enviar um email de 'password reset'.
			const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
				redirectTo: 'http://localhost:5173/reset-password'
			});

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
		}

		// throw redirect(303, '/reset-password');
		return { success: 'Acesse seu email e clique no link de confirmação!' };
	}
};

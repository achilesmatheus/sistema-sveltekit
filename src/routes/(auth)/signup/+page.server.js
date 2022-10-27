import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { invalid } from '@sveltejs/kit';
import { GCM_SUPER_ADMIN } from '../../../lib/constants';

export const actions = {
	async default(event) {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('senha');
		const confirm_password = formData.get('confirme_sua_senha');
		const phone = formData.get('telefone');
		const full_name = formData.get('nome_completo');
		const war_name = formData.get('nome_de_guerra');
		const registration_number = formData.get('matricula');

		if (!email) {
			return invalid(400, {
				error: 'Digite seu email'
			});
		}
		if (!password) {
			return invalid(400, {
				error: 'Digite sua senha'
			});
		}
		if (!confirm_password) {
			return invalid(400, {
				error: 'Digite sua a confirmação de senha'
			});
		}
		if (!full_name) {
			return invalid(400, {
				error: 'Digite sua senha'
			});
		}
		if (!war_name) {
			return invalid(400, {
				error: 'Digite sua senha'
			});
		}
		if (!registration_number) {
			return invalid(400, {
				error: 'Digite sua matrícula'
			});
		}

		const { error } = await supabaseClient.auth.signUp({
			email,
			password,
			options: {
				data: {
					full_name,
					war_name,
					phone,
					email,
					registration_number,
					role: GCM_SUPER_ADMIN
				}
			}
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

		return { success: 'Acesse seu email e clique no link de confirmação!' };
	}
};

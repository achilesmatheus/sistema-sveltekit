import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { invalid } from '@sveltejs/kit';

export const actions = {
	editProfile: async (event) => {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const fullName = formData.get('full_name');
		const warName = formData.get('war_name');
		const registrationNumber = formData.get('registration_number');
		const phone = formData.get('phone');

		if (!fullName) {
			return invalid(400, {
				editProfile: { error: 'Digite seu nome' }
			});
		}
		if (!warName) {
			return invalid(400, {
				editProfile: { error: 'Digite seu nom de Guerra' }
			});
		}
		if (!registrationNumber) {
			return invalid(400, {
				editProfile: { error: 'Digite sua matrícula' }
			});
		}
		if (!phone) {
			return invalid(400, {
				editProfile: { error: 'Digite seu telefone' }
			});
		}

		const {
			data: { user }
		} = await supabaseClient.auth.getUser();

		const { error } = await supabaseClient
			.from('profiles')
			.update({
				full_name: fullName,
				war_name: warName,
				registration_number: registrationNumber,
				phone
			})
			.eq('id', user.id);

		if (error) {
			return invalid(500, {
				editProfile: { error: error.message }
			});
		}

		return { editProfile: { success: 'Perfil atualizado.' } };
	},

	editEmail: async (event) => {
		const { request } = event;
		const { supabaseClient } = await getSupabase(event);
		const formData = await request.formData();

		const email = formData.get('email');

		if (!email) {
			return invalid(400, {
				editEmail: { error: 'Digite seu email' }
			});
		}

		const { error } = await supabaseClient.auth.updateUser({ email });

		if (error) {
			return invalid(500, {
				editEmail: {
					error: error.message
				}
			});
		}

		return { editEmail: { success: 'Foi enviado um link para seu novo email.' } };
	}
};

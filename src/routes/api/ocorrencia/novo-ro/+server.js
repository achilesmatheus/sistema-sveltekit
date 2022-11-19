import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { status } from '$lib/constants';

// export async function GET(event) {
// 	const { supabaseClient } = await getSupabase(event);

// 	const { error, data } = await supabaseClient
// 		.rpc('ocorrencias_por_dia', { datadaocorrencia: new Date(Date.now()) })
// 		.select();

// 	if (error) {
// 		return new Response(JSON.stringify(error), { status: 400 });
// 	}

// 	const date = new Date(Date.now());
// 	const day = date.getDate();
// 	const month = date.getMonth() + 1;
// 	const year = date.getFullYear().toString().slice(-2);

// 	const formatedMonth = month < 10 ? `0${month}` : month;
// 	const formatedDay = day < 10 ? `0${day}` : day;

// 	const numberOfROs = data;
// 	const nextRONumber = numberOfROs + 1;

// 	const roNumber = String(nextRONumber).padStart(4, '0');
// 	const RO = `RO${year}-${formatedMonth}${formatedDay}-${roNumber}`;

// 	return new Response(JSON.stringify({ RO }), {
// 		status: 201
// 	});
// }

export async function POST(event) {
	const { supabaseClient, session } = await getSupabase(event);
	if (!session) return new Response(JSON.stringify({ Error: 'Não autorizado' }), { status: 401 });

	return new Response(JSON.stringify({ data: event }));
}

export async function GET(event) {
	const { supabaseClient, session } = await getSupabase(event);

	if (!session) return new Response(JSON.stringify({ Error: 'Não autorizado' }), { status: 401 });

	const currentDate = new Date();

	function getDate() {
		const day = currentDate.getUTCDate();
		const month = currentDate.getUTCMonth() + 1;
		const year = currentDate.getUTCFullYear();

		const formatedMonth = month < 10 ? `0${month}` : month;
		const formatedDay = day < 10 ? `0${day}` : day;
		const formatedYear = year.toString().slice(-2);

		return {
			formatedDay,
			formatedMonth,
			formatedYear,
			currentDate
		};
	}

	// Gera um novo número de RO com base na quantidade de registros no dia atual
	function generateRONumber() {
		// Cria um número baseado na quantidade de registros do dia

		// const { error, data } = await supabaseClient
		// 	.rpc('ocorrencias_por_dia', { datadaocorrencia: currentDate })
		// 	.select();

		// if (error) {
		// 	throw new Error('Não foi possível gerar um novo número de RO');
		// }

		const { formatedDay, formatedMonth, formatedYear } = getDate();
		// const numberOfROs = data;
		// const nextRONumber = numberOfROs + 1;

		const roNumber = String(currentDate.getUTCMilliseconds()).padStart(3, '0');
		const RO = `RO${formatedYear}-${formatedMonth}${formatedDay}-${roNumber}`;

		return RO;
	}

	// Gera um novo Registro de Ocorrência com o número gerado - RO
	try {
		const newRO = generateRONumber();
		const { error } = await supabaseClient.from('ocorrencias').insert({
			ro: newRO,
			status: status.EM_ABERTO,
			user_id: session.user.id
		});

		if (error) {
			return new Response(JSON.stringify({ Error: error }), {
				status: 400
			});
		}

		return new Response(JSON.stringify({ newRO }), {
			status: 201
		});
	} catch (error) {
		return new Response(JSON.stringify({ Error: error.message }));
	}
}

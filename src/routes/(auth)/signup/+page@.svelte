<script>
	import {
		Button,
		InlineLoading,
		InlineNotification,
		PasswordInput,
		TextInput
	} from 'carbon-components-svelte';
	import Stack from '$lib/components/Stack.svelte';
	import Save from 'carbon-icons-svelte/lib/Save.svelte';
	import AuthLayout from '../../../lib/layouts/AuthLayout.svelte';
	import { enhance, applyAction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import DirectionStraightRight from 'carbon-icons-svelte/lib/DirectionStraightRight.svelte';

	export let data;
	export let form;
	let password, confirm_password;
	let loading = false;

	function comparePasswords(pass1, pass2) {
		return pass1 === pass2;
	}

	$: ({ user } = data);

	const handleSubmit = ({ cancel }) => {
		if (comparePasswords(password, confirm_password)) {
			loading = true;
			return async ({ result }) => {
				if (result.type === 'redirect') {
					await invalidate('supabase:auth');
				} else {
					await applyAction(result);
				}
				loading = false;
			};
		}
		alert('As senhas devem ser iguais');
		return cancel();
	};
</script>

<AuthLayout>
	<div slot="title" class="title">
		{#if form?.error}
			<InlineNotification
				kind={form?.error === 'Email not confirmed' ? 'warning' : 'error'}
				title="Erro:"
				subtitle={form?.error}
				hideCloseButton
			/>
		{/if}

		{#if form?.success}
			<InlineNotification
				kind="success"
				title="Atenção!"
				subtitle={form?.success}
				hideCloseButton
			/>
		{/if}
		<h2>Cadastro de usuário</h2>
	</div>

	<form slot="form" method="post" use:enhance={handleSubmit}>
		<Stack>
			<TextInput name="nome_completo" labelText="Nome completo" placeholder="Nome" required />
			<Stack horizontal>
				<TextInput
					name="nome_de_guerra"
					labelText="Nome de Guerra"
					placeholder="Nome de Guerra"
					required
				/>
				<TextInput name="matricula" labelText="Matrícula" placeholder="Matrícula" required />
			</Stack>
			<Stack horizontal>
				<TextInput name="email" labelText="Email" placeholder="Email" required />
				<TextInput name="telefone" labelText="Telefone" placeholder="Telefone" />
			</Stack>
			<Stack horizontal>
				<PasswordInput
					bind:value={password}
					name="senha"
					labelText="Senha"
					placeholder="Senha"
					required
				/>
				<PasswordInput
					bind:value={confirm_password}
					required
					name="confirme_sua_senha"
					labelText="Confirme sua senha"
					placeholder="Confirme sua senha"
				/>
			</Stack>
			{#if loading}
				<InlineLoading status="active" description="Carregando..." />
			{:else}
				<Button
					class="condensed"
					type="submit"
					size="small"
					skeleton={loading}
					disabled={loading}
					icon={DirectionStraightRight}>Cadastrar</Button
				>
			{/if}
		</Stack>
	</form>
</AuthLayout>

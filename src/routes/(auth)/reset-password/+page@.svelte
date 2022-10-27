<script>
	import {
		Button,
		InlineLoading,
		InlineNotification,
		Link,
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

	function isPasswordsEquals(pass1, pass2) {
		return pass1 === pass2;
	}

	$: ({ user } = data);

	const handleSubmit = ({ cancel }) => {
		if (isPasswordsEquals(password, confirm_password)) {
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
		<h2>Crie uma nova senha</h2>
		<p>A senha precisa ter no mínimo 6 dígitos.</p>
	</div>

	<form slot="form" method="post" use:enhance={handleSubmit}>
		{#if form.success}
			<Button href="/" icon={DirectionStraightRight}>Acesse o sistema</Button>
		{:else}
			<Stack>
				<PasswordInput
					name="senha"
					type="password"
					labelText="Digite a senha nova"
					placeholder="Senha"
					bind:value={password}
				/>
				<PasswordInput
					name="confirme_sua_senha"
					type="password"
					labelText="Confirme sua senha"
					placeholder="Senha"
					bind:value={confirm_password}
				/>
				{#if loading}
					<InlineLoading status="active" description="Carregando..." />
				{:else}
					<Button
						class="condensed"
						type="submit"
						size="small"
						skeleton={loading}
						disabled={loading}
						icon={DirectionStraightRight}>Enviar</Button
					>
				{/if}
			</Stack>
		{/if}
	</form>
</AuthLayout>

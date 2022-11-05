<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import {
		TextInput,
		Button,
		PasswordInput,
		InlineLoading,
		InlineNotification
	} from 'carbon-components-svelte';
	import DirectionStraightRight from 'carbon-icons-svelte/lib/DirectionStraightRight.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import AuthLayout from '../../lib/layouts/AuthLayout.svelte';

	let loading = false;

	export let form;

	const handleSubmit = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			loading = false;
		};
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
		<h2>Login</h2>
		<span>Não tem acesso ao sistema?</span>
		<a href="/signup">Clique aqui</a>
	</div>

	<form slot="form" method="post" use:enhance={handleSubmit}>
		<Stack>
			<TextInput
				name="email"
				id="email"
				type="email"
				value={form?.values?.email ?? ''}
				labelText="Usuário"
				placeholder="Usuário"
				required
			/>

			<PasswordInput
				name="password"
				id="password"
				labelText="Senha"
				hidePasswordLabel="Esconder senha"
				showPasswordLabel="Mostrar senha"
				tooltipPosition="left"
				placeholder="Senha"
				required
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
					icon={DirectionStraightRight}>Entrar</Button
				>
			{/if}
			<a href="/lost-password">Perdeu a senha?</a>
		</Stack>
	</form>
</AuthLayout>

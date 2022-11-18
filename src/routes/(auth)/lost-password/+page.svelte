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
	let loading = false;

	$: ({ user } = data);

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

		{#if form?.success}
			<InlineNotification
				kind="success"
				title="Atenção!"
				subtitle={form?.success}
				hideCloseButton
			/>
		{/if}
		<h2>Recuperação de senha</h2>
		<p>Um link será enviado para seu email.</p>
	</div>

	<form slot="form" method="post" use:enhance={handleSubmit}>
		<Stack>
			<TextInput
				name="email"
				type="email"
				labelText="Digite seu email cadastrado para recuperar a senha"
				placeholder="Email"
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
					icon={DirectionStraightRight}>Enviar</Button
				>
			{/if}
		</Stack>
	</form>
</AuthLayout>

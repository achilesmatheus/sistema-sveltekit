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

	let loading = false;

	export let form;

	const handleSubmit = () => {
		loading = true;
		return async ({ result }) => {
			console.log({ result });
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<main>
	<section class="left">
		<div class="title">
			<h2>GCM</h2>
			<span>[ Sete Lagoas ]</span>
		</div>

		<div class="info">
			<h2>Plataforma de Ocorrências Policiais</h2>
			<p>Faça login no formulário ao lado ou crie um novo cadastro junto ao setor responsável</p>
		</div>

		<div class="links">
			<span>©2022 GCM - Ligue 153 </span>
			<a href="https://www.facebook.com/guardamsl">Facebook</a>
			<a href="https://www.instagram.com/guardamunicipaldesetelagoas/">Instagram</a>
		</div>
	</section>

	<section class="right">
		<div class="title">
			{#if form?.error}
				<InlineNotification title="Erro:" subtitle={form?.error} hideCloseButton />
			{/if}
			<h2>Login</h2>
			<span>Não tem acesso ao sistema?</span>
			<a href="/">Clique aqui</a>
		</div>

		<form method="post" use:enhance={handleSubmit}>
			<Stack>
				<TextInput
					name="email"
					id="email"
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
				/>
				{#if loading}
					<InlineLoading status="active" description="Carregando..." />
				{:else}
					<Button
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
	</section>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		height: 100vh;
		max-width: 1400px;
		margin: 0 auto;
	}

	.left,
	.right {
		padding: 3rem 4rem;
	}

	/* Left Side */
	.left {
		background-image: radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px);
		background-size: 10px 10px;
		background-color: #0353e9;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.left .title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	h2 {
		font-weight: bold;
	}

	.left a {
		color: white;
		text-decoration: none;
	}

	.links {
		display: flex;
		gap: 1rem;
	}

	.links :nth-child(2) {
		margin-left: auto;
	}

	/* Right Side */
	.right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2rem;
	}
	.right a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>

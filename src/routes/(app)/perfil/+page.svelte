<script>
	import {
		Button,
		Column,
		Grid,
		InlineLoading,
		InlineNotification,
		Row,
		TextInput,
		Tile
	} from 'carbon-components-svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import UserProfile from 'carbon-pictograms-svelte/lib/UserProfile.svelte';
	import Save from 'carbon-icons-svelte/lib/Save.svelte';
	import { enhance, applyAction } from '$app/forms';

	export let data;
	export let form;
	let loading = false;
	const [user] = data?.profileTable;

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

{#if form?.Ok}
	<h4>{form.Ok}</h4>
{/if}

<Grid>
	<Row>
		<Column>
			<PageHeader>
				<h4 slot="h3_title">Perfil</h4>
			</PageHeader>
		</Column>
	</Row>
	<Row>
		<Column>
			<Tile>
				<h4>Editar Perfil</h4>
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
				<form method="post" use:enhance={handleSubmit}>
					<Stack>
						<TextInput
							labelText="Nome completo"
							placeholder="Nome completo"
							light
							value={user.full_name}
							name="full_name"
						/>
						<TextInput
							labelText="Nome de Guerra"
							placeholder="Nome de Guerra"
							light
							value={user.war_name}
							name="war_name"
						/>
						<Stack horizontal>
							<TextInput
								labelText="Matrícula"
								placeholder="Matrícula"
								light
								value={user.registration_number}
								name="registration_number"
							/>
							<TextInput
								labelText="Telefone"
								placeholder="Telefone"
								light
								value={user.phone}
								name="phone"
							/>
						</Stack>
						<TextInput labelText="Email" placeholder="Email" value={user.email} name="email" />
						{#if loading}
							<InlineLoading status="active" description="Carregando..." />
						{:else}
							<Button
								class="condensed"
								type="submit"
								size="small"
								skeleton={loading}
								disabled={loading}
								icon={Save}>Salvar</Button
							>
						{/if}
					</Stack>
				</form>
			</Tile>
		</Column>
		<Column />
	</Row>
</Grid>

<style>
	.user_photo {
		text-align: center;
	}
</style>

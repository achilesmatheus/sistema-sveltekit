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
	let loading2 = false;
	const [user] = data?.profileTable;
</script>

<Grid narrow>
	<Row padding>
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
				{#if form?.editProfile?.error}
					<InlineNotification
						kind="error"
						title="Erro:"
						subtitle={form?.editProfile?.error}
						hideCloseButton
					/>
				{/if}

				{#if form?.editProfile?.success}
					<InlineNotification
						kind="success"
						title="Ok!"
						subtitle={form?.editProfile?.success}
						hideCloseButton
					/>
				{/if}
				<form
					method="post"
					action="?/editProfile"
					use:enhance={() => {
						loading = true;
						return async ({ result }) => {
							await applyAction(result);
							loading = false;
						};
					}}
				>
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

		<Column>
			<Tile>
				<h4>Editar Email</h4>
				{#if form?.editEmail?.error}
					<InlineNotification
						kind="error"
						title="Erro:"
						subtitle={form?.editEmail.error}
						hideCloseButton
					/>
				{/if}

				{#if form?.editEmail?.success}
					<InlineNotification
						kind="success"
						title="Atenção!"
						subtitle={form?.editEmail?.success}
						hideCloseButton
					/>
				{/if}
				<form
					method="post"
					action="?/editEmail"
					use:enhance={() => {
						loading2 = true;
						return async ({ result }) => {
							await applyAction(result);
							loading2 = false;
						};
					}}
				>
					<Stack>
						<TextInput
							labelText="Email"
							placeholder="Email"
							value={user.email}
							name="email"
							light
						/>
						{#if loading2}
							<InlineLoading status="active" description="Carregando..." />
						{:else}
							<Button
								class="condensed"
								type="submit"
								size="small"
								skeleton={loading2}
								disabled={loading2}
								icon={Save}>Salvar</Button
							>
						{/if}
					</Stack>
				</form>
			</Tile>
		</Column>
	</Row>
</Grid>

<style>
	.user_photo {
		text-align: center;
	}
</style>

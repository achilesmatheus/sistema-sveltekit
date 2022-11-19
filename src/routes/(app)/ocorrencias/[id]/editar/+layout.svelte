<script>
	import { Tile, Button, ButtonSet, Grid, Row, Column } from 'carbon-components-svelte';
	import OcorrenciasHeader from '$lib/components/OcorrenciasHeader.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { onMount } from 'svelte';

	export let data;

	$: ({ id } = data.params);

	let currentURL = '';
	onMount(() => {
		currentURL = window.location;
	});
</script>

<Grid narrow>
	<Row padding>
		<Column>
			<PageHeader>
				<h4 slot="h3_title">Editar Registro de Ocorrência</h4>
			</PageHeader>
		</Column>
	</Row>

	<Row condensed>
		<Column sm={4} md={2} lg={3}>
			<Tile>
				<div class="nav">
					<ButtonSet stacked>
						<Button class="btn-full" href={`${currentURL}/inicio`} kind="ghost" size="field"
							>Início</Button
						>
						<Button class="btn-full" href={currentURL} kind="ghost" size="field">Envolvidos</Button>
						<Button class="btn-full" href={currentURL} kind="ghost" size="field">Agentes</Button>
						<Button class="btn-full" href={currentURL} kind="ghost" size="field"
							>Materiais/Objetos</Button
						>
						<Button class="btn-full" href={currentURL} kind="ghost" size="field">Documentos</Button>
						<Button class="btn-full" href={currentURL} kind="ghost" size="field">Armas</Button>
						<Button class="btn-full" href={currentURL} kind="ghost" size="field">Veículos</Button>
						<Button class="btn-full" href={currentURL} kind="ghost" size="field">Histórico</Button>
						<Button class="btn-full" href={currentURL} kind="ghost" size="field">Finalização</Button
						>
					</ButtonSet>
				</div>
			</Tile>
		</Column>

		<Column sm={4} md={6} lg={13}>
			<div class="content">
				<slot />
			</div>
		</Column>
	</Row>
</Grid>

<style>
	/* .wrapper {
		display: grid;
		gap: 1rem;
		grid-template-columns: auto 1fr;
	} */

	.nav {
		/* width: fit-content; */
	}
</style>

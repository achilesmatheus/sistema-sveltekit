<script>
	import { Tile, Button, ButtonSet } from 'carbon-components-svelte';
	import OcorrenciasHeader from '../../../../lib/components/OcorrenciasHeader.svelte';
	import PageHeader from '../../../../lib/components/PageHeader.svelte';
</script>

<PageHeader>
	<h4 slot="h3_title">Ocorrências</h4>
</PageHeader>

<div class="wrapper">
	<div class="nav">
		<Tile>
			<ButtonSet stacked>
				<Button href="/ocorrencias/novo-ro/inicio" kind="ghost" size="field">Início</Button>
				<Button href="/ocorrencias/novo-ro/inicio" kind="ghost" size="field">Envolvidos</Button>
				<Button href="/ocorrencias/novo-ro/inicio" kind="ghost" size="field">Agentes</Button>
				<Button href="/ocorrencias/novo-ro/inicio" kind="ghost" size="field"
					>Materiais/Objetos</Button
				>
				<Button href="/ocorrencias/novo-ro/inicio" kind="ghost" size="field">Documentos</Button>
				<Button href="/ocorrencias/novo-ro/inicio" kind="ghost" size="field">Armas</Button>
				<Button href="/ocorrencias/novo-ro/inicio" kind="ghost" size="field">Veículos</Button>
				<Button href="/ocorrencias/novo-ro/inicio" kind="ghost" size="field">Histórico</Button>
				<Button href="/ocorrencias/novo-ro/inicio" kind="ghost" size="field">Finalização</Button>
			</ButtonSet>
		</Tile>
	</div>

	<div class="content">
		<slot />
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		gap: 1rem;
		grid-template-columns: auto 1fr;
	}

	.nav {
		width: fit-content;
	}

	.content {
		/* grid-column: 2 / -1; */
	}
</style>

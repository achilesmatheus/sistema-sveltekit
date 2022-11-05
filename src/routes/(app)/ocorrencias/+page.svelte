<script>
	import { Button, Tile, Modal } from 'carbon-components-svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	let open = false;
</script>

<PageHeader>
	<h4 slot="h3_title">Ocorrências</h4>
	<svelte:fragment slot="controls">
		<Button size="small" icon={Add} on:click={() => (open = true)}>Criar ocorrência</Button>
	</svelte:fragment>
</PageHeader>

<Modal
	size="sm"
	bind:open
	modalHeading="Criar R.O"
	primaryButtonText="Continuar"
	secondaryButtonText="Cancelar"
	on:click:button--secondary={() => (open = false)}
	on:open
	on:close
	on:submit
>
	<p>Um novo Registro de Ocorrência será gerado.</p>
</Modal>

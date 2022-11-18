<script>
	import {
		Button,
		Modal,
		Grid,
		Row,
		Column,
		DataTable,
		Toolbar,
		ToolbarContent,
		Pagination,
		Tag,
		DataTableSkeleton,
		PaginationSkeleton
	} from 'carbon-components-svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import ArrowUpRight from 'carbon-icons-svelte/lib/ArrowUpRight.svelte';

	export let data;

	async function generateNewRONumber() {
		try {
			const response = await fetch('/api/ocorrencia/novo-ro');
			if (response.status !== 201) throw new Error('Não foi possível gerar um novo RO');

			const json = await response.json();
			return json;
		} catch (error) {
			return { Error: error.message };
		}
	}

	const headers = [
		{ key: 'id', value: 'ID' },
		{ key: 'ro', value: 'Número' },
		{ key: 'created_at', value: 'Data/Hora' },
		{ key: 'status', value: 'Status' },
		{ key: 'link', value: 'Link' }
	];

	let open = false;
	let pageSize = 5;
	let page = 1;

	async function getROs() {
		try {
			const response = await fetch('/api/ocorrencia/lista-de-ros');
			if (response.status === 400) throw new Error('Erro getROs');

			return await response.json();
		} catch (error) {}
	}

	let rows;
	$: rows = getROs();
</script>

<Grid narrow>
	<Row padding>
		<Column>
			<PageHeader>
				<h4 slot="h3_title">Ocorrências</h4>
				<!-- <svelte:fragment slot="controls">
					<Button size="small" icon={Add} on:click={() => (open = true)}>Criar ocorrência</Button>
				</svelte:fragment> -->
			</PageHeader>
		</Column>
	</Row>

	<Row>
		<Column>
			{#await rows}
				<DataTableSkeleton size="short" {headers} rows={5} />
				<PaginationSkeleton />
			{:then { data }}
				<DataTable
					size="compact"
					title="Lista de ocorrências"
					description="As ocorrências em aberto e finalizadas estão listadas abaixo.	"
					{headers}
					rows={data}
					{page}
					{pageSize}
				>
					<svelte:fragment slot="cell" let:cell>
						{#if cell.key === 'link'}
							<Button
								size="small"
								kind="ghost"
								icon={ArrowUpRight}
								href="https://en.wikipedia.org/wiki/Round-robin_DNS"
								target="_blank">{cell.value}</Button
							>
						{:else if cell.key === 'status'}
							<Tag type="green">{cell.value}</Tag>
						{:else if cell.key === 'created_at'}
							{new Date(cell.value).toLocaleString()}
						{:else}
							{cell.value}
						{/if}
					</svelte:fragment>

					<Toolbar>
						<ToolbarContent>
							<!-- <ToolbarSearch /> -->
							<!-- <ToolbarMenu>
						<ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
						<ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service">
							API documentation
						</ToolbarMenuItem>
						<ToolbarMenuItem hasDivider danger>Stop all</ToolbarMenuItem>
					</ToolbarMenu> -->
							<Button icon={Add} on:click={() => (open = true)}>Criar ocorrência</Button>
						</ToolbarContent>
					</Toolbar>
				</DataTable>
				<Pagination
					itemText="item"
					pageText={(page) => `página ${page}`}
					pageRangeText={(current, total) => `de ${total} página${total === 1 ? '' : 's'} `}
					itemRangeText={(min, max, total) =>
						`${min}–${max} de ${total} ite${max === 1 ? 'm' : 'ns'}`}
					bind:pageSize
					bind:page
					totalItems={data.length}
					pageSizeInputDisabled
				/>
			{/await}
		</Column>
	</Row>
</Grid>

<Modal
	size="sm"
	primaryButtonText="Continuar"
	secondaryButtonText="Cancelar"
	bind:open
	modalHeading="Novo R.O"
	on:click:button--secondary={() => (open = false)}
	on:click:button--primary={async () => {
		open = false;
		await generateNewRONumber();
		rows = getROs();
	}}
>
	<p>Um novo Registro de Ocorrência será gerado.</p>
</Modal>

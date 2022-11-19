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
		PaginationSkeleton,
		Loading,
		Link,
		Tile,
		ToolbarMenuItem,
		ToolbarMenu,
		InlineLoading
	} from 'carbon-components-svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import Reset from 'carbon-icons-svelte/lib/Reset.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';

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
		{ key: 'options', value: 'Opções' }
	];

	let open = false;
	let pageSize = 5;
	let page = 1;
	let rows;
	let loading = false;
	let buttonLoading = false;
	let roLink;

	async function getROs() {
		const response = await fetch('/api/ocorrencia/lista-de-ros');
		if (response.status === 400)
			throw new Error("Erro ao buscar lista de RO's. Tente novamente mais tarde");

		return await response.json();
	}

	$: rows = getROs();
</script>

<Grid narrow>
	<Row padding>
		<Column>
			<PageHeader>
				<h4 slot="h3_title">Ocorrências</h4>
			</PageHeader>
		</Column>
	</Row>

	<Row>
		<Column>
			<Tile>
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
							{#if cell.key === 'ro'}
								<a bind:this={roLink} href={`${window.location.href}/${cell.value}`}>
									{cell.value}
								</a>
							{:else if cell.key === 'status'}
								<Tag type="green">{cell.value}</Tag>
							{:else if cell.key === 'created_at'}
								{new Date(cell.value).toLocaleString()}
							{:else if cell.key === 'options'}
								<Button
									size="small"
									kind="ghost"
									icon={Edit}
									iconDescription="Editar"
									href={`${roLink}/editar`}
								/>
							{:else}
								{cell.value}
							{/if}
						</svelte:fragment>

						<Toolbar>
							<ToolbarContent>
								<!-- <ToolbarSearch /> -->
								{#if buttonLoading}
									<Button kind="ghost">
										<InlineLoading status="active" description="Recarregando" />
									</Button>
								{:else}
									<Button
										icon={Reset}
										iconDescription="Recarregar"
										kind="ghost"
										on:click={async () => {
											buttonLoading = true;
											rows = await getROs();
											buttonLoading = false;
										}}
									/>
								{/if}

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
				{:catch error}
					<DataTable size="compact" title="Lista de ocorrências" description={error.message} />
				{/await}
			</Tile>
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
		loading = true;
		await generateNewRONumber();
		rows = await getROs();
		loading = false;
		open = false;
	}}
>
	<p>Um novo Registro de Ocorrência será gerado.</p>
	{#if loading}
		<Loading withOverlay />
	{/if}
</Modal>

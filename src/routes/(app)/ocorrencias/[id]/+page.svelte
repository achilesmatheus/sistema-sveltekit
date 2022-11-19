<script>
	import {
		Column,
		Grid,
		Row,
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow,
		Tile
	} from 'carbon-components-svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	export let data;

	$: [roNumber] = data.roNumber;
</script>

<Grid narrow>
	<Row padding>
		<Column>
			<PageHeader>
				<h4 slot="h3_title">
					Registro de Ocorrência Nº: {roNumber.ro}
				</h4>
			</PageHeader>
		</Column>
	</Row>

	<Row>
		<Column>
			<!-- <Tile light> -->
			<Table size="sm">
				<TableHead>
					<TableRow>
						<TableHeader colSpan={5}>Atendimento</TableHeader>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell colSpan={2}>
							<strong>Unidade de registro: </strong>
							<!-- {data["Unidade de registro"]} -->
						</TableCell>
						<TableCell colSpan={3}>
							<!-- <strong>Acionamento: </strong> {data["Acionamento"]} -->
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell colSpan={5}>
							<!-- <strong>Solicitante: </strong> {data["Solicitante"]} -->
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell colSpan={2}>
							<strong>Data/Hora inicial: </strong>
							<!-- {formatDateWithHour(data["Data/Hora inicial"])} -->
						</TableCell>
						<TableCell>
							<strong>Data/Hora local: </strong>
							<!-- {formatDateWithHour(data["Data/Hora local"])} -->
						</TableCell>
						<TableCell>
							<strong>Data/Hora final: </strong>
							<!-- {formatDateWithHour(data["Data/Hora final"])} -->
						</TableCell>
					</TableRow>
				</TableBody>

				<TableHead>
					<TableRow>
						<TableHeader colSpan={5}>Local</TableHeader>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<strong>Cep: </strong>
							<!-- {data["Cep"]} -->
						</TableCell>
						<TableCell colSpan={2}>
							<!-- <strong>Rua: </strong> {data["Rua"]} -->
						</TableCell>
						<TableCell>
							<!-- <strong>Bairro: </strong> {data["Bairro"]} -->
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell>
							<!-- <strong>Cidade: </strong> {data["Cidade"]} -->
						</TableCell>
						<TableCell>
							<!-- <strong>Estado: </strong> {data["Estado"]} -->
						</TableCell>
						<TableCell>
							<!-- <strong>Numero: </strong> {data["Numero"]} -->
						</TableCell>
						<TableCell>
							<!-- <strong>Complemento: </strong> {data["Complemento"]} -->
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell colSpan={3}>
							<strong>Ponto de referencia: </strong>
							<!-- {data["Ponto de referencia"]} -->
						</TableCell>
						<TableCell>
							<strong>Localização: </strong>
							<!-- {data["Localizacao"]} -->
						</TableCell>
					</TableRow>
				</TableBody>

				<TableHead>
					<TableRow>
						<TableHeader colSpan={5}>Tipificação</TableHeader>
					</TableRow>
				</TableHead>
				<TableBody />
			</Table>
			<!-- </Tile> -->
		</Column>
	</Row>
</Grid>

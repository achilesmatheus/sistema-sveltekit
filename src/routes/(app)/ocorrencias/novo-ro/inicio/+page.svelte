<script>
	import {
		Button,
		Select,
		SelectItem,
		Tab,
		TabContent,
		Tabs,
		TextInput,
		Tile
	} from 'carbon-components-svelte';
	import Stack from '$lib/components/Stack.svelte';
	import OcorrenciasHeader from '../../../../../lib/components/OcorrenciasHeader.svelte';
	import Save from 'carbon-icons-svelte/lib/Save.svelte';
</script>

<Tile>
	<Tabs type="">
		<Tab label="Atendimento" />
		<Tab label="Local" />
		<Tab label="Tipificação" />
		<svelte:fragment slot="content">
			<TabContent>
				<OcorrenciasHeader>
					<h4 slot="h4_title">Informações iniciais</h4>
					<p slot="p_subtitle">Data, hora, local e descrição da ocorrência</p>

					<svelte:fragment slot="button_options">
						<Button size="small" icon={Save}>Salvar</Button>
					</svelte:fragment>
				</OcorrenciasHeader>

				<Stack>
					<Stack horizontal>
						<Select labelText="Unidade de Registro">
							<SelectItem text="Selecione" disabled hidden />
							<SelectItem text="Central" value="Central" />
						</Select>
						<Select labelText="Acionamento">
							<SelectItem text="Selecione" disabled hidden />
							<SelectItem
								text="Designação via Central - 153"
								value="Designação via Central - 153"
							/>
							<SelectItem text="Iniciativa" value="Iniciativa" />
							<SelectItem text="Solicitação" value="Solicitação" />
						</Select>
					</Stack>

					<Stack horizontal>
						<TextInput id="solicitante" labelText="Solicitante" placeholder="Solicitante" />
					</Stack>

					<Stack horizontal>
						<TextInput id="data-inicial" type="datetime-local" labelText="Data/Hora inicial" />
						<TextInput id="data-local" type="datetime-local" labelText="Data/Hora local" />
						<TextInput id="data-final" type="datetime-local" labelText="Data/Hora final" />
					</Stack>
				</Stack>
			</TabContent>
			<TabContent>Content 2</TabContent>
			<TabContent>Content 3</TabContent>
		</svelte:fragment>
	</Tabs>
</Tile>

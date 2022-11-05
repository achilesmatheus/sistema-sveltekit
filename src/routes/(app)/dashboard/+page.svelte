<script>
	import { Button, CopyButton, DataTable, Link, Tile } from 'carbon-components-svelte';
	import FolderAdd from 'carbon-icons-svelte/lib/FolderAdd.svelte';
	import NewTab from 'carbon-icons-svelte/lib/NewTab.svelte';
	import PageHeader from '../../../lib/components/PageHeader.svelte';
</script>

<PageHeader>
	<h4 slot="h3_title">Página inicial</h4>
	<svelte:fragment slot="controls">
		<Link href="/" icon={FolderAdd} />
		<Link href="/" icon={NewTab} />
	</svelte:fragment>
</PageHeader>
<Tile>
	<DataTable
		headers={[
			{ key: 'name', value: 'Name' },
			{ key: 'protocol', value: 'Protocol' },
			{ key: 'port', value: 'Port' },
			{ key: 'rule', value: 'Rule' }
		]}
		rows={[
			{
				id: 'a',
				name: 'Load Balancer 3',
				protocol: 'HTTP',
				port: 3000,
				rule: 'Round robin'
			},
			{
				id: 'b',
				name: 'Load Balancer 1',
				protocol: 'HTTP',
				port: 443,
				rule: 'Round robin'
			},
			{
				id: 'c',
				name: 'Load Balancer 2',
				protocol: 'HTTP',
				port: 80,
				rule: 'DNS delegation'
			},
			{
				id: 'd',
				name: 'Load Balancer 6',
				protocol: 'HTTP',
				port: 3000,
				rule: 'Round robin'
			},
			{
				id: 'e',
				name: 'Load Balancer 4',
				protocol: 'HTTP',
				port: 443,
				rule: 'Round robin'
			},
			{
				id: 'f',
				name: 'Load Balancer 5',
				protocol: 'HTTP',
				port: 80,
				rule: 'DNS delegation'
			}
		]}
	/>
</Tile>

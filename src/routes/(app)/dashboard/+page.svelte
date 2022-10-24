<script>
	import { Tile } from 'carbon-components-svelte';

	export let data;

	$: ({ user } = data);
</script>

<Tile>ok</Tile>

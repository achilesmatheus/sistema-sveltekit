<script>
	export let gap = 1;
	export let horizontal = false;
</script>

<div style="display: flex; flex-direction: {horizontal ? 'row' : 'column'}; gap: {gap}rem">
	<slot />
</div>

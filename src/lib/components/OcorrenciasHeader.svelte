<script>
	import { Button } from 'carbon-components-svelte';
</script>

<header>
	<div class="title_subtitle">
		<slot name="h4_title" />
		<slot name="p_subtitle" />
	</div>

	<div class="options">
		<slot name="button_options" />
	</div>
</header>

<style>
	header {
		display: flex;
	}

	.title_subtitle {
		flex: 1;
	}
</style>

<script>
	import 'carbon-components-svelte/css/all.css';
	import '../styles/global.css';

	import { supabaseClient } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Theme } from 'carbon-components-svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange((event) => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Theme theme="g10">
	<slot />
</Theme>

<style>
	:global(*, *::after, *::before) {
		box-sizing: border-box;
	}

	:global(form button) {
		width: 100%;
	}

	:global(.condensed) {
		max-width: fit-content !important;
	}
</style>

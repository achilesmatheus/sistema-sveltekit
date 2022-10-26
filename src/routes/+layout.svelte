<script>
	import 'carbon-components-svelte/css/g10.css';

	import { supabaseClient } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<slot />

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

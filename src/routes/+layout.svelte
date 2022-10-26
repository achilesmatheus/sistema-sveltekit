<script>
	import 'carbon-components-svelte/css/g10.css';

	import { supabaseClient } from '$lib/supabase';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Button, Theme } from 'carbon-components-svelte';
	import { enhance } from '$app/forms';

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

	:global(.sidenav) {
		background-color: #282828;
	}

	:global(.sidenav ul li a span, .sidenav ul li button span) {
		color: #e0e0e0 !important;
	}

	:global(.sidenav ul li a, .sidenav ul li button) {
		border-left: 4px solid transparent;
	}

	:global(.sidenav ul li a:hover, .sidenav ul li button:hover) {
		background-color: #3d3d3d !important;
		border-color: #0f62fe;
	}
</style>

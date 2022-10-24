<script>
	import { Button, Form, FormGroup, TextInput, Tile } from 'carbon-components-svelte';
	import UserProfile from 'carbon-pictograms-svelte/lib/UserProfile.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import { Add, Save } from 'carbon-icons-svelte';

	export let data;

	$: ({ user } = data);
</script>

<header class="content_header">
	<h2>Perfil</h2>
	<div class="header_controls">
		<!-- <Button>CLique</Button> -->
	</div>
</header>
<section>
	<div class="user_photo">
		<Tile light>
			<UserProfile />
		</Tile>
	</div>

	<div class="form">
		<Form>
			<Stack>
				<TextInput labelText="Nome" placeholder="Nome" />
				<TextInput value={user.email} labelText="Email" placeholder="Email" />
				<Button class="condensed" icon={Save}>Salvar</Button>
			</Stack>
		</Form>
	</div>
</section>

<style>
	:global(.condensed) {
		max-width: fit-content !important;
	}

	.content_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	section {
		text-align: center;
		margin-top: 1rem;
	}

	.form,
	.user_photo {
		width: 50%;
		margin: 0 auto;
	}
</style>

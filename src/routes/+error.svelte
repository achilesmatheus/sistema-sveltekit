<script>
	import { page } from '$app/stores';

	const errorsCodes = {
		404: 'Página não encontrada',
		500: 'Erro no servidor. Verifique sua conexão com a internet'
	};
</script>

<div>
	<h1>{$page.status}</h1>
	<h4>{errorsCodes[$page.status] || $page.error.message}</h4>
</div>

<style>
	div {
		display: grid;
		height: 100vh;
		place-content: center;
	}

	h1 {
		text-align: center;
	}
</style>

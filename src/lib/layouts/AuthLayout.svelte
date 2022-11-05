<main>
	<section class="left">
		<div class="title">
			<h2>GCM</h2>
			<span>[ Sete Lagoas ]</span>
		</div>

		<div class="info">
			<h2>Plataforma de Ocorrências Policiais</h2>
			<p>Faça login no formulário ao lado ou crie um novo cadastro junto ao setor responsável</p>
		</div>

		<div class="links">
			<span>©2022 GCM - Ligue 153 </span>
			<a href="https://www.facebook.com/guardamsl">Facebook</a>
			<a href="https://www.instagram.com/guardamunicipaldesetelagoas/">Instagram</a>
		</div>
	</section>

	<section class="right">
		<slot name="title" />

		<slot name="form" />
	</section>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		height: 100vh;
		max-width: 1400px;
		margin: 0 auto;
	}

	.left,
	.right {
		padding: 3rem 4rem;
	}

	/* Left Side */
	.left {
		background-image: radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px);
		background-size: 10px 10px;
		background-color: #0353e9;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.left .title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	h2 {
		font-weight: bold;
	}

	.left a {
		color: white;
		text-decoration: none;
	}

	.links {
		display: flex;
		gap: 1rem;
	}

	.links :nth-child(2) {
		margin-left: auto;
	}

	/* Right Side */
	.right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2rem;
	}
	/* .right a {
		text-decoration: none;
	} */

	a:hover {
		text-decoration: underline;
	}
</style>

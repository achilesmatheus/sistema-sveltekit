<header class="content_header">
	<slot name="h3_title" class="h3" />
	<div class="header_controls">
		<slot name="controls" />
	</div>
</header>

<style>
	header {
		/* padding-bottom: 1rem; */
	}

	.content_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 2rem;
	}

	.h3 {
		font-size: 2rem;
	}

	.header_controls {
		display: flex;
	}
</style>

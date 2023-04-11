<script>
	import PaddedPageWithNav from '../PaddedPageWithNav.svelte';
</script>

<PaddedPageWithNav>
	<div class="wrapper">
		<h2>Privacy Statement</h2>
		<p>
			Svelte Puzzle does not collect any data. We don't store cookies. The only thing we store are a
			couple of settings (e.g. difficulty preference) in the local storage of your browser.
		</p>
	</div>
</PaddedPageWithNav>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
	.wrapper {
		font-family: 'Open Sans', sans-serif;
		flex-direction: column;
		max-width: 800px;
		margin: auto;
		border-radius: 10px;
		background: white;
		padding: 20px;
	}
</style>

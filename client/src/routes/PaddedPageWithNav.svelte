<script lang="ts">
	import PageWithNav from './PageWithNav.svelte';

	export let parent: string | null = null;
</script>

<PageWithNav {parent}>
	<div class="padded-content">
		<slot />
	</div>
</PageWithNav>

<style>
	.padded-content {
		padding-left: 30px;
		padding-right: 30px;
		padding-bottom: 30px;
		padding-top: 60px;
	}
</style>

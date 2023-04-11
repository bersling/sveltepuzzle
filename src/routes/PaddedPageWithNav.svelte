<script lang="ts">
	import PageWithNav from './PageWithNav.svelte';
	import { TouchMode } from './touch';

	export let parent: string | null = null;
	export let touchMode: TouchMode = TouchMode.CLICK_ONLY;
</script>

<PageWithNav {parent} {touchMode}>
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

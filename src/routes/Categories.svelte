<script lang="ts">
	import IconLink from './IconLink.svelte';
	import type { CategoryItem } from './models';

	import PageWithNav from './PageWithNav.svelte';

	import { TouchMode } from './touch';

	export let items: CategoryItem[];
	export let parent: string | null = null;
	export let hideNav: boolean = false;
</script>

<PageWithNav {parent} {hideNav} touchMode={TouchMode.SCROLLABLE}>
	<div class="category-outer-wrapper">
		<div class="category-inner-wrapper">
			{#each items as item}
				<IconLink {item} />
			{/each}
		</div>
	</div>
</PageWithNav>

<style lang="scss">
	@import '../styles/variable-declarations.scss';
	$blockSize: 300px;

	.category-outer-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100%;
		padding-bottom: $icon-link-gap;
		padding-top: $icon-link-gap;
	}

	.category-inner-wrapper {
		display: inline-grid;
		gap: $icon-link-gap;
		padding-left: $icon-link-gap;
		padding-right: $icon-link-gap;
		@media (min-width: 0) {
			grid-template-columns: minmax(0, $blockSize);
		}
		@media (min-width: 700px) {
			grid-template-columns: repeat(2, $blockSize);
		}
		@media (min-width: 1200px) {
			grid-template-columns: repeat(3, $blockSize);
		}
	}
</style>

<script lang="ts">
	import { Capacitor } from '@capacitor/core';
	import { difficulty } from './difficulty.store';
	import DifficultySlider from './DifficultySlider.svelte';
	import { height, width } from './height.store';
	import IconLink from './IconLink.svelte';
	import { Category, Difficulty, hueByCategoryLight, type CategoryItem } from './models';
	import PageWithNav from './PageWithNav.svelte';
	import { TouchMode } from './touch';
	import { filterByDifficulty } from './utils';

	const isNative = Capacitor.isNativePlatform();

	const categories: CategoryItem[] = [
		{
			difficulty: Difficulty.TODDLER,
			link: '/puzzle',
			jpg: '/assets/puzzle-icon/04-fox.jpg',
			color: hueByCategoryLight(Category.PUZZLE)
		},
		{
			difficulty: Difficulty.PRESCHOOLER,
			link: '/puzzle',
			jpg: '/assets/puzzle-icon/46-ocean2.jpg',
			color: hueByCategoryLight(Category.PUZZLE)
		}
	];

	const hideNav = true;
	let style = ''; // prevent flicker
	let touchMode = TouchMode.CLICK_ONLY;
	let everythingFitsOnOneScreen = false;
	let isBigSlider = false;

	$: {
		update($width, $height);
	}

	function update(width: number, height: number) {
		if (width > 0 && height > 0) {
			const maxBlockWidth = 300;

			isBigSlider = width > 800 && height > 800;

			// add something around so it has the same padding as the rows / cols
			const padding = 20;
			const impressumText = isNative ? 0 : 50;
			const difficultySlider = isBigSlider ? 100 : 62;
			const widthMinusPadding = width - padding;
			const heightMinusPadding = height - padding - impressumText - difficultySlider;

			everythingFitsOnOneScreen = true;

			const blockSize = Math.max(Math.min(heightMinusPadding, widthMinusPadding, 500), 300);
			touchMode = TouchMode.CLICK_ONLY;
			style = `grid-template-columns: repeat(1, ${blockSize}px); grid-template-rows: repeat(1, ${blockSize}px);`;
		}
	}
</script>

<PageWithNav {hideNav} {touchMode}>
	<div class="category-outer-wrapper" style="width: {$width}px; height: {$height}px;">
		<div>
			<DifficultySlider {isBigSlider} />
			<div class="category-inner-wrapper" {style}>
				{#each filterByDifficulty(categories, $difficulty) as item}
					<div class="item-wrapper"><IconLink {item} /></div>
				{/each}
			</div>
			{#if !isNative}
				<div class="impressum cute-font">
					(c) Daniel Niederberger, SvelteHack 2023, <a href="/about">About</a>
				</div>
			{/if}
		</div>
	</div>
</PageWithNav>

<style lang="scss">
	.category-outer-wrapper {
		display: grid;
		align-items: center;
		justify-items: center;
		text-align: center;
	}
	.category-inner-wrapper {
		display: inline-grid;
	}
	.item-wrapper {
		// using this rather than gap so calculations are easier
		padding: 10px;
	}

	@import url('https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap');
	.impressum {
		padding: 10px;
		color: #555;
		font-family: 'Annie Use Your Telescope', cursive;
		color: white;

		a {
			color: white;
		}
	}
</style>

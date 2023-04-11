<script lang="ts">
	import Nav from './Nav.svelte';
	import { height } from './height.store';
	import HeightUpdater from './HeightUpdater.svelte';
	import { TouchMode } from './touch';
	import { customTouchEnd, customTouchMove, customTouchStart } from './touch';
	import ScrollUpdater from './ScrollUpdater.svelte';
	import { onMount } from 'svelte';
	import { gameFinished } from './finished.store';
	import Debugger from './Debugger.svelte';

	export let parent: string | null = null;
	export let overflowHidden: boolean = false; // true for pages with svelte-confetti
	export let hideNav: boolean = false;
	export let touchMode: TouchMode = TouchMode.CLICK_ONLY;

	onMount(() => {
		gameFinished.set(false);
	});
</script>

<ScrollUpdater />
<HeightUpdater />

<div
	class="page-wrapper"
	style="height: {$height}px"
	on:touchstart={customTouchStart(touchMode)}
	on:touchend={customTouchEnd}
	on:touchmove={customTouchMove}
>
	{#if !hideNav}
		<div class="page-nav">
			<Nav {parent} />
		</div>
	{/if}
	<!-- Useful for mobile debugging,
		if you want to write debug results directly into the DOM instead of accessing the console -->
	<!-- <Debugger /> -->
	<div
		id="scrollable"
		class="page-content"
		style="height: {$height}px; {overflowHidden ? 'overflow: hidden;' : ''};"
	>
		<slot />
	</div>
</div>

<style lang="scss">
	.page-wrapper {
		background-image: url('/img/background-pattern.svg?v=2');
		background-size: 300px;
		background-repeat: repeat;

		position: relative;
	}
	.page-content {
		z-index: 0;
		overflow-y: auto;
		position: relative;
	}
	.page-nav {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
</style>

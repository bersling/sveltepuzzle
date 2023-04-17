<script lang="ts">
	import { onDestroy } from 'svelte';
	import { DoubleBounce } from 'svelte-loading-spinners';
	import type { CategoryItem } from './models';

	import { Capacitor } from '@capacitor/core';

	export let item: CategoryItem;
	export let loading = false;

	onDestroy(() => {
		loading = false;
	});
	function getStyle(color: string) {
		return color ? `background-color: ${color};` : '';
	}
	const onLinkClick = () => {
		if (!Capacitor.isNativePlatform()) {
			loading = true;
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events-->
<a href={item.link} class="category-link" style={getStyle(item.color)} on:click={onLinkClick}>
	<div class="icon-outer-wrapper">
		<div class="icon-wrapper {item.isNonSquare ? 'non-square' : ''}">
			{#if loading}
				<DoubleBounce color={'#fff'} />
			{:else}
				<img alt="Link Icon" src={item.jpg} class="jpg-image" />
			{/if}
		</div>
	</div>
</a>

<style lang="scss">
	.category-link {
		width: 100%;
		height: 100%;
		aspect-ratio: 1;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
		border-radius: 10px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		transition: transform 0.1s ease-in-out, background-color 0.1s ease-in-out;
		background-color: hsl(130, 95%, 80%);
		padding: 4%;
		position: relative;
	}

	.icon-outer-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.icon-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: rotate(0deg);
		transition: transform 0.1s ease-in-out;

		&.non-square {
			background: rgba(255, 255, 255, 0.5);
			border-radius: 5px;
		}
	}

	.icon-wrapper:hover {
		animation-duration: 0.5s;
		animation-name: icon-hover;
	}

	$max-size: 100%;
	.jpg-image {
		max-width: $max-size;
		max-height: $max-size;
		border-radius: 5px;
	}

	@keyframes icon-hover {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}
</style>

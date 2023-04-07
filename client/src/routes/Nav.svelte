<script lang="ts">
	import { gameFinished } from './finished.store';
	import BackIcon from './icon/BackIcon.svelte';

	export let parent: string | null = null;

	const backIconSize = 70;
</script>

<div class="nav">
	<a
		href={parent ? parent : '/'}
		class="nav-button nav-button-left {$gameFinished ? 'finished' : ''}"
	>
		<BackIcon size={backIconSize} />
	</a>
	<!-- <a href="/about" class="nav-button nav-button-right">
		<InfoIcon size={iconSize} />
	</a> -->
</div>

<style>
	.nav {
		display: flex;
		justify-content: space-between;
	}
	.nav-button {
		position: absolute;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
	}
	.nav-button-left {
		top: 0;
		left: 0;
	}
	.finished {
		animation-duration: 1.5s;
		animation-name: game-finished;
		animation-iteration-count: infinite;
	}

	@keyframes game-finished {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(10px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>

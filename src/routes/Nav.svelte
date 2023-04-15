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
</div>

<style>
	.nav {
		display: flex;
		justify-content: space-between;

		padding-top: env(safe-area-inset-top);
        padding-right: env(safe-area-inset-right);
        padding-bottom: env(safe-area-inset-bottom);
        padding-left: env(safe-area-inset-left);
	}
	.nav-button {
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
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

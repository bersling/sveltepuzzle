<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { height, width } from './height.store';

	let isFinished = false;

	onMount(() => {
		pollSize();
		window.addEventListener('resize', onResize);
		return () => {
			isFinished = true;
			window.removeEventListener('resize', onResize);
		};
	});

	// on ios switching orientation, resize events aren't triggered reliably
	function pollSize() {
		if (!isFinished) {
			setTimeout(() => {
				onResize();
				pollSize();
			}, 1000);
		}
	}

	const onResize = () => {
		height.set(window.innerHeight);
		width.set(window.innerWidth);
	};
	$: if (browser) onResize();
</script>

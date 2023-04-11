<script lang="ts">
	import { onMount } from 'svelte';

	function getScrollContainer() {
		return document.getElementById('scrollable') as HTMLElement;
	}

	function updateScrollPosition() {
		const scrollY = getScrollContainer().scrollTop.toString();
		sessionStorage.setItem('scroll-updater-last-scroll', scrollY);
	}

	function restoreScrollPosition(): void {
		const scrollYStr = sessionStorage.getItem('scroll-updater-last-scroll');
		if (scrollYStr) {
			getScrollContainer().scrollTop = parseInt(scrollYStr);
		}
	}

	// Checks if is navigation upwards. Has side effect of changing previous path.
	function isNavigatingUpwards() {
		const currentPath = window.location.pathname;
		const previousPath = sessionStorage.getItem('scroll-updater-previous-path');
		sessionStorage.setItem('scroll-updater-previous-path', currentPath);
		return previousPath && previousPath.indexOf(currentPath) === 0 && currentPath !== previousPath;
	}

	onMount(() => {
		const isUpwards = isNavigatingUpwards();
		if (isUpwards) {
			restoreScrollPosition();
		}
		const scrollContainer = getScrollContainer();
		scrollContainer.addEventListener('scroll', updateScrollPosition);
		return () => {
			scrollContainer.removeEventListener('scroll', updateScrollPosition);
		};
	});
</script>

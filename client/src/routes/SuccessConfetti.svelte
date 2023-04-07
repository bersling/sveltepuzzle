<script lang="ts">
	import { browser } from '$app/environment';

	export let show: boolean = false;
	const animationDurationSeconds = 2;
	const confettiWidthPx = 50;
	let numConfetti = 50;

	$: {
		if (!animationFinished && show) {
			setTimeout(() => {
				animationFinished = true;
			}, animationDurationSeconds * 1000);
		}
	}

	$: {
		if (browser) {
			// it's probably a mobile, less powerful and can handle less parts...
			if (window.innerWidth < 600) {
				numConfetti = 12;
			} else {
				// 50 confetti on a 1000px screen seems ok
				const confettiPerPixel = 50 / 1000;
				numConfetti = Math.floor(window.innerWidth * confettiPerPixel);
			}
		}
	}

	let animationFinished = false;

	let characters = [
		//yellow
		`<svg width="${confettiWidthPx}px" viewBox="0 0 24 97" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><path d="M5.572,1.5c0,4.434 -3.284,9.432 -0.044,13.618c1.673,2.162 10.2,3.431 9.106,-1.026c-1.069,-4.356 -5.61,-2.302 -7.579,-0.089c-3.73,4.195 -6.063,10.006 -5.461,15.652c0.64,5.997 4.428,11.642 9.733,14.522c1.524,0.828 5.58,2.42 6.93,0.372c1.381,-2.094 -2.775,-5.067 -4.275,-5.633c-3.61,-1.362 -6.744,1.352 -8.139,4.51c-4.399,9.962 0.272,23.069 11.681,25.374c3.769,0.762 5.671,-2.213 3.054,-5.187c-3.445,-3.915 -10.076,2.331 -12.153,4.803c-6.22,7.402 -8.916,21.705 1.639,26.849" style="fill:none;stroke:#f7e433;stroke-width:3px;"/></svg>`,

		// green
		`<svg width="${confettiWidthPx}px" viewBox="0 0 26 90" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><path d="M4.297,1.5c6.757,3.868 20.271,11.605 20.162,17.991c-0.109,6.385 -20.46,14.809 -20.818,20.322c-0.358,5.513 19.001,5.226 18.669,12.756c-0.357,8.084 -13.992,26.53 -20.81,35.752" style="fill:none;stroke:#94e05c;stroke-width:3px;"/></svg>`,

		// red
		`<svg width="${confettiWidthPx}px" viewBox="0 0 25 59" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><path d="M16.195,1.5c-5.234,4.623 -15.703,13.868 -14.617,19.602c1.087,5.734 19.85,8.792 21.134,14.802c1.285,6.011 -8.525,16.178 -13.429,21.262" style="fill:none;stroke:#d8301d;stroke-width:3px;"/></svg>`,

		// orange
		`<svg width="${confettiWidthPx}px" viewBox="0 0 28 74" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><path d="M13.586,1.5l-12.086,13.613l16.088,4.886l-11.716,11.555l17.96,11.761l-16.34,9.116l18.629,19.803" style="fill:none;stroke:#f59113;stroke-width:3px;"/></svg>`,

		// blue
		`<svg width="${confettiWidthPx}px" viewBox="0 0 24 57" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><path d="M1.5,1.505c2.256,-0 4.511,-0.06 6.754,0.239c18.635,2.486 -3.215,18.006 -1.664,25.182c2.935,13.572 25.21,10.8 11.109,28.53" style="fill:none;stroke:#80c0f2;stroke-width:3px;"/></svg>`
	];

	$: confetti = new Array(numConfetti)
		.fill(``)
		.map((_, i) => {
			return {
				character: characters[i % characters.length],
				x: (i / numConfetti) * 100,
				y: -10 - Math.random() * 10,
				r: 1 + Math.random() * 1
			};
		})
		.sort((a, b) => a.r - b.r);
</script>

{#if show && !animationFinished}
	<div class="confetti">
		{#each confetti as c}
			<span
				class="confetti-piece"
				style="left: {c.x}%; top: {c.y}%; --confetti-scale: {c.r}; animation-duration: {animationDurationSeconds *
					c.r}s;">{@html c.character}</span
			>
		{/each}
	</div>
{/if}

<style lang="scss">
	.confetti-piece {
		position: absolute;
		user-select: none;
		animation-name: slide-down;
		animation-timing-function: linear;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
		will-change: transform;
		transform: translateZ(0);
		-webkit-transform: translateZ(0);
	}
	.confetti {
		display: flex;
		justify-content: center;
		position: absolute;
		height: 100vh;
		width: 100vw;
	}
	@keyframes slide-down {
		0% {
			transform: scale(var(--confetti-scale)) translateY(0);
		}
		100% {
			transform: scale(var(--confetti-scale)) translateY(calc(110vh * var(--confetti-scale)));
		}
	}
</style>

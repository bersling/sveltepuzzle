<script lang="ts">
	import { difficulty, updateDifficulty } from './difficulty.store';
	import { Difficulty } from './models';

	export let isBigSlider: boolean = false;

	const clickHandler = () => {
		updateDifficulty(
			$difficulty === Difficulty.PRESCHOOLER ? Difficulty.TODDLER : Difficulty.PRESCHOOLER
		);
	};
</script>

<div class="difficulty-selector-wrapper {isBigSlider ? 'big-slider' : 'small-slider'}">
	<button class="difficulty-slider" on:click={clickHandler}>
		<div class="difficulty-selector {$difficulty === Difficulty.PRESCHOOLER ? 'preschooler' : ''}">
			<img
				src="/toddlers/toddler.svg"
				alt="Toddler Icon"
				class={$difficulty === Difficulty.PRESCHOOLER ? 'hidden' : ''}
			/>
			<img
				src="/toddlers/preschooler.svg"
				alt="Preschooler Icon"
				class={$difficulty === Difficulty.TODDLER ? 'hidden' : ''}
			/>
		</div>
	</button>
</div>

<style lang="scss">
	@use 'sass:math';
	.difficulty-selector-wrapper {
		display: grid;
		align-items: center;
		justify-items: center;

		@mixin slider($padding-top, $padding-bottom, $icon-size, $gap-size, $padding) {
			padding-top: $padding-top;
			padding-bottom: $padding-bottom;

			.difficulty-slider {
				padding: $padding;
				border-radius: math.div($icon-size + 2 * $padding, 2);
				width: (2 * $icon-size + $gap-size + 2 * $padding);
				height: $icon-size + 2 * $padding;

				background: #eee;

				transition: all ease-in-out 0.5s;
				box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.2);

				.difficulty-selector {
					border-radius: 50%;
					overflow: hidden;

					width: $icon-size;
					height: $icon-size;
					border: 1px solid #999;
					background-color: #94e05c;

					padding: 10%;

					position: relative;

					transition: all ease-in-out 0.5s;

					cursor: pointer;

					&.preschooler {
						transform: translateX(math.div(2 * $padding + 2 * $icon-size + $gap-size, 2));
					}

					img {
						position: absolute;
						top: 0;
						bottom: 0;
						right: 0;
						left: 0;
						margin: auto;

						width: 90%;
						height: 90%;

						transition: all ease-in-out 0.5s;
					}
				}
			}
		}

		&.big-slider {
			@include slider(10px, 10px, 70px, 10px, 5px);
		}

		&.small-slider {
			@include slider(10px, 10px, 50px, 5px, 3px);
		}

		.hidden {
			opacity: 0;
		}
	}
</style>

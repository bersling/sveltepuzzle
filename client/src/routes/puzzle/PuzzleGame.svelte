<script lang="ts">
	import { onMount } from 'svelte';
	import { shuffleArray } from '../utils';
	import PageWithNav from '../PageWithNav.svelte';
	import SuccessConfetti from '../SuccessConfetti.svelte';
	import { browser } from '$app/environment';
	import { height } from '../height.store';
	import { extractIdentifier, extractTouch, TouchMode, type TouchData } from '../touch';
	import { gameFinished } from '../finished.store';
	import { loadSounds, Sound } from '../sound';

	interface Tile {
		id: number; // in ascending order, so if ids in tiles is sorted, then the puzzle is solved.
		imageRow: number;
		imageCol: number;
	}

	export let imageSrcRoot: string;
	export let numCols: number;
	export let numRows: number;

	let isFinished = false;

	let pieceHeight = 0;
	let pieceWidth = 0;
	const imageOriginalSize = 512;
	let pieceMaxHeight = imageOriginalSize / numRows;
	let pieceMaxWidth = imageOriginalSize / numCols;

	$: if (browser) onResize();
	let tiles: Tile[] = [];

	onMount(() => {
		loadSounds([Sound.BLOP, Sound.SWOOSH]);
		let counter = 0;
		for (let i = 0; i < numRows; i++) {
			for (let j = 0; j < numCols; j++) {
				tiles.push({ imageRow: i, imageCol: j, id: counter++ });
			}
		}
		const unshuffledTiles = tiles;
		while (JSON.stringify(unshuffledTiles) === JSON.stringify(tiles)) {
			tiles = shuffleArray(tiles);
		}
		tiles = [...tiles]; // update UI

		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	});

	const touchDataMap = new Map<number, TouchData>();

	const touchMode = TouchMode.DRAG_ONLY;

	const onTouchstart = (e: TouchEvent | MouseEvent) => {
		if (!isFinished) {
			e.preventDefault();
			const touch = extractTouch(e);
			const identifier = extractIdentifier(touch);
			touchDataMap.set(identifier, {
				pageX: touch.pageX,
				pageY: touch.pageY,
				clientX: touch.clientX,
				clientY: touch.clientY,
				originPageX: touch.pageX,
				originPageY: touch.pageY,
				isScroll: false,
				target: e.target,
				touchMode
			});
		}

		// TODO: clone the node
	};

	// OPTIMIZE: consider some code sharing between match and puzzle here
	const onTouchmove = (e: TouchEvent | MouseEvent) => {
		// For mousemove, this is attached to the outer component to prevent that the mouse can be moved outside of the element when dragging fast.
		// Theoretically we have the same issue for mouseup, but there it should not be as much of a problem.
		// Still some weird artefacts e.g. when you move mouse outside of browser window and then release are possible.
		const touch = extractTouch(e);
		const identifier = extractIdentifier(touch);
		const oldTouchData = touchDataMap.get(identifier)!;
		if (oldTouchData != null) {
			const newTouchData: TouchData = {
				...oldTouchData,
				clientX: touch.clientX,
				clientY: touch.clientY,
				pageX: touch.pageX,
				pageY: touch.pageY
			};
			const deltaX = newTouchData.pageX - oldTouchData.pageX;
			const deltaY = newTouchData.pageY - oldTouchData.pageY;

			const target = oldTouchData.target as HTMLElement;

			target.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px)`;
			target.style.zIndex = '2';

			// TODO: perform swapping if necessary
		}
	};

	// OPTIMIZE: consider some code sharing between match and puzzle here
	const onTouchend = (tile: Tile) => (e: TouchEvent | MouseEvent) => {
		const touch = extractTouch(e);
		const identifier = extractIdentifier(touch);
		const oldTouchData = touchDataMap.get(identifier)!;

		if (oldTouchData != null) {
			const target = touch.target as HTMLElement;

			// reset translation
			target.style.transform = ``;
			target.style.zIndex = ``;

			const elementsFromPoint = document.elementsFromPoint(touch.pageX, touch.pageY);

			const topElement = elementsFromPoint[0]; // will be the div, not the image, for some reason
			if (topElement.getAttribute('draggable')) {
				// Emit a "change" event, doesn't matter too much which event type,
				// just something that can be listened to and where you can attach some custom data.
				const customEvent = new CustomEvent('change', {
					detail: {
						tile
					}
				} as any);
				topElement.dispatchEvent(customEvent);
			} else {
				// going back to origin
				// playSound(Sound.SWOOSH);
			}
			// cleaning up the data, otherwise we get a memory leak
			touchDataMap.delete(identifier);
		}
	};

	function isSortedAscending(arr: any[]): boolean {
		let second_index;
		for (let first_index = 0; first_index < arr.length; first_index++) {
			second_index = first_index + 1;
			if (arr[second_index] - arr[first_index] < 0) return false;
		}
		return true;
	}

	const onDrop = (dropTarget: Tile) => (e: Event) => {
		const draggedItem = (e as CustomEvent).detail.tile as Tile;
		const droppedOnSelf = draggedItem.id === dropTarget.id;

		if (!droppedOnSelf) {
			// playSound(Sound.BLOP);
			const indexOfDragged = tiles.indexOf(draggedItem);
			const indexOfDropTarget = tiles.indexOf(dropTarget);
			[tiles[indexOfDragged], tiles[indexOfDropTarget]] = [
				tiles[indexOfDropTarget],
				tiles[indexOfDragged]
			];
			tiles = [...tiles];

			isFinished = isSortedAscending(tiles.map((tile) => tile.id));
			gameFinished.set(isFinished);
		} else {
			// playSound(Sound.SWOOSH);
			// nothing to do
		}
	};

	function setScale() {
		const padding = 10; // also account for gaps
		const availableSize = Math.min(window.innerWidth, window.innerHeight) - padding;
		pieceHeight = availableSize / numRows;
		pieceWidth = availableSize / numCols;
	}
	const onResize = () => {
		setScale();
	};
</script>

<PageWithNav parent="/puzzle" overflowHidden={true}>
	<div class="confetti">
		<SuccessConfetti show={isFinished} />
	</div>
	<div class="board-wrapper" style="height: {$height}px" on:mousemove={onTouchmove}>
		<div
			id="puzzle"
			class="board"
			style="--num-cols: {numCols}; --num-rows: {numRows}; gap: {isFinished ? 0 : 1}px"
		>
			{#each tiles as tile}
				<div
					class="draggable"
					style="outline-width: {isFinished ? 0 : 1}px;"
					on:mousedown={onTouchstart}
					on:mouseup={onTouchend(tile)}
					on:touchstart={onTouchstart}
					on:touchmove={onTouchmove}
					on:touchend={onTouchend(tile)}
					on:change={onDrop(tile)}
					draggable={!isFinished}
				>
					<img
						src={`${imageSrcRoot}/output_${tile.imageRow}_${tile.imageCol}.jpg`}
						style="width: {pieceWidth}px; height: {pieceHeight}px; max-width: {pieceMaxWidth}px; max-height: {pieceMaxHeight}px"
					/>
				</div>
			{/each}
		</div>
	</div>
</PageWithNav>

<style lang="scss">
	$border-color: #ddd;
	.board-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
	}
	.board {
		display: inline-grid;
		grid-template-columns: repeat(var(--num-cols), 1fr);
		grid-template-rows: repeat(var(--num-rows), 1fr);
		box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		border-radius: 5px;
		gap: 1px;
		background: white;
	}
	.draggable {
		cursor: pointer;
		background: white;
		outline: 1px solid $border-color;
	}
	img {
		user-select: none;
		pointer-events: none;
		display: block;
	}
</style>

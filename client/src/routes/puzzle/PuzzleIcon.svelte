<script lang="ts">
	import { onMount } from 'svelte';

	export let imageSrcRoot: string;
	export let numCols: number;
	export let numRows: number;

	interface Tile {
		id: number;
		imageRow: number;
		imageCol: number;
	}
	let tiles: Tile[] = [];

	onMount(() => {
		let counter = 0;
		for (let i = 0; i < numRows; i++) {
			for (let j = 0; j < numCols; j++) {
				tiles.push({ imageRow: i, imageCol: j, id: counter++ });
			}
		}
		tiles = [...tiles];
	});
</script>

<div class="board" id="icon-screenshot" style="--num-cols: {numCols}; --num-rows: {numRows};">
	{#each tiles as tile}
		<img src={`${imageSrcRoot}/output_${tile.imageRow}_${tile.imageCol}.jpg`} />
	{/each}
</div>

<style>
	.board {
		display: inline-grid;
		grid-template-columns: repeat(var(--num-cols), 1fr);
		grid-template-rows: repeat(var(--num-rows), 1fr);
		gap: 5px;
	}
</style>

<script lang="ts">
	import Categories from '../Categories.svelte';
	import { difficulty } from '../difficulty.store';
	import { Category, type CategoryItem, hueByCategoryLight, Difficulty } from '../models';
	import { filterByDifficulty } from '../utils';
	import { PUZZLE_PAGES } from './puzzle-pages';

	const color = hueByCategoryLight(Category.PUZZLE);

	const games: CategoryItem[] = filterByDifficulty(
		PUZZLE_PAGES.sort((a, b) => (a.link > b.link ? 1 : -1)).map((item, idx) => ({
			...item,
			color,
			difficulty: idx >= 24 ? Difficulty.PRESCHOOLER : Difficulty.TODDLER
		})),
		$difficulty
	);
</script>

<Categories parent="/" items={games} />

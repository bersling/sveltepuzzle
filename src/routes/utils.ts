import type { CategoryItem, Difficulty } from './models';

export function shuffleArray<T>(array: T[]): T[] {
	const arrayCopy = [...array];
	for (let i = arrayCopy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
	}
	return arrayCopy;
}

export function pickRandomElement<T>(arr: T[]): T {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

export function filterByDifficulty<T extends CategoryItem>(
	categories: T[],
	difficulty: Difficulty | null
): T[] {
	const difficultyLoaded = difficulty != null;
	return categories.filter((cat) => {
		const doShow = !cat.difficulty || cat.difficulty === difficulty;
		return difficultyLoaded && doShow;
	});
}

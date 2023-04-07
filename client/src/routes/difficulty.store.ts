import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { Difficulty } from './models';

const defaultDifficulty = Difficulty.TODDLER;
const localStorageKey = 'DIFFICULTY';

function getFromLocalStorageOrDefault(): Difficulty {
	if (browser) {
		return (localStorage?.getItem(localStorageKey) as Difficulty | null) ?? defaultDifficulty;
	} else return defaultDifficulty;
}

export function updateDifficulty(newValue: Difficulty) {
	difficulty.update(() => {
		localStorage.setItem(localStorageKey, newValue);
		return newValue;
	});
}

export const difficulty = writable<Difficulty>(getFromLocalStorageOrDefault());

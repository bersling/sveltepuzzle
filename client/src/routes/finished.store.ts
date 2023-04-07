import { writable } from 'svelte/store';

export const gameFinished = writable(false);
import { gameFinishedSounds, playSound } from './sound';
import { pickRandomElement } from './utils';

gameFinished.subscribe((isFinished) => {
	if (isFinished) {
		playSound(pickRandomElement(gameFinishedSounds));
	}
});

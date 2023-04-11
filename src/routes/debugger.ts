import { writable } from 'svelte/store';

export const debugTextHistory = writable('');
export const debugText = writable('Debugger Turned On');

debugText.subscribe((newText) => {
	debugTextHistory.update((old) => old + '|' + newText);
});

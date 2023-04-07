export enum Sound {
	BLOP = 'BLOP',
	SWOOSH = 'SWOOSH',
	FANFARE = 'FANFARE',
	CLICK = 'CLICK',
	WIN_WOHOO = 'WIN_WOHOO',
	WIN_PIANO = 'WIN_PIANO',
	WIN_BIUING = 'WIN_BIUING',
	WRONG = 'WRONG',
	SCRATCH = 'SCRATCH',
	SWIPE = 'SWIPE',
	SWIPE2 = 'SWIPE2',
	CORRECT = 'CORRECT',
	SQUISH = 'SQUISH',
	SCRIBBLE = 'SCRIBBLE',
	DRAW = 'DRAW'
}

let audioCtx: AudioContext | null = null;
function getAudioContext(): AudioContext {
	if (audioCtx == null) {
		audioCtx = new AudioContext();
	}
	return audioCtx;
}

type SoundPlayer = () => void;
let soundPlayerMap: { [sound: string]: SoundPlayer } = {};

export function loadSounds(sounds: Sound[]) {
	[...basicSounds, ...sounds].forEach((sound) => {
		if (soundPlayerMap[sound] == null) {
			fetch(`/assets/audio/${sound}.mp3`)
				.then((response) => response.arrayBuffer())
				.then((arrayBuffer) => getAudioContext().decodeAudioData(arrayBuffer))
				.then((audioBuffer) => {
					soundPlayerMap[sound] = () => {
						// create a new AudioBufferSourceNode that references the same buffer
						const source = getAudioContext().createBufferSource();
						source.buffer = audioBuffer;

						// connect the source to the AudioContext's destination
						source.connect(getAudioContext().destination);

						// start the source
						source.start(0);
					};
				});
		}
	});
}

export async function playSound(sound: Sound) {
	const soundPlayer = soundPlayerMap[sound];
	if (soundPlayer != null) {
		soundPlayer();
	} else {
		console.warn(`Sound player for ${sound} not ready yet.`);
	}
}

export const gameFinishedSounds = [Sound.WIN_PIANO, Sound.WIN_WOHOO, Sound.WIN_BIUING];

export const basicSounds = [...gameFinishedSounds, Sound.CLICK];

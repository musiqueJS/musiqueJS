import {Note} from "./Note";

class Partition {

	/**
	 * @param {Note[]} notes - The notes that will be played sequentially.
	 * @param {OscillatorType} oscillator - The oscillator type that will be used to play the partition.
	 * @param {AudioContext} audioContext - The audio context that will be used to play the partition.
	 */
	constructor(
		public notes: Note[],
		public oscillator: OscillatorType = 'sine',
		public audioContext: AudioContext,
	) {}

	/**
	 * Plays the partition sequentially.
	 */
	public async play(): Promise<void> {
		for (const note of this.notes) {
			await this.playNote(note)
		}
	}

	public async playNote(note: Note): Promise<void> {
		return new Promise<void>((resolve) => {
			note.play(this.audioContext, this.oscillator, resolve)
		});
	}
}

export { Partition }

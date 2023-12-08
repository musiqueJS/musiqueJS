import {CustomChord} from "./CustomChord"

class Partition {

	/**
	 * @param {CustomChord[]} chords - The chords that will be played sequentially.
	 * @param {OscillatorType} oscillator - The oscillator type that will be used to play the partition.
	 * @param {AudioContext} audioContext - The audio context that will be used to play the partition.
	 */
	constructor(
		public chords: CustomChord[],
		public oscillator: OscillatorType = 'sine',
		public audioContext: AudioContext,
	) {}

	/**
	 * Plays the partition sequentially.
	 */
	public async play(): Promise<void> {
		for (const chord of this.chords) {
			await this.playChord(chord)
		}
	}

	/**
	 * Plays the chord simultaneously.
	 * @param {CustomChord} chord
	 */
	public async playChord(chord: CustomChord): Promise<void> {
		return new Promise<void>((resolve) => {
			let oscillators = chord.getOscillatorNodes(this.audioContext, this.oscillator)

			if (oscillators[0]) {
				oscillators.forEach(({oscillatorNode, noteDuration}) => {
					oscillatorNode.start(this.audioContext.currentTime)

					setTimeout(() => {
						oscillatorNode.stop(0);
						oscillatorNode.disconnect();

						resolve();
					}, noteDuration * 1000);
				});
			}
		});
	}
}

export { Partition }

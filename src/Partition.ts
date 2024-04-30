import CustomOscillatorType from "./CustomOscillatorType";
import PlayableInterface from "./PlayableInterface";

class Partition {

	/**
	 * @param {PlayableInterface[]} playable - The notes/chords that will be played sequentially.
	 * @param {OscillatorType} oscillator - The oscillator type that will be used to play the partition.
	 * @param {AudioContext} audioContext - The audio context that will be used to play the partition.
	 */
	constructor(
		public playable: PlayableInterface[],
		public oscillator: CustomOscillatorType = 'square',
		public audioContext: AudioContext,
	) {}

	/**
	 * Plays the partition sequentially.
	 */
	public async play(): Promise<void> {
		for (const playable of this.playable) {
			await this.playSingle(playable)
		}
	}

	private async playSingle(playable: PlayableInterface): Promise<void> {
		return new Promise<void>((resolve) => {
			playable.play(this.audioContext, this.oscillator, resolve)
		});
	}
}

export { Partition }

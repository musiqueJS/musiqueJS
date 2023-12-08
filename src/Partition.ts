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
	 * @returns {Promise<void>}
	 */
	public async play() {
		for (const chord of this.chords) {
			await this.playChord(chord)
		}
	}

	/**
	 * Plays the chord simultaneously.
	 * @returns {Promise<void>}
	 * @param {CustomChord} chord
	 */
	public async playChord(chord: CustomChord) {
		return new Promise<void>((resolve) => {
			let oscillators = this.getOscillatorNodesFromChord(chord)

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

	private getOscillatorNodesFromChord(chord: CustomChord) {
		let gainNode: GainNode
		let oscillatorNode: OscillatorNode

		return chord.notes.map((note) => {
			const noteDuration: number = note.duration

			gainNode = this.audioContext.createGain()
			gainNode.connect(this.audioContext.destination)
			gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
			gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.01)
			gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + noteDuration - 0.01)

			oscillatorNode = this.audioContext.createOscillator()
			oscillatorNode.connect(gainNode)
			oscillatorNode.connect(this.audioContext.destination)
			oscillatorNode.type = this.oscillator
			oscillatorNode.frequency.value = note.getPitch()

			return { oscillatorNode, noteDuration }
		})
	}
}

export { Partition }

import {CustomAccord} from "./CustomAccord"

class Partition {

	/**
	 * @param {CustomAccord[]} accords - The accords that will be played sequentially.
	 * @param {OscillatorType} oscillator - The oscillator type that will be used to play the partition.
	 * @param {AudioContext} audioContext - The audio context that will be used to play the partition.
	 */
	constructor(
		public accords: CustomAccord[],
		public oscillator: OscillatorType = 'sine',
		public audioContext: AudioContext,
	) {}

	/**
	 * Plays the partition sequentially.
	 * @returns {Promise<void>}
	 */
	public async playPartition() {
		for (const accord of this.accords) {
			await this.playAccord(accord)
		}
	}

	/**
	 * Plays the accord simultaneously.
	 * @returns {Promise<void>}
	 * @param {CustomAccord} accord
	 */
	public async playAccord(accord: CustomAccord) {
		return new Promise<void>((resolve) => {
			let oscillators = this.getOscillatorNodesFromAccord(accord)

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

	private getOscillatorNodesFromAccord(accord: CustomAccord) {
		let gainNode: GainNode
		let oscillatorNode: OscillatorNode

		return accord.notes.map((note) => {
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

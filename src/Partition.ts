import {CustomAccord} from "./CustomAccord"

class Partition {
	constructor(
		public accords: CustomAccord[],
		public oscillator: OscillatorType = 'sine',
		public audioContext: AudioContext,
	) {}

	public async playPartition() {
		for (const accord of this.accords) {
			await this.playAccord(accord)
		}
	}

	public async playAccord(accord: CustomAccord) {
		return new Promise<void>((resolve) => {
			let oscillators = this.getOscillatorNodesFromAccord(accord)

			if (oscillators[0]) {
				oscillators.forEach(({oscillatorNode}) => oscillatorNode.start(this.audioContext.currentTime));

				setTimeout(() => {
					oscillators.forEach(({oscillatorNode}) => {
						oscillatorNode.stop(0);
						oscillatorNode.disconnect();
					});

					resolve();
				}, oscillators[0].noteDuration * 1000);
			}
		});
	}

	private getOscillatorNodesFromAccord(accord: CustomAccord) {
		let gainNode: GainNode
		let oscillatorNode: OscillatorNode

		return accord.notes.map((note) => {
			const noteDuration: number = note.duration * 0.18

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

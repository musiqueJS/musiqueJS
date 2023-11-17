import {CustomAccord} from "./CustomAccord"
import {Silence} from "./Silence";

class Partition {

	constructor(
		public accords: CustomAccord[]|Silence[],
		public oscillator: OscillatorType = 'sine',
		public audioContext: AudioContext,
		public bpm: number = 60,
	) {}

	public playPartition() {
		const timeout = this.bpm / 60 // beat per second

		console.log(timeout)
		let index = 0
		let lastAccord: CustomAccord|Silence|undefined
		let remaining: number

		let loop = 1
		let playing = setInterval(() => {
			const accord = this.accords[index]

			let isNew: boolean = accord != lastAccord
			if (accord instanceof CustomAccord) {
				let oscillators = this.playAccord(accord)

				if (isNew) {
					remaining = 0
					oscillators.forEach(({ oscillatorNode, noteDuration, gainNode }) => {
						oscillatorNode.start(this.audioContext.currentTime)
						oscillatorNode.onended = (ev) => {
							console.log(ev)
						}
						oscillatorNode.stop(this.audioContext.currentTime + (timeout / noteDuration))
						console.log('oscillatorNode.stop ' + (timeout / noteDuration))
						remaining = noteDuration > remaining ? noteDuration : remaining
					})
				}
			}

			remaining = remaining - 1
			lastAccord = accord

			if (remaining == 0) {
				index++;
			} else if (remaining < 0) {
				clearInterval(playing)
			}
			console.log('loop ' + loop)
			loop++
		},  1000 / timeout)
	}

	private playAccord(accord: CustomAccord) {
		let gainNode: GainNode
		let oscillatorNode: OscillatorNode

		return accord.notes.map((note) => {
			const noteDuration: number = note.duration

			gainNode = this.audioContext.createGain()
			gainNode.connect(this.audioContext.destination)
			gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
			gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.01)
			gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + noteDuration - 0.01)

			oscillatorNode = this.audioContext.createOscillator()
			oscillatorNode.connect(gainNode)
			oscillatorNode.connect(this.audioContext.destination)
			oscillatorNode.type = this.oscillator
			oscillatorNode.frequency.value = note.getPitch()

			return { oscillatorNode, noteDuration, gainNode }
		})
	}
}

export { Partition }

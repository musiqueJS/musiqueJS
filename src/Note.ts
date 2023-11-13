class Note {
	constructor(public frequency: number) {}

	private context = new AudioContext()

	private createOscillator() {
		const oscillator = this.context.createOscillator()
		oscillator.type = 'sine'
		oscillator.frequency.value = this.frequency
		return oscillator
	}

	private createGain() {
		const gain = this.context.createGain()
		gain.gain.value = 0.1
		return gain
	}

	play() {
		const oscillator = this.createOscillator()
		const gain = this.createGain()

		oscillator.connect(gain)
		gain.connect(this.context.destination)

		oscillator.start()
		oscillator.stop(this.context.currentTime + 1)
	}
}

export { Note }

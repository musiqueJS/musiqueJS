import {NoteEnum} from "./NoteEnum";

class Note {
	private pitch: number;

	/**
	 * @param {NoteEnum} note
	 * @param {number} octave - 0 to 8
	 * @param {number} duration How long the note will be played in seconds. (you most likely want to stay under 1 second)
	 */
	constructor(
		public note: NoteEnum,
		public octave: number,
		public duration: number,
	) {
		this.pitch = this.getPitch();
	}

	/**
	 * @returns number The pitch of the note in Hz.
	 */
	public getPitch(): number {
		let step = this.note.valueOf();
		let power = Math.pow(2, (this.octave * 12 + step - 57)/12);
		return 440 * power;
	}

	public play(audioContext: AudioContext, oscillator: OscillatorType): void {
		const oscillatorNode = this.getOscillator(audioContext, oscillator)
		oscillatorNode.start(audioContext.currentTime)
		setTimeout(() => {
			oscillatorNode.stop(0);
			oscillatorNode.disconnect();
		}, this.duration * 1000);
	}

	public getOscillator(audioContext: AudioContext, oscillator: OscillatorType): OscillatorNode {
		let gainNode: GainNode
		let oscillatorNode: OscillatorNode

		gainNode = audioContext.createGain()
		gainNode.connect(audioContext.destination)
		gainNode.gain.setValueAtTime(0, audioContext.currentTime)
		gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01)
		gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + this.duration - 0.01)

		oscillatorNode = audioContext.createOscillator()
		oscillatorNode.connect(gainNode)
		oscillatorNode.type = oscillator
		oscillatorNode.frequency.value = this.getPitch()

		return oscillatorNode
	}
}

export { Note }

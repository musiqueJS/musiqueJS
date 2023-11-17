import {NoteEnum} from "./NoteEnum";

class Note {

	/**
	 * @param {NoteEnum} note
	 * @param {number} octave - 0 to 8
	 * @param {number} duration How many beats will this note last.
	 * @param {number} playPerBeat How many times will this note play per beat.
	 * @param pitch
	 */
	constructor(
		public note: NoteEnum,
		public octave: number,
		public duration: number,
		public playPerBeat: number,
		private pitch: number,
	) {
		this.pitch = this.getPitch();
	}

	getPitch() {
		let step = this.note.valueOf();
		let power = Math.pow(2, (this.octave * 12 + step - 57)/12);
		return 440 * power;
	}

	// TODO: Implement Play method
	// play() {
	// 	const oscillator = this.createOscillator()
	// 	const gain = this.createGain()
	//
	// 	oscillator.connect(gain)
	// 	gain.connect(this.context.destination)
	//
	// 	oscillator.start()
	// 	oscillator.stop(this.context.currentTime + 1)
	// }
}

export { Note }

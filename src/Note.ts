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
	 * @returns {number} The pitch of the note in Hz.
	 */
	getPitch() {
		let step = this.note.valueOf();
		let power = Math.pow(2, (this.octave * 12 + step - 57)/12);
		return 440 * power;
	}
}

export { Note }

import {Partition} from "./Partition";
import {NoteEnum} from "./NoteEnum";
import {CustomAccord} from "./CustomAccord";
import {Note} from "./Note";

interface JSONNote {
	note: string,
	duration: number,
	octave: number,
}

class JSONPartition extends Partition {
	constructor(
		public json: JSONNote[][],
		public oscillator: OscillatorType = 'sine',
		public audioContext: AudioContext,
	) {
		let jsonAccords: CustomAccord[] = [];
		for (const accord of json) {
			let notes = [];
			for (const note of accord) {
				// @ts-ignore
				notes.push(new Note(NoteEnum[note.note], note.octave, note.duration));
			}
			jsonAccords.push(new CustomAccord(notes));
		}

		super(jsonAccords, oscillator, audioContext);
	}

}

export { JSONPartition }

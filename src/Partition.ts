import { Note } from "./Note"

class Partition {
	constructor(private notes: Note[]) {}

	private playNoteWithDelay(note: Note, delay: number) {
		setTimeout(() => note.play(), delay)
	}

	play() {
		let delay = 0
		this.notes.forEach((note) => {
			this.playNoteWithDelay(note, delay)
			delay += 1000
		})
	}
}

export { Partition }

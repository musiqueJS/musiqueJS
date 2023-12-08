import {Note} from "./Note";

class CustomChord {
    /**
     * @param {Note[]} notes - The notes that will be played simultaneously.
     */
    constructor(
        public notes: Note[],
    ) {}

    public play(audioContext: AudioContext, oscillator: OscillatorType): void {
        for (const note of this.notes) {
            note.play(audioContext, oscillator)
        }
    }

    public getOscillatorNodes(audioContext: AudioContext, oscillator: OscillatorType): { oscillatorNode: OscillatorNode, noteDuration: number }[] {
        return this.notes.map((note) => {
            const noteDuration: number = note.duration
            const oscillatorNode: OscillatorNode = note.getOscillator(audioContext, oscillator)

            return { oscillatorNode, noteDuration }
        })
    }
}

export { CustomChord }

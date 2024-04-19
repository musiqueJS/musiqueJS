import {Note} from "./Note";
import PlayableInterface from "./PlayableInterface";

class CustomChord implements PlayableInterface {
    /**
     * @param {Note[]} notes - The notes that will be played simultaneously.
     */
    constructor(
        public notes: Note[],
    ) {}

    public play(audioContext: AudioContext, oscillator: OscillatorType, resolve: () => void = () => {}): void {
        for (const note of this.notes) {
            note.play(audioContext, oscillator, resolve)
        }
    }
}

export { CustomChord }

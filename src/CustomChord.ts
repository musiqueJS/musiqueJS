import CustomOscillatorType from "./CustomOscillatorType";
import {Note} from "./Note";
import PlayableInterface from "./PlayableInterface";

class CustomChord implements PlayableInterface {
    /**
     * @param {Note[]} notes - The notes that will be played simultaneously.
     * @param {number} duration - How long the chord will be played in seconds. (you most likely want to stay under 1 second)
     */
    constructor(
        public notes: Note[],
        public duration?: number
    ) {}

    public play(audioContext: AudioContext, oscillator: CustomOscillatorType, resolve: () => void = () => {}): void {
        for (const note of this.notes) {
            note.play(audioContext, oscillator, resolve)
        }
    }
}

export { CustomChord }

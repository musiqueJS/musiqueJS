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

    public play(audioContext: AudioContext, oscillator: OscillatorType, resolve: () => void = () => {}): void {
        for (const note of this.notes) {
            // if (this.duration) {
            //     note.duration = this.duration;
            // }

            note.play(audioContext, oscillator, resolve)
        }

        setTimeout(() => {
            resolve();

        }, 3 * 1000);
    }
}

export { CustomChord }

import {Note} from "./Note";

class CustomChord {
    /**
     * @param {Note[]} notes - The notes that will be played simultaneously.
     */
    constructor(
        public notes: Note[],
    ) {}
}

export { CustomChord }

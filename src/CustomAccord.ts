import {Note} from "./Note";

class CustomAccord {
    /**
     * @param {Note[]} notes - The notes that will be played simultaneously.
     */
    constructor(
        public notes: Note[],
    ) {}
}

export { CustomAccord }

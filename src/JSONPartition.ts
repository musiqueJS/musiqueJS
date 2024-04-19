import { Partition } from "./Partition";
import { Note } from "./Note";

interface JSONNote {
  note: string;
  duration: number;
  octave: number;
}

class JSONPartition extends Partition {
  /**
   * @param {JSONNote[]} json - The JSON that will be parsed into a partition.
   * @param {OscillatorType} oscillator - The oscillator type that will be used to play the partition.
   * @param {AudioContext} audioContext - The audio context that will be used to play the partition.
   */
  constructor(
    public json: JSONNote[],
    public oscillator: OscillatorType = "sine",
    public audioContext: AudioContext,
  ) {
    let jsonNotes: Note[] = [];

    for (const note of json) {
      // @ts-ignore
      jsonNotes.push(new Note(note.note, note.octave, note.duration));
    }

    super(jsonNotes, oscillator, audioContext);
  }
}

export { JSONPartition };

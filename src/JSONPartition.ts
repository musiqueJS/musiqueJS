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
    enum NoteEnum {
      C = 0,
      CSharp = 1,
      D = 2,
      DSharp = 3,
      E = 4,
      F = 5,
      FSharp = 6,
      G = 7,
      GSharp = 8,
      A = 9,
      ASharp = 10,
      B = 11,
    }
    let jsonNotes: Note[] = [];

    for (const note of json) {
      // @ts-ignore
      jsonNotes.push(new Note(NoteEnum[note.note], note.octave, note.duration));
    }

    super(jsonNotes, oscillator, audioContext);
  }
}

export { JSONPartition };

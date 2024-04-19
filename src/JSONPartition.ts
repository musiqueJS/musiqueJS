import { Partition } from "./Partition";
import { Note } from "./Note";
import { CustomChord } from "./CustomChord";
import { JSONNote, JSONMusic } from "./interface/JSONPlayable";

class JSONPartition extends Partition {
  /**
   * @param {JSONMusic[]} json - The JSON that will be parsed into a partition.
   * @param {OscillatorType} oscillator - The oscillator type that will be used to play the partition.
   * @param {AudioContext} audioContext - The audio context that will be used to play the partition.
   */
  constructor(
    public json: JSONMusic[],
    public oscillator: OscillatorType = "sine",
    public audioContext: AudioContext,
  ) {
    let jsonNotes: Note[] = [];

    for (const playable of json) {
      if (isJSONNote(playable)) {
        // @ts-ignore
        jsonNotes.push(new Note(playable.note, playable.octave, playable.duration));
      } else if (isJSONChord(playable)) {
        // @ts-ignore
        jsonNotes.push(new CustomChord(playable.map((note) => new Note(note.note, note.octave, note.duration))));
      } else {
        throw new Error("Invalid JSONMusic");
      }
    }

    super(jsonNotes, oscillator, audioContext);
  }
}

function isJSONNote(obj: any): obj is JSONNote {
  return 'note' in obj && 'duration' in obj && 'octave' in obj;
}

function isJSONChord(obj: any): obj is JSONNote[] {
  return Array.isArray(obj) && obj.every(isJSONNote);
}

export { JSONPartition };

import { Note } from "../src/Note";
import { Partition } from "../src/Partition";

// Mock classes and types
class MockAudioContext {
  createOscillator() {
    return {
      connect: jest.fn(),
      type: '',
      frequency: {
        value: 0,
      },
      start: jest.fn(),
      stop: jest.fn(),
      disconnect: jest.fn(),
    };
  }

  createGain() {
    return {
      connect: jest.fn(),
      gain: {
        setValueAtTime: jest.fn(),
        linearRampToValueAtTime: jest.fn(),
      },
    };
  }
}

const mockAudioContext = new MockAudioContext() as any;

describe('Partition class', () => {
  test('constructor initializes properties correctly', () => {
    const notes = [new Note('C', 4, 0.5), new Note('D', 5, 0.8)];
    const partition = new Partition(notes, 'sine', mockAudioContext);

    expect(partition.notes).toEqual(notes);
    expect(partition.oscillator).toBe('sine');
    expect(partition.audioContext).toBe(mockAudioContext);
  });

  test('play method plays notes sequentially', async () => {
    const notes = [new Note('C', 4, 0.5), new Note('D', 5, 0.8)];
    const partition = new Partition(notes, 'sine', mockAudioContext);

    // Mock the playNote method to check if it is called with the correct notes
    partition.playNote = jest.fn();

    await partition.play();

    expect(partition.playNote).toHaveBeenCalledTimes(2);
    expect(partition.playNote).toHaveBeenCalledWith(notes[0]);
    expect(partition.playNote).toHaveBeenCalledWith(notes[1]);
  });

  test('playNote method calls play method of the Note class', async () => {
    const note = new Note('C', 4, 0.5);
    const partition = new Partition([note], 'sine', mockAudioContext);

    // Mock the play method of the Note class
    note.play = jest.fn(() => Promise.resolve());

    await partition.playNote(note);

    expect(note.play).toHaveBeenCalledWith(mockAudioContext, 'sine', expect.any(Function));
  });
});

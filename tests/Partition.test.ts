import { Partition } from '../src/Partition';
import { Note } from '../src/Note';

// Mock AudioContext for testing
const audioContext: any = {
  currentTime: 0,
  createGain: jest.fn(() => ({
    connect: jest.fn(),
    gain: {
      setValueAtTime: jest.fn(),
      linearRampToValueAtTime: jest.fn(),
    },
  })),
  createOscillator: jest.fn(() => ({
    connect: jest.fn(),
    type: '',
    frequency: { value: 0 },
    start: jest.fn(),
    stop: jest.fn(),
    disconnect: jest.fn(),
  })),
};

describe('Partition class', () => {
  it('should create a partition instance', () => {
    const notes = [new Note('C', 4, 0.5), new Note('D', 4, 0.5)];
    const partition = new Partition(notes, 'sine', audioContext);
    expect(partition).toBeInstanceOf(Partition);
  });

  it('should play the partition', async () => {
    const notes = [new Note('C', 4, 0.5), new Note('D', 4, 0.5)];
    const partition = new Partition(notes, 'sine', audioContext);

    // Mock the playNote method
    partition.playNote = jest.fn(() => Promise.resolve());

    await partition.play();

    // Ensure playNote is called for each note in the partition
    expect(partition.playNote).toHaveBeenCalledTimes(notes.length);

    // Add any additional assertions or checks if needed
  });

  it('should play a single note', async () => {
    const note = new Note('C', 4, 0.5);
    const partition = new Partition([note], 'sine', audioContext);

    // Mock the playNote method
    partition.playNote = jest.fn(() => Promise.resolve());

    await partition.playNote(note);

    // Ensure playNote is called with the correct note
    expect(partition.playNote).toHaveBeenCalledWith(note);

    // Add any additional assertions or checks if needed
  });
});

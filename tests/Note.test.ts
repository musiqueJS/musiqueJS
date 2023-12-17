import { Note } from '../src/Note';

describe('Note class', () => {
  it('should create a note instance', () => {
    const note = new Note('C', 4, 0.5);
    expect(note).toBeInstanceOf(Note);
  });

  it('should calculate pitch correctly', () => {
    const note = new Note('A', 3, 1);
    // Replace expectedValue with the expected pitch for the given note, octave, and duration.
    const expectedValue = 220; // Example value, replace with the correct expected pitch.
    expect(note.getPitch()).toBeCloseTo(expectedValue);
  });

  it('should play the note', (done) => {
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

    const note = new Note('C', 4, 0.5);
    note.play(audioContext, 'sine', () => {
      done();
    });

  });
});

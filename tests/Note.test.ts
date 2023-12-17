import { Note } from '../src/Note'; // replace 'your-file-name' with the actual file name

describe('Note class', () => {
  test('constructor initializes properties correctly', () => {
    const note = new Note('C', 4, 0.5);

    expect(note.note).toBe('C');
    expect(note.octave).toBe(4);
    expect(note.duration).toBe(0.5);
  });

  test('getPitch returns the correct pitch', () => {
    const note = new Note('D', 3, 1);
    const pitch = note.getPitch();

    // you may want to use a library for more precise floating-point comparisons
    expect(pitch).toBeCloseTo(146.83, 2); // adjust the precision as needed
  });

  test('play method creates and stops oscillator node', () => {
    // Mock AudioContext and OscillatorNode
    const audioContext = {
      createOscillator: jest.fn(() => ({
        connect: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
        disconnect: jest.fn(),
      })),
      createGain: jest.fn(() => ({
        connect: jest.fn(),
        gain: {
          setValueAtTime: jest.fn(),
          linearRampToValueAtTime: jest.fn(),
        },
      })),
      currentTime: 0,
    } as any;

    const note = new Note('A', 5, 0.8);
    note.play(audioContext, 'sine');

    // Check if the methods were called
    expect(audioContext.createOscillator).toHaveBeenCalled();
    expect(audioContext.createGain).toHaveBeenCalled();

    // Adjust the following expectations based on your implementation
    expect(audioContext.createOscillator().connect).toHaveBeenCalled();
    expect(audioContext.createOscillator().start).toHaveBeenCalledWith(audioContext.currentTime);
    expect(audioContext.createOscillator().stop).toHaveBeenCalledWith(0);
    expect(audioContext.createOscillator().disconnect).toHaveBeenCalled();
  });

  test('getOscillator method returns an oscillator node with correct settings', () => {
    // Mock AudioContext and OscillatorNode
    const audioContext = {
      createOscillator: jest.fn(() => ({
        connect: jest.fn(),
        type: '',
        frequency: {
          value: 0,
        },
      })),
      createGain: jest.fn(() => ({
        connect: jest.fn(),
        gain: {
          setValueAtTime: jest.fn(),
          linearRampToValueAtTime: jest.fn(),
        },
      })),
    } as any;

    const note = new Note('GSharp', 6, 0.3);
    const oscillatorNode = note.getOscillator(audioContext, 'sine');

    // Adjust the following expectations based on your implementation
    expect(oscillatorNode.connect).toHaveBeenCalled();
    expect(oscillatorNode.type).toBe('sine');
    expect(oscillatorNode.frequency.value).toBe(note.getPitch());
  });
});

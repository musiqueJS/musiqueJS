import PlayableInterface from "./PlayableInterface";
import CustomOscillatorType from "./CustomOscillatorType";

class Note implements PlayableInterface {
  /**
   * @param note
   * @param {number} octave - 0 to 8
   * @param {number} duration How long the note will be played in seconds. (you most likely want to stay under 1 second)
   */
  constructor(
    public note:
      | "C"
      | "CSharp"
      | "D"
      | "DSharp"
      | "E"
      | "F"
      | "FSharp"
      | "G"
      | "GSharp"
      | "A"
      | "ASharp"
      | "B",
    public octave: number,
    public duration: number,
  ) {
  }

  /**
   * @returns {number} The pitch of the note in Hz.
   */
  public getPitch(): number {
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

    let step = NoteEnum[this.note];
    let power = Math.pow(2, (this.octave * 12 + step - 57) / 12);
    return 440 * power;
  }

  public play(audioContext: AudioContext, oscillator: CustomOscillatorType, resolve: () => void = () => {}): void {
    let oscillatorNode: OscillatorNode;
    if(oscillator === 'piano') {
      oscillatorNode = this.getPianoOscillator(audioContext);
    } else {
      oscillatorNode = this.getOscillator(audioContext, oscillator);
    }
    oscillatorNode.start(audioContext.currentTime);
    setTimeout(() => {
      oscillatorNode.stop(0);
      oscillatorNode.disconnect();

      resolve();
    }, this.duration * 1000);
  }


  public getOscillator(
    audioContext: AudioContext,
    oscillator: OscillatorType,
  ): OscillatorNode {
    let gainNode: GainNode;
    let oscillatorNode: OscillatorNode;

    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0.15,
      audioContext.currentTime + 0.01,
    );
    gainNode.gain.linearRampToValueAtTime(
      0,
      audioContext.currentTime + this.duration - 0.01,
    );

    oscillatorNode = audioContext.createOscillator();
    oscillatorNode.connect(gainNode);
    oscillatorNode.type = oscillator;
    oscillatorNode.frequency.value = this.getPitch();

    return oscillatorNode;
  }

  public getPianoOscillator(audioContext: AudioContext): OscillatorNode {
    const oscillatorNode = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillatorNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const attackTime = 0.01;
    const decayTime = 0.1;
    const releaseTime = 0.3;

    const now = audioContext.currentTime;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
    gainNode.gain.linearRampToValueAtTime(0.6, now + attackTime + decayTime);
    gainNode.gain.linearRampToValueAtTime(0, now + this.duration - releaseTime);

    const real = new Float32Array([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7]);
    const imag = new Float32Array(real.length).fill(0);
    const customWaveform = audioContext.createPeriodicWave(real, imag);

    oscillatorNode.setPeriodicWave(customWaveform);

    oscillatorNode.frequency.setValueAtTime(this.getPitch(), audioContext.currentTime);

    return oscillatorNode;
  }

}

export { Note };

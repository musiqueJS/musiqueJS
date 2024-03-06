export default interface PlayableInterface {
    play(audioContext: AudioContext, oscillator: OscillatorType, resolve: () => void): void;
}

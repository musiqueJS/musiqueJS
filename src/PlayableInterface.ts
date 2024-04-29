import CustomOscillatorType from "./CustomOscillatorType";

export default interface PlayableInterface {
    play(audioContext: AudioContext, oscillator: CustomOscillatorType, resolve: () => void): void;
}
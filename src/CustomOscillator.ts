class CustomOscillator {

    private audioContext: AudioContext;
    private oscillator: OscillatorNode;

    constructor() {
        this.audioContext = new AudioContext();
        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.connect(this.audioContext.destination);
    }

    public setFrequency(frequency: number) {
        this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    }

    public setWave(type: OscillatorType) {
        this.oscillator.type = type;
    }

    public start() {
        this.oscillator.start();
    }

    public stop() {
        this.oscillator.stop();
    }

}
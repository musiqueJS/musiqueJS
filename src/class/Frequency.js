class Frequency {

  /**
   *
   * @param {String} note A letter amongst these 'C','C#','D','D#','E','F','F#','G','G#','A','A#','B'.
   * @param {Number} octave Octave between 0 and 8.
   * @param {Number} length (0-1 recommended) Length of time between the end of this frequency and the start of the next, in seconds.
   * @param {String} oscillatorType (optional) Type of the OscillatorNode for this frequency, default will be played if blank.
   */
  constructor(note, octave, length, oscillatorType) {
    this._notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

    this._note = note;
    this._octave = octave;
    this._length = length;
    this._oscillatorType = oscillatorType;
  }

  /**
   * @returns {Number}
   */
  getPitch() {
    let step = this._notes.indexOf(this._note);
    let power = Math.pow(2, (this._octave * 12 + step - 57)/12);
    return 440 * power;
  }

  get note() {
    return this._note;
  }

  set note(value) {
    this._note = value;
  }

  get octave() {
    return this._octave;
  }

  set octave(value) {
    this._octave = value;
  }

  get length() {
    return this._length;
  }

  set length(value) {
    this._length = value;
  }

  get oscillatorType() {
    return this._oscillatorType;
  }

  /**
   * @param {String} value triangle, sawtooth, square, sine
   */
  set oscillatorType(value) {
    this._oscillatorType = value;
  }
}

export default Frequency;

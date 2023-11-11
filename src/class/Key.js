class Key {

  /**
   * @param {Frequency[]} frequencies
   */
  constructor(frequencies) {
    this._frequencies = frequencies;
  }

  get frequencies() {
    return this._frequencies;
  }

  set frequencies(value) {
    this._frequencies = value;
  }

  addFrequency(frequency) {
    this._frequencies.push(frequency);
  }

  removeFrequency(frequency) {
    this._frequencies = this._frequencies.filter((f) => f !== frequency);
  }
}

export default Key;

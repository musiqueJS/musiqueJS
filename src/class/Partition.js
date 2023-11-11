class Partition {

  /**
   * @param {Key[]} keys
   */
  constructor(keys) {
    this._keys = keys;
  }

  addKey (key) {
    this._keys.push(key);
  }

  get keys() {
    return this._keys;
  }

  set keys(value) {
    this._keys = value;
  }
}

export default Partition;

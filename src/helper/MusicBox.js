/**
 * Helper to easily play Partitions and Keys
 */
class MusicBox {

  /**
   * @param {AudioContext} audioContext
   */
  constructor(audioContext) {
    this._audioContext = audioContext;
  }

  /**
   * Play a single Key
   * @param {Key} key The key to be played
   * @param {GainNode?} gainNode (optional) If not provided, a default one will be used
   * @param {OscillatorNode?} oscillatorNode (optional) If not provided, a default one will be used
   */
  playKey(key, gainNode, oscillatorNode) {
    if ( !key ) {
      throw new Error('Key is required');
    }

    new Promise((resolve) => {
      const oscillators = key.frequencies.forEach((frequency) => {
        const noteDuration = frequency.length;

        if ( !gainNode ) {
          const gainNode = new GainNode(this._audioContext);
          gainNode.connect(this._audioContext.destination);
          gainNode.gain.setValueAtTime(0, this._audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.15, this._audioContext.currentTime + 0.01);
          gainNode.gain.linearRampToValueAtTime(0, this._audioContext.currentTime + noteDuration - 0.01);
        }

        const oscillatorNode = oscillatorNode ?? new OscillatorNode(this._audioContext);
        oscillatorNode.connect(gainNode);
        oscillatorNode.type = frequency.oscillatorType ?? 'sine';
        oscillatorNode.frequency.value = frequency.getPitch();

        return { oscillatorNode, noteDuration };
      });

      oscillators.forEach(({ oscillator }) => oscillator.start(this._audioContext.currentTime));

      setTimeout(() => {
        oscillators.forEach(({ oscillator }) => {
          oscillator.stop(0);
        });

        resolve();
      }, oscillators[0].noteDuration * 1000);
    });
  }

  /**
   * Play a Partition
   * @param {Partition} partition Partition to play
   * @param {GainNode?} gainNode (optional) If not provided, a default one will be used
   * @param {OscillatorNode?} oscillatorNode (optional) If not provided, a default one will be used
   */
  playPartition(partition, gainNode, oscillatorNode) {
    for(const key of partition.keys) {
      this.playKey(key);
    }
  }
}

export default MusicBox;

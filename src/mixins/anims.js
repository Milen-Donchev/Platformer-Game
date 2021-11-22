
export default {
  isPlayingAnimation(animKey) {
    return this.anims.isPlaying && this.anims.getCurrentKey() === animKey;
  }
}
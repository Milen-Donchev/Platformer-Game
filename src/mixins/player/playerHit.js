export default {
  bounceOff(source) {
    if (source.body) {
      this.body.touching.right
        ? this.setVelocityX(-this.hitVelocity)
        : this.setVelocityX(this.hitVelocity);
      } else {
      this.body.blocked.right
        ? this.setVelocityX(-this.hitVelocity)
        : this.setVelocityX(this.hitVelocity);
    }
    setTimeout(() => this.setVelocityY(-this.hitVelocity), 0);
  },

  takeHit(source) {
    if (this.hasBeenHit) return;
    this.hasBeenHit = true;
    this.takeDamage(source.damage);
    if (this.hp - source.damage >= 0) {
      this.bounceOff(source);
      this.playDamageTween();
    }
    if (source.handleHitTaken) {
      source.handleHitTaken(this);
    }
    this.scene.time.delayedCall(500, () => (this.hasBeenHit = false));
  },

  playDamageTween() {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 5,
      tint: 0xffffff,
    });
  },
};

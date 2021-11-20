export default {
  bounceOff() {
    this.body.touching.right
      ? this.setVelocityX(-this.hitVelocity)
      : this.setVelocityX(this.hitVelocity);
    setTimeout(() => this.setVelocityY(-this.hitVelocity), 0);
  },

  takeHit(enemy) {
    if (this.hasBeenHit) return;
    this.hasBeenHit = true;
    this.takeDamage(enemy.damage);
    this.bounceOff();
    this.playDamageTween();
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

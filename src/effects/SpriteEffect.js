import Phaser from "phaser";

class SpriteEffect extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, effectName, impactPosition) {
    super(scene, x, y);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.target = null;
    this.effectName = effectName;
    this.impactPosition = impactPosition;

    this.on(
      "animationcomplete",
      (anim) => {
        if (anim.key === this.effectName) {
          this.destroy();
        }
      },
      this
    );
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.drawEffect();
  }

  drawEffect() {
    if (!this.target || !this.body) return;
    const CENTER = this.target.getCenter();
    this.body.reset(CENTER.x, this.impactPosition.y);
  }

  playEffect(target) {
    this.target = target;
    this.play(this.effectName, true);
    this.drawEffect();
  }
}

export default SpriteEffect;

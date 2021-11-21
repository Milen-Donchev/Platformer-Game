import Phaser from "phaser";

class SpriteEffect extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, effectName) {
    super(scene, x, y);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.target = null;
    this.effectName = effectName;

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

  drawEffect() {
    if (!this.target || !this.body) return;
    const CENTER = this.target.getCenter();
    this.body.reset(CENTER.x, CENTER.y);
  }

  playEffect(target) {
    this.target = target;
    this.play(this.effectName, true);
    this.drawEffect();
  }
}

export default SpriteEffect;

import Phaser from "phaser";

class Projectile extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = 300;
    this.maxTravelDistance = 200;
    this.travelDistance = 0;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.travelDistance += this.body.deltaAbsX();
    this.travelDistance >= this.maxTravelDistance && this.destroy();
  }

  fire() {
    this.body.setVelocityX(this.speed);
  }
}

export default Projectile;

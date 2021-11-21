import Phaser from "phaser";

class Projectile extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = 300;
    this.maxTravelDistance = 400;
    this.travelDistance = 0;
    this.damage = 10;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.travelDistance += this.body.deltaAbsX();
    if (this.travelDistance >= this.maxTravelDistance) {
      this.removeProjectile();
    }
  }

  removeProjectile() {
    this.body.reset(0, 0);
    this.setVisible(false);
    this.setActive(false);
    this.travelDistance = 0;
  }

  fire(x, y) {
    this.setActive(true);
    this.setVisible(true);
    this.body.reset(x, y);
    this.body.setVelocityX(this.speed);
  }
}

export default Projectile;

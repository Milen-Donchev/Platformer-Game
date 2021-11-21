import Phaser from "phaser";

import Projectile from "./Projectile";

class Projectiles extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      visible: false,
      active: false,
      key: "iceball",
      classType: Projectile,
    });

    this.cooldown = 500;
    this.timeFromLastShot = null;
  }

  fireProjectile(initiator) {
    const projectile = this.getFirstDead(false);

    if (
      this.timeFromLastShot &&
      this.timeFromLastShot + this.cooldown >= new Date().getTime()
    )
      return;

    if (projectile) {
      const SPEED = Math.abs(projectile.speed);
      const PHASER_RIGHT = Phaser.Physics.Arcade.FACING_RIGHT;
      const FACING_RIGHT = initiator.lastDirection === PHASER_RIGHT;
      const { x, y } = initiator.getCenter();
      const CENTER_X = FACING_RIGHT ? x + 10 : x - 10;

      projectile.speed = FACING_RIGHT ? SPEED : -SPEED;
      projectile.setFlipX(!FACING_RIGHT);
      projectile.fire(CENTER_X, y);
      this.timeFromLastShot = new Date().getTime();
    }
  }
}

export default Projectiles;

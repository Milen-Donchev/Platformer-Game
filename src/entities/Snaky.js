import Enemy from "./Enemy";
import initAnims from "./anims/snakyAnims";

import Projectiles from '../attacks/Projectiles';

class Snaky extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "snaky");
    initAnims(scene.anims);

    this.damage = 10;
  }

  init() {
    super.init();
    this.speed = 50;
    this.hp = 80;
    this.setSize(20, 55);
    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    this.projectiles = new Projectiles(this.scene, 'fireball-1');
    this.timeFromLastAttack = 0;
    this.attackDelay = this.generateRandomAttackDelay();
  }

  generateRandomAttackDelay() {
    return Phaser.Math.Between(1000, 4000);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    const FACING_RIGHT = this.flipX;
    const OFFSET_X = FACING_RIGHT ? -1 : 10;
    this.lastDirection = FACING_RIGHT ?
    Phaser.Physics.Arcade.FACING_LEFT : 
    Phaser.Physics.Arcade.FACING_RIGHT
    this.setOffset(OFFSET_X, 10);
  }

  update(time, delta) {
    super.update(time, delta);

    if (this.timeFromLastAttack + this.attackDelay <= time) {
      this.projectiles.fireProjectile(this, "fireball");
      this.timeFromLastAttack = time;
      this.attackDelay = this.generateRandomAttackDelay();
    }

    if (this.active && !this.isPlayingAnimation("snaky-damaged")) {
      this.play("snaky-idle", true);
    }
  }

  takeHit(source) {
    super.takeHit(source);
    this.play("snaky-damaged", true);
  }
}

export default Snaky;

import Phaser from "phaser";

import collidable from "../mixins/collidable";
import animsMixin from "../mixins/anims";

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.config = scene.config;

    Object.assign(this, collidable);
    Object.assign(this, animsMixin);

    this.init();
    this.initEvents();
  }

  init() {
    this.gravity = 500;
    this.speed = 75;
    this.hp = 40;

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setOrigin(0.5, 1);
    this.setVelocityX(this.speed);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    if (this.getBounds().bottom > 600) {
      this.scene.events.removeListener(
        Phaser.Scenes.Events.UPDATE,
        this.update,
        this
      );
      this.setActive(false);
      return this.destroy();
    }
  }

  takeHit(source) {
    this.hp -= source.damage;
    source.handleHitTaken(this);
    if (this.hp <= 0) {
      this.setTint(0xff0000);
      this.setVelocity(0, -200);
      this.body.checkCollision.none = true;
      this.setCollideWorldBounds(false);
    }
  }

  patrol() {
    const LEFT = this.body.blocked.left;
    if (LEFT) {
      this.setFlipX(false);
      this.setVelocityX(this.speed);
    } else {
      this.setFlipX(true);
      this.setVelocityX(-this.speed);
    }
  }
}

export default Enemy;

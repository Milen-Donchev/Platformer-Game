import Phaser from "phaser";
import initAnimations from "./anims/playerAnims";

import collidable from "../mixins/collidable";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign(this, collidable);

    this.init();
    this.initEvents();
  }

  init() {
    this.gravity = 600;
    this.playerSpeed = 150;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.body.setSize(20, 36);
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);

    initAnimations(this.scene.anims);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    this.handlePlayerMovement();
    this.handlePlayerAnimations();
  }

  handlePlayerMovement() {
    const { left, right, space } = this.cursors;

    const UP = Phaser.Input.Keyboard.JustDown(space);
    const LEFT = left.isDown;
    const RIGHT = right.isDown;
    const ON_FLOOR = this.body.onFloor();
    const VELOCITY_X = RIGHT ? this.playerSpeed : -this.playerSpeed;
    const CAN_JUMP = ON_FLOOR || this.jumpCount <= this.consecutiveJumps;
    const JUMP_ALLOWED = CAN_JUMP && UP;
    const moveUp = () => {
      this.setVelocityY(-this.playerSpeed * 2);
      this.jumpCount++;
    };
    const moveHorizontal = () => this.setVelocityX(VELOCITY_X);

    if (ON_FLOOR) this.jumpCount = 0;
    if (!ON_FLOOR && this.jumpCount === 0) return;

    if ((LEFT && JUMP_ALLOWED) || (RIGHT && JUMP_ALLOWED)) {
      this.setFlipX(LEFT);
      moveUp();
      moveHorizontal();
    }

    if (LEFT) {
      this.setFlipX(LEFT);
      moveHorizontal();
    } else if (RIGHT) {
      this.setFlipX(LEFT);
      moveHorizontal();
    } else if (JUMP_ALLOWED) {
      moveUp();
    } else {
      this.setVelocityX(0);
    }
  }

  handlePlayerAnimations() {
    this.body.velocity.y !== 0
      ? this.play("jump", true)
      : this.body.velocity.x === 0
      ? this.play("idle", true)
      : this.play("run", true);
  }
}

export default Player;

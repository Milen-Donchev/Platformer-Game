export default {
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
    const moveHorizontal = () => {
      this.setVelocityX(VELOCITY_X);
      this.lastDirection =
        Phaser.Physics.Arcade[RIGHT ? "FACING_RIGHT" : "FACING_LEFT"];
    };

    if (ON_FLOOR) this.jumpCount = 0;
    if (!ON_FLOOR && this.jumpCount === 0 && UP) return;

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
  },

  handlePlayerAnimations() {
    if (this.isPlayingAnimation("shoot-projectile")) return;
    this.body.velocity.y !== 0
      ? this.play("jump", true)
      : this.body.velocity.x === 0
      ? this.play("idle", true)
      : this.play("run", true);
  },
};

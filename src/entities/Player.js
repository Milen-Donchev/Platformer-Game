import Phaser from "phaser";

import initAnimations from "./anims/playerAnims";
import collidable from "../mixins/collidable";
import playerHit from "../mixins/player/playerHit";
import playerMove from "../mixins/player/playerMove";
import playerHealth from "../mixins/player/playerHealth";
import playerAttacks from "../mixins/player/playerAttacks";
import Projectiles from "../attacks/Projectiles";
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign(this, collidable);
    Object.assign(this, playerMove);
    Object.assign(this, playerHit);
    Object.assign(this, playerHealth);
    Object.assign(this, playerAttacks);

    this.init();
    this.initEvents();
  }

  init() {
    this.config = this.scene.config;
    this.gravity = 600;
    this.playerSpeed = 150;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;
    this.hasBeenHit = false;
    this.hitVelocity = 250;
    this.hp = 100;
    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    this.projectiles = new Projectiles(this.scene);
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.body.setSize(20, 36);
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);

    this.createHpBar();
    this.fireProjectile();
    initAnimations(this.scene.anims);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    if (this.hasBeenHit) return;
    this.handlePlayerMovement();
    this.handlePlayerAnimations();
  }
}

export default Player;

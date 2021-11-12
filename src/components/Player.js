import Phaser from 'phaser';

import {createPlayerAnimations} from '../animations/player';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y){
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.gravity = 500;
    this.cursors = null;

    this.init();
    this.update();
  }

  init() {
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    createPlayerAnimations(this.scene.anims);
  }

  update() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.handleSceneUpdate, this);
  }

  handleSceneUpdate() {
    this.handlePlayerMovement();
    this.handlePlayerAnimations();
  }


  handlePlayerMovement() {
    const {left, right, up, space} = this.cursors;
    
    const UP = up.isDown || space.isDown;
    const LEFT = left.isDown;
    const RIGHT = right.isDown;
    const PLAYER_SPEED = 300;
    const ON_FLOOR = this.body.onFloor();
    const velocityX = RIGHT ? PLAYER_SPEED : -PLAYER_SPEED;
    const moveUp = () => this.setVelocityY(-PLAYER_SPEED);
    const moveHorizontal = () => this.setVelocityX(velocityX);
    
    if (UP && !ON_FLOOR) return;

     if (LEFT) {
      this.setFlipX(true);
      moveHorizontal();
    } 
    else if (RIGHT) {
      this.setFlipX(false);
      moveHorizontal();
    } 
    else if (UP) {
      moveUp();
    }
    else {
      this.setVelocityX(0);
    }
  };

  handlePlayerAnimations() {
    this.body.velocity.y !== 0 ?
    this.play('jump', true) :
    this.body.velocity.x === 0 ?
    this.play('idle', true) : 
    this.play('run', true);
  };
};

export default Player;
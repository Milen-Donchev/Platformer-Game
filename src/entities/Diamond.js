import Phaser from 'phaser';


class Diamond extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'diamond');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.pickupValue = Phaser.Math.Between(1, 4);

    this.moveDiamond();
    this.setSize(this.width - 2.5, this.height - 2.5);
  }

  pickup(player) {
    player.score += this.pickupValue;
    this.destroy();
  }

  moveDiamond() {
    this.play('diamond-spin', true);
    this.scene.tweens.add({
      targets: this,
      y: this.y - Phaser.Math.Between(-4, -15),
      ease: 'linear',
      duration: Phaser.Math.Between(1000, 2000),
      repeat: -1,
      yoyo: true
    })
  }
};

export default Diamond;
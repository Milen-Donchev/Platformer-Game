import Phaser from 'phaser';


class HUD extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    scene.add.existing(this);

    const { topRightCorner } = scene.config;
    this.setPosition(topRightCorner.x - 75, topRightCorner.y + 10);
    this.setScrollFactor(0);

    this.setupItems();
  }

  setupItems() {
    const scoreBoard = this.createScoreBoard();
    scoreBoard.setName('scoreBoard');
    this.add(scoreBoard);
  }

  createScoreBoard() {
    const scoreCounter = this.scene.add.text(0, 0, '0', {fontSize: '20px', fill: '#fff'});
    const diamondImage = this.scene.add.image(scoreCounter.width + 10, 0, 'diamond').setOrigin(0).setScale(1.3);

    const scoreBoard = this.scene.add.container(0, 0, [scoreCounter, diamondImage]);
    scoreBoard.setName('scoreBoard');
    return scoreBoard;
  }

  updateScoreBoard(score) {
    const [scoreCounter, diamondImage] = this.getByName('scoreBoard').list;
      scoreCounter.setText(String(score));
      if (score > 10) {
        diamondImage.setX(scoreCounter.width + 10);
      }
  }
};

export default HUD;
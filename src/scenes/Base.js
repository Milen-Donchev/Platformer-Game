import Phaser from "phaser";

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
  }

  create() {
    this.createBackground();
  }

  createBackground() {
    this.add
      .image(0, 0, "menu-bg")
      .setOrigin(0)
      .setDisplaySize(this.config.width, this.config.height);
  }
}

export default BaseScene;

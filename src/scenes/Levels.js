import Phaser from "phaser";

class LevelsScene extends Phaser.Scene {
  constructor(config) {
    super("LevelsScene");
    this.config = config;
  }

  create() {
    this.createBackground();
    this.createLevels();
  }

  createBackground() {
    this.add
      .image(0, 0, "menu-bg")
      .setOrigin(0)
      .setDisplaySize(this.config.width, this.config.height);
  }

  createLevels() {
    const levels = JSON.parse(localStorage.getItem("levels"));
    const { width, height } = this.config;
    const fontStyles = { fontSize: "40px" };
    let bottomMargin = levels.length === 1 ? 0 : -50;

    levels.forEach((level) => {
      const levelText = this.add
        .text(width / 2, height / 2 + bottomMargin, level.text, fontStyles)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .setColor("#fff");
      bottomMargin += 50;
      levelText.on("pointerover", () => {
        levelText.setColor("#000");
      });
      levelText.on("pointerout", () => {
        levelText.setColor("#fff");
      });
      levelText.on("pointerup", () => {
        this.startLevel(level.key);
      });
    });
  }

  startLevel(level) {
    level === 1 ? null : this.registry.set("level", level);
    this.scene.start("PlayScene");
  }
}

export default LevelsScene;

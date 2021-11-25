import Base from "./Base";

import backButtonMixin from "../mixins/backButton";

class Levels extends Base {
  constructor(config) {
    super("LevelsScene", config);
    this.config = config;

    Object.assign(this, backButtonMixin);
  }

  create() {
    super.create();
    this.createLevels();
    this.createBackButton();
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
    this.registry.set("level", level);
    this.scene.start("PlayScene");
  }
}

export default Levels;

export default {
  createBackButton() {
    const { height, width } = this.config;
    const X = width - 15;
    const Y = height - 15;
    const backButton = this.add
      .image(X, Y, "back")
      .setOrigin(1)
      .setScale(2)
      .setScrollFactor(0)
      .setDepth(24)
      .setInteractive({ useHandCursor: true });
    backButton.on("pointerdown", () => {
      this.scene.start("Menu");
    });
  },
};

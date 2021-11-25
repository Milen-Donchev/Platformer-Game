import Base from "./Base";
class Menu extends Base {
  constructor(config) {
    super("Menu", config);
    this.config = config;
  }

  create() {
    super.create();
    this.createMenuOptions();
  }

  createMenuOptions() {
    const textStyles = { fontSize: "40px" };
    const texts = ["Play", "Levels", "Exit"];
    let bottomMargin = -50;
    texts.forEach((text) => {
      const menuOption = this.add
        .text(
          this.config.width / 2,
          this.config.height / 2 + bottomMargin,
          text,
          textStyles
        )
        .setColor("#921b1b")
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5);
      bottomMargin += 50;
      menuOption.on("pointerover", () => {
        menuOption.setColor("#FFF080");
        menuOption;
      });
      menuOption.on("pointerout", () => {
        menuOption.setColor("#921b1b");
      });
      menuOption.on("pointerup", () => {
        this.redirectToScene(text);
      });
    });
  }

  redirectToScene(sceneName) {
    sceneName === "Exit"
      ? this.game.destroy(true)
      : this.scene.start(sceneName + "Scene");
  }
}

export default Menu;

import Base from "./Base";

import backButtonMixin from "../mixins/backButton";

class Credits extends Base {
  constructor(config) {
    super("CreditsScene", config);
    this.config = config;

    Object.assign(this, backButtonMixin);
  }

  create() {
    super.create();
    this.createBackButton();
    this.createCredits();
  }

  createCredits() {
    this.add
      .text(
        this.config.width / 2,
        this.config.height / 2 - 25,
        "Thank you for playing!",
        { fontSize: "40px" }
      )
      .setColor("#000")
      .setOrigin(0.5);
    this.add
      .text(
        this.config.width / 2,
        this.config.height / 2 + 25,
        "Author: Milen Donchev",
        { fontSize: "40px" }
      )
      .setColor("#000")
      .setOrigin(0.5);
  }
}

export default Credits;

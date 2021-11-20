import Phaser from "phaser";

class HealthBar {
  constructor(scene, x, y, totalHealth) {
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.x = x;
    this.y = y;
    this.hp = totalHealth;
    this.maxHP = 100;
    this.size = { width: 100, height: 15 };
    this.pixelPerHealth = this.size.width / this.maxHP;
    this.margin = 2;

    scene.add.existing(this.bar);
    this.draw();
  }

  draw() {
    const { x, y, size, hp, pixelPerHealth, margin } = this;
    const MARGIN = hp === 100 ? margin : 0;
    const HP_WIDTH = Math.floor(hp * pixelPerHealth) - MARGIN;
    const HP_COLOR =
      hp > 60
        ? 0x71ff33 /* GREEN */
        : hp > 20
        ? 0xff8a33 /* ORANGE */
        : 0xff3633; /* RED */
    this.bar.clear();
    this.bar.setScrollFactor(0, 0);

    this.bar.fillStyle(0xffd733);
    this.bar.fillRect(x, y, size.width + margin, size.height + margin);

    this.drawInnerRect(0xffffff);
    this.drawInnerRect(HP_COLOR, HP_WIDTH, hp > 0);
  }

  drawInnerRect(color, customWidth, condition = true) {
    const { x, y, margin, size } = this;
    this.bar.fillStyle(color);
    if (condition) {
      this.bar.fillRect(
        x + margin,
        y + margin,
        customWidth ? customWidth : size.width - margin,
        size.height - margin
      );
    }
  }
}

export default HealthBar;

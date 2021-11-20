import HealthBar from "../../hud/HealthBar";

export default {
  createHpBar() {
    const healthBarX = this.config.topLeftCorner.x + 20;
    const healthBarY = this.config.topLeftCorner.y + 20;
    this.healthBar = new HealthBar(this.scene, healthBarX, healthBarY, this.hp);
  },

  takeDamage(dmg) {
    this.hp = this.hp - dmg < 0 ? 0 : (this.hp -= dmg);
    this.createHpBar();
  },
};

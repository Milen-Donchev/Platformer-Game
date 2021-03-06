import HealthBar from "../../hud/HealthBar";
import Emitter from "../../events/Emitter";

export default {
  createHpBar() {
    const healthBarX = this.config.topLeftCorner.x + 20;
    const healthBarY = this.config.topLeftCorner.y + 20;
    this.healthBar = new HealthBar(this.scene, healthBarX, healthBarY, this.hp);
  },

  takeDamage(dmg) {
    this.hp = this.hp - dmg < 0 ? 0 : this.hp - dmg;
    this.createHpBar();
    if (this.hp - dmg < 0) {
      setTimeout(() => {
        this.hp = 0;
        this.createHpBar();
        this.loseGame();
      }, 0);
    }
  },

  emitPlayerLose() {
    Emitter.emit("PLAYER_LOSE");
  },

  handleFallBeyondBounds() {
    if (this.getBounds().bottom > 600) {
      this.hp = 0;
      this.createHpBar();
      this.scene.time.addEvent({
        delay: 500,
        loop: false,
        callback: () => {
          this.emitPlayerLose();
        },
        repeat: false,
      });
    }
  },

  loseGame() {
    this.setCollideWorldBounds(false);
    this.setVelocity(0, -200);
    this.setTint(0xff0000);
    this.body.checkCollision.none = true;
    this.scene.input.keyboard.enabled = false;
    this.scene.time.addEvent({
      delay: 2000,
      loop: false,
      callback: () => {
        this.emitPlayerLose();
      },
      repeat: false,
    });
  },
};

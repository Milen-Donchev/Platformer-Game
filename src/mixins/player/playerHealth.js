import HealthBar from "../../hud/HealthBar";
import Emitter from "../../events/Emitter";

export default {
  createHpBar() {
    const healthBarX = this.config.topLeftCorner.x + 20;
    const healthBarY = this.config.topLeftCorner.y + 20;
    this.healthBar = new HealthBar(this.scene, healthBarX, healthBarY, this.hp);
  },

  takeDamage(dmg) {
    this.hp = this.hp - dmg < 0 ? 0 : (this.hp - dmg);
    this.createHpBar();
    if (this.hp - dmg < 0) {
      setTimeout(() => {
        this.setCollideWorldBounds(false);
        this.setVelocity(0, -200);
        this.setTint(0xff0000);
        this.body.checkCollision.none = true;
        this.scene.input.keyboard.enabled = false;
        this.scene.time.addEvent({
          delay: 2000,
          loop: false,
          callback: () => {
            Emitter.emit('PLAYER_LOSE')
          },
          repeat: false  
        });
      }, 0);
    }
  },
};

import Projectile from "../../attacks/Projectile";

export default {
  fireProjectile() {
    this.scene.input.keyboard.on("keydown-Q", () => {
      new Projectile(this.scene, this.x, this.y, "iceball").fire();
    });
  },
};

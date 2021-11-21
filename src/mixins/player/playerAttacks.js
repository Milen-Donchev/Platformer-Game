export default {
  fireProjectile() {
    this.scene.input.keyboard.on("keydown-Q", () => {
      this.play("shoot-projectile", true);
      this.projectiles.fireProjectile(this);
    });
  },
};

export default {
  fireProjectile() {
    this.scene.input.keyboard.on("keydown-Q", () => {
      this.play("shoot-projectile", true);
      this.projectiles.fireProjectile(this, "iceball");
    });
  },
  swordAttack() {
    this.scene.input.keyboard.on("keydown-E", () => {
      this.meleeWeapon.attack(this);
    });
  },
  initPlayerAttacks() {
    this.fireProjectile();
    this.swordAttack();
  },
};

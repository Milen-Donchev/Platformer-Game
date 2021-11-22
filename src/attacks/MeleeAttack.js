import Phaser from "phaser";
import EffectManager from "../effects/EffectManager";

class MeleeWeapon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, weaponName) {
    super(scene, x, y, weaponName);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.effectManager = new EffectManager(scene);
    this.weapon = weaponName;
    this.damage = 15;
    this.attackSpeed = 1000;
    this.lastAttack = null;
    this.wielder = null;
    this.setDepth(10);

    this.activateWeapon(false);

    this.on("animationcomplete", (anim) => {
      if (anim.key === "swing-sword") {
        this.activateWeapon(false);
        this.body.reset(0, 0);
        this.body.checkCollision.none = false;
      }
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (!this.active) return;

    if (this.wielder) {
      const RIGHT =
        this.wielder.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT;
      const CENTER = this.wielder.getCenter();
      const X = RIGHT ? CENTER.x + 15 : CENTER.x - 15;
      this.setFlipX(!RIGHT);
      this.body.reset(X, CENTER.y);
    }
  }

  attack(wielder) {
    if (
      this.lastAttack &&
      this.lastAttack + this.attackSpeed >= new Date().getTime()
    )
      return;
    wielder.play("shoot-projectile", true);
    this.lastAttack = new Date().getTime();
    this.wielder = wielder;
    this.activateWeapon(true);
    this.anims.play("swing-sword", true);
  }

  activateWeapon(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }

  handleHitTaken(target) {
    const impactPosition = { x: this.x, y: this.y };
    this.effectManager.playEffectOn("damage", target, impactPosition);
    this.body.checkCollision.none = true;
  }
}

export default MeleeWeapon;

import Enemy from "./Enemy";
import initAnims from "./anims/snakyAnims";

class Snaky extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "snaky");
    initAnims(scene.anims);

    this.damage = 10;
  }

  init() {
    super.init();
    this.speed = 50;
    this.hp = 80;
    this.setSize(20, 55);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    const FACING_RIGHT = this.flipX;
    const OFFSET_X = FACING_RIGHT ? -1 : 10;
    this.setOffset(OFFSET_X, 10);
  }

  update(time, delta) {
    super.update(time, delta);
    if (this.active && !this.isPlayingAnimation("snaky-damaged")) {
      this.play("snaky-idle", true);
    }
  }

  takeHit(source) {
    super.takeHit(source);
    this.play("snaky-damaged", true);
  }
}

export default Snaky;

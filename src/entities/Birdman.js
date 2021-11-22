import Enemy from "./Enemy";
import initAnims from "./anims/birdmanAnims";

class Birdman extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "birdman");
    initAnims(scene.anims);

    this.damage = 10;
  }

  init() {
    super.init();
    this.setSize(20, 45);
    this.setOffset(7, 20);
  }

  update(time, delta) {
    super.update(time, delta);
    if (this.active && !this.isPlayingAnimation("birdman-damaged")) {
      this.play("birdman-idle", true);
    }
  }

  takeHit(source) {
    super.takeHit(source);
    this.play("birdman-damaged", true);
  }
}

export default Birdman;

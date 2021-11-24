import Phaser from "phaser";
import { COLLECTIBLES_TYPES } from "../types";
import collidable from "../mixins/collidable";

class Collectibles extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    Object.assign(this, collidable);
  }

  getTypes() {
    return COLLECTIBLES_TYPES;
  }
}

export default Collectibles;

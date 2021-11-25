import Phaser from "phaser";

export default {
  addCollider(otherGameobject, callback) {
    this.scene.physics.add.collider(
      this,
      otherGameobject,
      callback,
      null,
      this
    );
    return this;
  },
  addOverlap(otherGameobject, callback) {
    this.scene.physics.add.overlap(this, otherGameobject, callback, null, this);
    return this;
  }
};

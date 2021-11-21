export default (anims) => {
  anims.create({
    key: "damage",
    frames: anims.generateFrameNumbers("damage-effect", { start: 0, end: 4 }),
    frameRate: 10,
    repeat: 0,
  });
};

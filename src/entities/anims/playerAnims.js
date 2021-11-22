export default (anims) => {
  anims.create({
    key: "idle",
    frames: anims.generateFrameNumbers("player", { start: 0, end: 8 }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: "run",
    frames: anims.generateFrameNumbers("player", { start: 11, end: 16 }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: "jump",
    frames: anims.generateFrameNumbers("player", { start: 17, end: 23 }),
    frameRate: 2,
    repeat: 1,
  });

  anims.create({
    key: "shoot-projectile",
    frames: anims.generateFrameNumbers("shoot-projectile", {
      start: 0,
      end: 7,
    }),
    frameRate: 14,
    repeat: 0,
  });

  anims.create({
    key: "swing-sword",
    frames: anims.generateFrameNumbers("sword-attack", {
      start: 0,
      end: 2,
    }),
    frameRate: 20,
    repeat: 0,
  });
};

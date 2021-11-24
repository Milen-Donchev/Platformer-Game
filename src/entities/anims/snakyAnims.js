export default (anims) => {
  anims.create({
    key: "snaky-idle",
    frames: anims.generateFrameNumbers("snaky", { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "snaky-damaged",
    frames: anims.generateFrameNumbers("snaky", { start: 21, end: 22 }),
    frameRate: 10,
    repeat: 0,
  });
  anims.create({
    key: "fireball",
    frames: [
      {key: "fireball-1"}, 
      {key: 'fireball-2'}, 
      {key: 'fireball-3'}
    ],
    frameRate: 5,
    repeat: -1,
  });
};

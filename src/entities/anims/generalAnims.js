export default (anims) => {
  anims.create({
    key: "damage",
    frames: anims.generateFrameNumbers("damage-effect", { start: 0, end: 4 }),
    frameRate: 10,
    repeat: 0,
  });
  anims.create({
    key: "diamond-spin",
    frames: [
      {key: 'diamond'},
      {key: 'diamond1'},
      {key: 'diamond2'},
      {key: 'diamond3'},
      {key: 'diamond4'},
      {key: 'diamond5'},
      {key: 'diamond6'},
      {key: 'diamond'},
    ],
    frameRate: 8,
    repeat: -1,
    repeatDelay: 500
  });
};


export const createAnimation = (
  anims, 
  key, 
  name, 
  frames, 
  frameRate = 5, 
  repeat = -1
) => {
  anims.create({
    key,
    frames: anims.generateFrameNumbers(name, frames),
    frameRate,
    repeat
  });
};
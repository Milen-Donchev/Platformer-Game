
import { createAnimation } from "../utils/animations";

const PLAYER_ANIMATIONS = [
  {
    key: 'run', 
    frames: {start: 11, end: 16}, 
    frameRate: 7, 
    repeat: -1
  },
  {
    key: 'idle', 
    frames: {start: 0, end: 8}, 
    frameRate: 9, 
    repeat: -1
  },
  {
    key: 'jump', 
    frames: {start: 18, end: 24}, 
    frameRate: 1, 
    repeat: -1
  },
];
 
export const createPlayerAnimations = (anims) => {
  PLAYER_ANIMATIONS.forEach(({key, frames, frameRate, repeat}) => {
    createAnimation(anims, key, 'player', frames, frameRate, repeat);
  });
};
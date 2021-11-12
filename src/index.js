import Phaser from "phaser";

import { CANVAS } from "./constants/canvas";

import PreloadScene from "./scenes/PreloadScene";
import PlayScene from "./scenes/PlayScene";

const scene = [PreloadScene, PlayScene];

new Phaser.Game({
  ...CANVAS,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade'
  },
  scene
});
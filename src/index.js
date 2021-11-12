import Phaser from "phaser";

import { CANVAS } from "./constants/canvas";

import PreloadScene from "./scenes/PreloadScene";
import PlayScene from "./scenes/PlayScene";

const scene = [PreloadScene, PlayScene];

new Phaser.Game({
  ...CANVAS,
  type: Phaser.AUTO,
  pixelArt: true,
  zoom: 1.2,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true
    }
  },
  scene
});
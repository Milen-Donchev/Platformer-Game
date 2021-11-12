import Phaser from 'phaser';

import { CANVAS } from '../constants/canvas';

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.canvas = CANVAS;
  }
};

export default BaseScene;
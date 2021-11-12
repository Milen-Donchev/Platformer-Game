import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON({key: 'map', url: 'assets/milenski_map.json'});
    this.load.image('tiles-1', 'assets/main_lev_build_1.png');
    this.load.image('tiles-2', 'assets/main_lev_build_2.png');
  }

  create() {
    this.scene.start('PlayScene');
  }
};

export default PreloadScene;
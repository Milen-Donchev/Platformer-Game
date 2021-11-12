import BaseScene from "./BaseScene";

class PlayScene extends BaseScene {
  constructor(){
    super('PlayScene');
    this.map = null;
    this.tileset1 = null;
    this.tileset2 = null;
  }

  create() {
    this.createMap();
    this.createTilesets();
    this.createLayers();
  }

  createMap() {
    this.map = this.make.tilemap({key: 'map'});
  }

  createTilesets() {
    const createTileset = (...params) => this.map.addTilesetImage(...params);
    this.tileset1 = createTileset('main_lev_build_1', 'tiles-1');
    this.tileset2 = createTileset('main_lev_build_2', 'tiles-2');
  }

  createLayers() {
    const createLayer = (...params) => this.map.createLayer(...params);
    createLayer('cosmetics', this.tileset1);
    createLayer('platforms', [this.tileset1, this.tileset2]);
  }
};

export default PlayScene;
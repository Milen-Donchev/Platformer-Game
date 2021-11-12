import BaseScene from "./BaseScene";

import Player from "../components/Player";

class PlayScene extends BaseScene {
  constructor(){
    super('PlayScene');
    this.map = null;
    this.tileset1 = null;
    this.tileset2 = null;
    this.layers = null;
    this.player = null;
    this.cursors = null;
  }

  create() {
    this.createMap();
    this.createTilesets();
    this.createLayers();
    this.createPlayer();
    this.createColliders();
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
    // ORDER IS CRUCIAL.
    const collidable = createLayer('collidable', this.tileset1);
    const cosmetics = createLayer('cosmetics', this.tileset1);
    const platforms = createLayer('platforms', [this.tileset1, this.tileset2]);
    collidable.setCollision([1674, 1675, 1738, 1739]);
    this.layers = {platforms, cosmetics, collidable};
  }

  createPlayer() {
    this.player = new Player(this, 100, 200);
  }

  createColliders() {
    this.physics.add.collider(this.player, this.layers.collidable);
  }
};

export default PlayScene;
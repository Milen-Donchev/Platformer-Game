import Phaser from "phaser";
import Player from "../entities/Player";
import Enemies from "../groups/Enemies";

class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;

    this.map = null;
    this.layers = null;
    this.playerZones = null;
    this.player = null;
    this.enemies = null;
  }

  create() {
    this.createMap();
    this.createLayers();
    this.getPlayerZones();
    this.createPlayer();
    this.createEnemies();
    this.createEnemyColliders();
    this.createPlayerColliders();
    this.setupFollowupCameraOn();
  }

  createMap() {
    const map = this.make.tilemap({ key: "map" });
    map.addTilesetImage("main_lev_build_1", "tiles-1");
    map.addTilesetImage("main_lev_build_2", "tiles-2");
    this.map = map;
  }

  createLayers() {
    const tileset = this.map.getTileset("main_lev_build_1");
    const tileset2 = this.map.getTileset("main_lev_build_2");
    const collidable = this.map.createStaticLayer("collidable", tileset);
    const environment = this.map.createStaticLayer("cosmetics", tileset);
    const platforms = this.map.createStaticLayer("platforms", [
      tileset,
      tileset2,
    ]);
    const playerZones = this.map.getObjectLayer("player_zones");
    const enemySpawns = this.map.getObjectLayer("enemy_zones");

    collidable.setCollisionBetween(1674, 1675);

    this.layers = {
      environment,
      platforms,
      collidable,
      playerZones,
      enemySpawns,
    };
  }

  getPlayerZones() {
    const playerZones = this.layers.playerZones.objects;
    this.playerZones = {
      start: playerZones.find((zone) => zone.name === "spawnZone"),
      end: playerZones.find((zone) => zone.name === "endZone"),
    };
  }

  createPlayer() {
    const { start } = this.playerZones;
    this.player = new Player(this, start.x, start.y);
  }

  createEnemies() {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();
    const enemySpawns = this.layers.enemySpawns.objects;

    enemySpawns.forEach(({ type, x, y }) => {
      const enemy = new enemyTypes[type](this, x, y);
      enemy.setPlatformColliders(this.layers.collidable);
      enemies.add(enemy);
    });

    this.enemies = enemies;
  }

  createEnemyColliders() {
    this.enemies
      .addCollider(this.layers.collidable)
      .addCollider(this.player, this.handlePlayerTakesHit);
  }

  handlePlayerTakesHit(enemy, player) {
    player.takeHit(enemy);
  }

  createPlayerColliders() {
    this.player.addCollider(this.layers.collidable);
  }

  setupFollowupCameraOn() {
    const { height, width, mapOffset, zoomFactor } = this.config;
    const mapWidth = width + mapOffset;
    this.physics.world.setBounds(0, 0, mapWidth, height + 200);
    this.cameras.main.setBounds(0, 0, mapWidth, height).setZoom(zoomFactor);
    this.cameras.main.startFollow(this.player);
  }
}

export default Play;

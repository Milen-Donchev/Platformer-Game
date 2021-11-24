import Phaser from "phaser";
import Player from "../entities/Player";
import Enemies from "../groups/Enemies";
import Collectibles from "../groups/Collectibles";
import HUD from '../hud';

import Emitter from "../events/Emitter";

import initGeneralAnims from "../entities/anims/generalAnims";

class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;

    this.map = null;
    this.layers = null;
    this.playerZones = null;
    this.collectibles = null;
    this.player = null;
    this.enemies = null;
    this.score = 0;
    this.hud = null;
  }

  create({gameStatus}) {
    initGeneralAnims(this.anims);
    if (gameStatus !== 'PLAYER_LOSE'){
      this.createGameEvents();
    }
    this.createMap();
    this.createLayers();
    this.getPlayerZones();
    this.createCollectibles();
    this.createPlayer();
    this.createEnemies();
    this.createEnemyColliders();
    this.createPlayerColliders();
    this.setupFollowupCameraOn();
    this.hud = new HUD(this, 0, 0);
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
    const traps = this.map.createStaticLayer("traps", tileset);
    const platforms = this.map.createStaticLayer("platforms", [
      tileset,
      tileset2,
    ]);
    const playerZones = this.map.getObjectLayer("player_zones");
    const enemySpawns = this.map.getObjectLayer("enemy_zones");
    const collectibles = this.map.getObjectLayer("collectibles");

    collidable.setCollisionBetween(1674, 1675);
    traps.setCollisionBetween(3537, 3538);

    this.layers = {
      environment,
      platforms,
      traps,
      collidable,
      playerZones,
      enemySpawns,
      collectibles
    };
  }

  createGameEvents() {
    Emitter.on('PLAYER_LOSE', () => {
      this.scene.restart({gameStatus: 'PLAYER_LOSE'});
      this.input.keyboard.enabled = true;
    })
  }

  getPlayerZones() {
    const playerZones = this.layers.playerZones.objects;
    this.playerZones = {
      start: playerZones.find((zone) => zone.name === "spawnZone"),
      end: playerZones.find((zone) => zone.name === "endZone"),
    };
  }

  createCollectibles() {
    const collectibles = new Collectibles(this);
    const colTypes = collectibles.getTypes();
    this.layers.collectibles.objects.forEach(coll => {
      const collectible = new colTypes[coll.type](this, coll.x, coll.y);
      collectibles.add(collectible);
    });
    this.collectibles = collectibles;
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
      .addCollider(this.player, this.handlePlayerTakesHit)
      .addCollider(this.player.projectiles, this.handleEnemyTakesHit)
      .addOverlap(this.player.meleeWeapon, this.handleEnemyTakesHit);
  }

  handleEnemyTakesHit(entity, source) {
    if (!source.damage) {
      source.damage = 20;
    }
    entity.takeHit(source);
  }

  handlePlayerTakesHit(enemy, player) {
    player.takeHit(enemy);
  }

  handleDiamondPickup(player, diamond, hud) {
    this.score += diamond.pickupValue;
    hud.updateScoreBoard(this.score);
    diamond.pickup(player);
  }

  createPlayerColliders() {
    this.player.addCollider(this.layers.collidable);
    this.player.addCollider(this.enemies.getProjectiles(), this.handleEnemyTakesHit);
    this.player.addCollider(this.layers.traps, this.handleEnemyTakesHit);
    this.player.addOverlap(this.collectibles, (player, diamond) => this.handleDiamondPickup(player, diamond, this.hud));
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

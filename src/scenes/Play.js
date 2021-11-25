import Phaser from "phaser";
import Player from "../entities/Player";
import Enemies from "../groups/Enemies";
import Collectibles from "../groups/Collectibles";
import HUD from "../hud";

import Emitter from "../events/Emitter";

import initGeneralAnims from "../entities/anims/generalAnims";

const TOTAL_GEMS_BY_LEVEL = {
  level1: 34,
  level2: 30,
};

class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;

    this.currentLevel = null;
    this.map = null;
    this.layers = null;
    this.playerZones = null;
    this.collectibles = null;
    this.player = null;
    this.enemies = null;
    this.score = 0;
    this.hud = null;
    this.spikedBg = null;
    this.sky = null;
  }

  create({ gameStatus }) {
    initGeneralAnims(this.anims);
    if (gameStatus !== "PLAYER_LOSE") {
      this.createGameEvents();
    }
    this.createMap();
    this.createBackButton();
    this.createLayers();
    this.getPlayerZones();
    this.createBG();
    this.createCollectibles();
    this.createPlayer();
    this.createEnemies();
    this.createEnemyColliders();
    this.createPlayerColliders();
    this.setupFollowupCameraOn();
    this.hud = new HUD(this, 0, 0);
    this.hud.setupItems(TOTAL_GEMS_BY_LEVEL["level" + this.currentLevel]);
  }

  createMap() {
    const map = this.make.tilemap({ key: `level-${this.getCurrentLevel()}` });
    map.addTilesetImage("main_lev_build_1", "tiles-1");
    map.addTilesetImage("main_lev_build_2", "tiles-2");
    this.map = map;
    this.currentLevel = this.getCurrentLevel();
  }

  createBackButton() {
    const { topRightCorner, height } = this.config;
    const X = topRightCorner.x - 10;
    const Y = height - topRightCorner.y - 10;
    const backButton = this.add
      .image(X, Y, "back")
      .setOrigin(1)
      .setScrollFactor(0)
      .setDepth(24)
      .setInteractive({ useHandCursor: true });
    backButton.on("pointerdown", () => {
      this.scene.start("Menu");
    });
  }

  createLayers() {
    const tileset = this.map.getTileset("main_lev_build_1");
    const tileset2 = this.map.getTileset("main_lev_build_2");
    const collidable = this.map.createStaticLayer("collidable", tileset);
    const environment = this.map.createStaticLayer("cosmetics", tileset);
    const traps = this.map.createStaticLayer("traps", tileset);
    const enemyBounds = this.map
      .createStaticLayer("enemy_bounds", tileset)
      .setAlpha(0);
    const platforms = this.map.createStaticLayer("platforms", [
      tileset,
      tileset2,
    ]);
    const playerZones = this.map.getObjectLayer("player_zones");
    const enemySpawns = this.map.getObjectLayer("enemy_zones");
    const collectibles = this.map.getObjectLayer("collectibles");

    const level2 = this.currentLevel !== 1;
    if (level2) {
      enemyBounds.setCollisionBetween(4555, 4619);
      collidable.setCollisionBetween(1674, 1675);
      traps.setCollisionBetween(3537, 3538);
    } else {
      enemyBounds.setCollisionBetween(327, 391);
      collidable.setCollisionBetween(1670, 1671);
      traps.setCollisionBetween(3537, 3538);
    }

    this.layers = {
      environment,
      platforms,
      enemyBounds,
      traps,
      collidable,
      playerZones,
      enemySpawns,
      collectibles,
    };
  }

  createGameEvents() {
    Emitter.on("PLAYER_LOSE", () => {
      this.scene.restart({ gameStatus: "PLAYER_LOSE" });
      this.score = 0;
      this.input.keyboard.enabled = true;
    });
  }

  getPlayerZones() {
    const playerZones = this.layers.playerZones.objects;
    this.playerZones = {
      start: playerZones.find((zone) => zone.name === "spawnZone"),
      end: playerZones.find((zone) => zone.name === "endZone"),
    };
  }

  createBG() {
    const spikedBg = this.map.getObjectLayer("spiked_bg").objects[0];
    this.spikedBg = this.add
      .tileSprite(
        spikedBg.x,
        spikedBg.y,
        this.config.width,
        spikedBg.height,
        "bg-spikes-dark"
      )
      .setOrigin(0, 1)
      .setScrollFactor(0, 1)
      .setDepth(-20);
    this.sky = this.add
      .tileSprite(0, 0, this.config.width, 200, "sky2")
      .setOrigin(0, 0)
      .setScrollFactor(0, 1)
      .setDepth(-21);
  }

  createCollectibles() {
    const collectibles = new Collectibles(this);
    const colTypes = collectibles.getTypes();
    this.layers.collectibles.objects.forEach((coll) => {
      const collectible = new colTypes[coll.type](this, coll.x, coll.y);
      collectible.setScale(1 + coll.properties.pickupValue / 10);
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
      enemies.add(enemy);
    });

    this.enemies = enemies;
  }

  createEnemyColliders() {
    this.enemies
      .addCollider(this.layers.collidable)
      .addCollider(this.player, this.handlePlayerTakesHit)
      .addCollider(this.player.projectiles, this.handleEnemyTakesHit)
      .addOverlap(this.player.meleeWeapon, this.handleEnemyTakesHit)
      .addCollider(this.layers.enemyBounds, this.handleEnemyHitBounds);
  }

  handleEnemyHitBounds(enemy) {
    enemy.patrol();
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

  handleDiamondPickup(_, diamond, hud) {
    this.score++;
    hud.updateScoreBoard(
      this.score,
      TOTAL_GEMS_BY_LEVEL["level" + this.currentLevel]
    );
    diamond.pickup();
  }

  createPlayerColliders() {
    this.player.addCollider(this.layers.collidable);
    this.player.addCollider(
      this.enemies.getProjectiles(),
      this.handleEnemyTakesHit
    );
    this.player.addCollider(this.layers.traps, this.handleEnemyTakesHit);
    this.player.addOverlap(this.collectibles, (player, diamond) =>
      this.handleDiamondPickup(player, diamond, this.hud)
    );
  }

  setupFollowupCameraOn() {
    const { height, width, mapOffset, zoomFactor } = this.config;
    const mapWidth = width + mapOffset;
    this.physics.world.setBounds(0, 0, mapWidth, height + 200);
    this.cameras.main.setBounds(0, 0, mapWidth, height).setZoom(zoomFactor);
    this.cameras.main.startFollow(this.player);
  }

  getCurrentLevel() {
    return this.registry.get("level") || 1;
  }

  update() {
    this.spikedBg.tilePositionX = this.cameras.main.scrollX * 0.3;
    this.sky.tilePositionX = this.cameras.main.scrollX * 0.1;

    const gemsToNextLevel = TOTAL_GEMS_BY_LEVEL["level" + this.currentLevel];

    if (this.score >= gemsToNextLevel) {
      this.time.addEvent({
        delay: 500,
        callback: () => {
          this.registry.set(
            "level",
            2 /* hardcoded as we only have 2 levels */
          );
          this.score = 0;
          this.scene.restart();
        },
        loop: false,
        repeat: false,
      });
    }
  }
}

export default Play;

import Phaser from "phaser";

import PlayScene from "./scenes/Play";
import PreloadScene from "./scenes/Preload";
import MenuScene from "./scenes/Menu";
import LevelsScene from "./scenes/Levels";
import CreditsScene from "./scenes/Credits";

const MAP_WIDTH = 1600;
const WIDTH = document.body.offsetWidth;
const HEIGHT = 600;
const ZOOM_FACTOR = 1.2;

const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  topLeftCorner: {
    x: (WIDTH - WIDTH / ZOOM_FACTOR) / 2,
    y: (HEIGHT - HEIGHT / ZOOM_FACTOR) / 2,
  },
  topRightCorner: {
    x: WIDTH / ZOOM_FACTOR + (WIDTH - WIDTH / ZOOM_FACTOR) / 2,
    y: (HEIGHT - HEIGHT / ZOOM_FACTOR) / 2,
  },
  zoomFactor: ZOOM_FACTOR,
  debug: false,
  backgroundColor: "#190d1a",
};

const Scenes = [PreloadScene, MenuScene, LevelsScene, PlayScene, CreditsScene];
const createScene = (Scene) => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: SHARED_CONFIG.debug,
    },
  },
  scene: initScenes(),
};

new Phaser.Game(config);

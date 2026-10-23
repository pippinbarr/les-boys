const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const START_SCENE = urlParams.get('scene') || "title";
const PRELOADER_DELAY = urlParams.get('preloaderdelay') || 1000;
const DEBUG = urlParams.get('debug') || false;

const HEIGHT = 720 * 2;
const WIDTH = 405 * 2;
const LANG = "en";

let config = {
  type: Phaser.AUTO,
  parent: "game",

  width: WIDTH,
  height: HEIGHT,

  backgroundColor: "#000000",
  scene: [
    Boot,
    Preloader,
    Title,

    Finder,
    Dodger,
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: DEBUG
    }
  },

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game",
    width: WIDTH,
    height: HEIGHT,
  },
};

let game = new Phaser.Game(config);
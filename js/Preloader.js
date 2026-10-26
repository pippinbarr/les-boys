const characterPaths = [
  "assets/images/characters/snowboarder.png", "assets/images/characters/baba.png", "assets/images/characters/bbmate.png", "assets/images/characters/chac.png", "assets/images/characters/chomper.png", "assets/images/characters/coco.png", "assets/images/characters/dada.png", "assets/images/characters/darth-vaderish-guy.png", "assets/images/characters/dradre.png", "assets/images/characters/egeg.png", "assets/images/characters/fifi.png", "assets/images/characters/goodhair.png", "assets/images/characters/haha.png", "assets/images/characters/hoho.png", "assets/images/characters/joker.png", "assets/images/characters/laseraxeguy.png", "assets/images/characters/lele.png", "assets/images/characters/lora.png", "assets/images/characters/minifig.png", "assets/images/characters/nosenose.png", "assets/images/characters/odia.png", "assets/images/characters/one-leg-snow-shoe.png", "assets/images/characters/oneleg-skier.png", "assets/images/characters/pipi.png", "assets/images/characters/popo.png", "assets/images/characters/ripped-cucumber.png", "assets/images/characters/roro.png", "assets/images/characters/tata.png", "assets/images/characters/tv-dinnerman.png", "assets/images/characters/webhands.png", "assets/images/characters/wing-thing.png", "assets/images/characters/xwingpilot.png", "assets/images/characters/yodaish.png"
];
const characters = [];

// Create objects representing filenames and asset names
for (let p of characterPaths) {
  const c = {
    name: "",
    path: p
  };
  const splitPath = p.split("/");
  const splitFile = splitPath[splitPath.length - 1].split(".");
  c.name = splitFile[0];
  characters.push(c);
}


class Preloader extends Phaser.Scene {

  constructor(config) {
    super({
      key: `preloader`
    });


  }

  preload() {
    this.load.image(`particle`, `assets/images/particle.png`);
    this.load.image(`clown`, `assets/images/clown.png`);

    for (let c of characters) {
      this.load.image(c.name, c.path);
    }
  }

  create() {
    const clown = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "clown");
    clown.setRotation(Math.PI);

    this.add.tween({
      targets: clown,
      rotation: 0,
      duration: PRELOADER_DELAY,
    })
    setTimeout(() => {
      this.scene.start(START_SCENE);
    }, PRELOADER_DELAY);
  }
}

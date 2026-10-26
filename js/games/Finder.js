class Finder extends Phaser.Scene {

  constructor(config) {
    super({
      key: "finder"
    });
  }

  create() {
    this.width = this.game.canvas.width;
    this.height = this.game.canvas.height;

    this.cameras.main.setBackgroundColor("#000000");

    this.addLesBoys(20);

    this.cameras.main.once('camerafadeincomplete', function (camera) {
      this.inputEnabled = true;
    });
  }

  addLesBoys(num) {
    // Random characters

    const toPlace = [...characters];
    toPlace.sort((a, b) => 0.5 - Math.random());

    this.findMeTop = undefined;
    this.findMeBottom = undefined;

    for (let i = 0; i < toPlace.length; i++) {

      const c = toPlace.pop();
      const s = this.add.image(Math.random() * WIDTH, Math.random() * HEIGHT, c.name);
      s.setScale(0.25 + Math.random() * 0.25);

      if (!this.findMeTop) {
        this.findMeTop = this.createFindee(c.name, s, this.height * 0.1, 180);
      }
      else if (!this.findMeBottom) {
        this.findMeBottom = this.createFindee(c.name, s, this.height * 0.9, 0);
      }

    }

    this.findMeTop.setDepth(10000);
    this.findMeTop.text.setDepth(10000);
    this.findMeBottom.setDepth(10000);
    this.findMeBottom.text.setDepth(10000);




    this.input.once('pointerup', () => {
      if (!this.inputEnabled) return;

      this.inputEnabled = false;
    });

  }

  createFindee(name, findee, y, rotation) {
    findee.name = name;
    findee.setInteractive(new Phaser.Geom.Rectangle(0, 0, findee.width, findee.height), Phaser.Geom.Rectangle.Contains);

    const findeeText = this.add.text(WIDTH / 2, y, `Find ${findee.name}`, {
      font: "bold 64px sans-serif",
      color: "#ff6677",
      backgroundColor: "#000000",
      padding: {
        top: 0,
        bottom: 0,
      },
    }).setOrigin(0.5, 0.5);
    findeeText.setAngle(rotation);

    findee.text = findeeText;

    findee.on("pointerdown", () => {
      this.tweens.add({
        targets: [findee, findeeText],
        rotation: Math.PI * 2,
        duration: 500,
        repeat: -1
      })

      findeeText.text = "YESSSSSS!!!!"
    });

    return findee;
  }
}
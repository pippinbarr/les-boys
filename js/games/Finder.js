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

    this.findMe = undefined;
    for (let i = 0; i < num; i++) {
      const c = characters[Math.floor(Math.random() * characters.length)];
      const s = this.add.image(Math.random() * WIDTH, Math.random() * HEIGHT, c.name);
      s.setScale(0.25 + Math.random() * 0.25);
      if (!this.findMe && (Math.random() < 1 / characters.length || i === num - 1)) {
        this.findMe = s;
        // this.findMe.setTint(0xff0000);
        this.findMe.name = c.name;
        this.findMe.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.findMe.width, this.findMe.height), Phaser.Geom.Rectangle.Contains);
        this.findMe.on("pointerdown", () => {
          this.tweens.add({
            targets: [this.findMe, this.findText],
            rotation: Math.PI * 2,
            duration: 500,
            repeat: -1
          })
          this.tweens.add({
            targets: [this.findText],
            y: this.height,
            duration: 2000,
            repeat: -1,
            yoyo: true
          })

          this.findText.text = "YESSSSSS!!!!"
        });
      }
    }

    this.findMe.setDepth(10000);

    this.findText = this.add.text(WIDTH / 2, HEIGHT / 10, `Find ${this.findMe.name}`, {
      font: "bold 100px sans-serif",
      color: "#ff6677",
      backgroundColor: "#000000",
      padding: {
        top: 0,
        bottom: 0,
      },
    }).setOrigin(0.5, 0.5);


    this.input.once('pointerup', () => {
      if (!this.inputEnabled) return;

      this.inputEnabled = false;
    });

  }
}
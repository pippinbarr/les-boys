class Title extends Phaser.Scene {

  constructor(config) {
    super({
      key: "title"
    });

    this.indent = 100;
  }

  create() {
    this.width = this.game.canvas.width;
    this.height = this.game.canvas.height;

    this.cameras.main.setBackgroundColor("#000000");

    this.createTitle("LES BOYS");

    this.cameras.main.once('camerafadeincomplete', function (camera) {
      this.inputEnabled = true;
    });
  }

  createTitle(title) {
    // Random characters
    for (let i = 0; i < 5; i++) {
      const c = characters[Math.floor(Math.random() * characters.length)];
      const s = this.add.image(Math.random() * WIDTH, Math.random() * HEIGHT, c.name);
    }

    // Title
    this.titleText = this.add.text(WIDTH / 2, HEIGHT / 2, title, {
      font: "bold 150px sans-serif",
      color: "#ff6677",
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
class Dodger extends Phaser.Scene {

  constructor(config) {
    super({
      key: "dodger"
    });
  }

  create() {
    this.width = this.game.canvas.width;
    this.height = this.game.canvas.height;

    this.cameras.main.setBackgroundColor("#000000");

    this.player = {};
    this.player.character = this.getRandomCharacter();
    this.player.sprite = this.physics.add.image(0, 0, this.player.character.name);
    this.player.sprite.setScale(0.25 + Math.random() * 0.25);
    this.player.sprite.setPosition(this.width / 2, this.height - this.player.sprite.displayHeight / 2);

    const c = this.getRandomCharacter();
    this.dropper = this.physics.add.image(Math.random() * WIDTH, -100, c.name);
    this.dropper.setVelocity(0, 100);
    this.dropper.setScale(0.25 + Math.random() * 0.25);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.once('camerafadeincomplete', function (camera) {
      this.inputEnabled = true;
    });
  }

  update(time, delta) {

    // this.dropper.setTexture(this.getRandomCharacter().name);

    if (this.cursors.left.isDown) {
      this.player.sprite.setAcceleration(-1000, 0);
    }
    else if (this.cursors.right.isDown) {
      this.player.sprite.setAcceleration(1000, 0);
    }
    else {
      this.player.sprite.setAcceleration(0, 0);
    }
  }

  getRandomCharacter() {
    return characters[Math.floor(Math.random() * characters.length)];
  }

}
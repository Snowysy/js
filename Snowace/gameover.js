class gameover extends Phaser.Scene {
  constructor() {
    super({
      key: "gameover",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("gameover","assets/snowace_game/snowace_game-05.jpg");

  }

  create() {
    console.log("*** gameover scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'gameover').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("ENTER");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");
        this.scene.start( "world");
      },
      this
    );

    this.losesound = this.sound.add("lose");
    this.losesound.play();

    }}

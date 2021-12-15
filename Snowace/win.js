class win extends Phaser.Scene {
  constructor() {
    super({
      key: "win",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("win","assets/snowace_game/snowace_game-06.jpg");

  }

  create() {
    console.log("*** win scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'win').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("ENTER");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to mainpage scene");
        this.scene.start( "mainpage");
      },
      this
    );

      this.winsound = this.sound.add("win");
      this.winsound.play();
  }}

class intropage extends Phaser.Scene {
  constructor() {
    super({
      key: "intropage",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("intropage","assets/snowace_game/snowace_game-04.jpg");

  }

  create() {
    console.log("*** intropage scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'intropage').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("ENTER");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to rules scene");
        this.scene.start( "rules");
      },
      this
    );
    this.sealsound = this.sound.add("seal");
      this.sealsound.play();

    }}

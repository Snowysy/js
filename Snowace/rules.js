class rules extends Phaser.Scene {
  constructor() {
    super({
      key: "rules",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("rules","assets/snowace_game/snowace_game-02.jpg");

  }

  create() {
    console.log("*** rules scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'rules').setOrigin(0, 0);

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

    this.sealsound = this.sound.add("seal");
      this.sealsound.play();

    }}

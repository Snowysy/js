class preload extends Phaser.Scene {
  constructor() {
    super({
      key: "preload",
    });

    // Put global variable here
  }

  preload() {
    this.load.atlas( 'left', 'assets/penguin left.png', 'assets/penguin left.json'); 
    this.load.atlas( 'right', 'assets/penguin right.png', 'assets/penguin right.json');
    this.load.atlas( 'front', 'assets/penguin front.png', 'assets/penguin front.json');
    this.load.atlas( 'back', 'assets/penguin back.png', 'assets/penguin back.json');

    //change screen sound
    this.load.audio("seal","assets/music/seal.mp3");

    // win game sound
    this.load.audio("win","assets/music/win.WAV");

    //lose game sound
    this.load.audio("lose","assets/music/lose.mp3");

    // penguin get hit sound
    this.load.audio("penguin_get_hit","assets/music/penguin_get_hit.mp3");

    //collect sound
    this.load.audio("collectfish","assets/music/collect fish.mp3");

    //background music
    this.load.audio("bgm","assets/music/bgm.mp3");
  }

  create() {
    console.log("*** preload scene");

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music

    // Add image and detect spacebar keypress
    //this.add.image(0, 0, 'main').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to mainpage scene");

        this.scene.start(
          "mainpage",
          // Optional parameters
          {}
        );
      },
      this
    );

    // Add any text in the main page
    this.add.text(90, 600, "Press spacebar to continue", {
      font: "30px Courier",
      fill: "#FFFFFF",
    });

    // Create all the game animations here
  }
}

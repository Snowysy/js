class mainpage extends Phaser.Scene {
  constructor() {
    super({
      key: "mainpage",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("mainpage","assets/snowace_game/snowace_game-main.jpg")
    //change screen sound
    this.load.audio("seal","assets/music/seal.mp3");

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
    console.log("*** mainpage scene");

     //background_sound
     this.music = this.sound.add("bgm", {
      loop: true,
    }).setVolume(0.1);this.music.play();

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'mainpage').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("ENTER");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to storyline scene");
        this.scene.start( "storyline");
      },
      this
    );
    this.sealsound = this.sound.add( "seal");
      this.sealsound.play();
      
    }}

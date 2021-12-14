class wintermap1 extends Phaser.Scene {
    constructor() {
      super({
        key: "wintermap1",
      });
    }
  
    // incoming data from scene below
    init(data) {}
  
    preload() {
      // Step 1, load JSON
      this.load.tilemapTiledJSON("winter_map_01","assets/winter_map_01.json");
  
      // // Step 2 : Preload any images here, nickname, filename （这里放你的tileset PNG和你的character animation那些，反正就是图片那些）
  
      this.load.image("snow1","assets/snow1.png");
      this.load.image("snow2","assets/snow2.png");
      this.load.image("snow3","assets/snow3.png");
      this.load.image("winter1","assets/winter1.png");
      this.load.image("winter2","assets/winter2.png");

      //heart
      console.log("live:", window.heart);
  
     //enemy
     this.load.atlas( 'seal_left', 'assets/seal left.png', 'assets/seal left.json');
     this.load.atlas( 'seal_right', 'assets/seal right.png', 'assets/seal right.json');

      this.load.spritesheet("greenfish", "assets/greenfish.png", {
        frameWidth: 34,
        frameHeight: 34,
      });

    }
  
    create() {
      console.log("*** wintermap1 scene");

      //Step 3 - Create the map from main
      let map = this.make.tilemap({key:'winter_map_01'}); //or var map 也可以，然后那个key的字，跟着你上面那个step1的world1，要一样的名字！因为是connect的！

      //declear sound variable
      this.hitsound = this.sound.add("penguin_get_hit");

      //collectsound
      this.collectsound = this.sound.add("collectfish");
  
      // Step 4 Load the game tiles
      // 1st parameter is name in Tiled,
      // 2nd parameter is key in Preload
      let snow1Tiles = map.addTilesetImage("snow1", "snow1"); //前面的“”要跟着你在tilemap里面放的那个tileset名字，后面的“”跟着你上面load image取得名字a.k.a第一个“”）
      let snow2Tiles = map.addTilesetImage("snow2", "snow2");
      let snow3Tiles = map.addTilesetImage("snow3", "snow3");
      let winter1Tiles = map.addTilesetImage("winter1", "winter1");
      let winter2Tiles = map.addTilesetImage("winter2", "winter2");
  
  
  
      let tilesArray = [ snow1Tiles,snow2Tiles,snow3Tiles,winter1Tiles,winter2Tiles ] //这个是tilesArray是方便你不用下面一个个打出来，直接load完你全部的tileset）（看下一个step）

     
  
      // Step 5  Load in layers by layers (一层一层加layer，从最底层的layer a.k.a第一个layer开始load进来）
      this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0); //layer的名字要跟你在tilemap里面取的layer名字一样！，后面tilesArray就是你直接load你的tileset进来了）
      this.waterLayer = map.createLayer("waterLayer", tilesArray, 0, 0);
      this.snowLayer = map.createLayer("snowLayer", tilesArray, 0, 0);
      this.treeLayer = map.createLayer("treeLayer", tilesArray, 0, 0);
      this.houseLayer = map.createLayer("houseLayer", tilesArray, 0, 0);
        
  
      this.physics.world.bounds.width = this.groundLayer.width; //这个应该也是set你character不会跑出去一个地方的，but with layer？不是很确定
      this.physics.world.bounds.height = this.groundLayer.height;

      this.heart1 = this.add.image(70,25,'heart').setScale(0.1).setScrollFactor(0);
      this.heart2 = this.add.image(110,25,'heart').setScale(0.1).setScrollFactor(0);
      this.heart3 = this.add.image(150,25,'heart').setScale(0.1).setScrollFactor(0);

      //敌人走动
      this.time.addEvent({ delay: 1000, callback: this.moveDownUp1, callbackScope: this, loop: false });
      this.time.addEvent({ delay: 1000, callback: this.moveDownUp2, callbackScope: this, loop: false });

      this.anims.create({
        key: "leftGreenfish",
        frames: this.anims.generateFrameNumbers("greenfish", {
          start: 0,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "rightGreenfish",
        frames: this.anims.generateFrameNumbers("greenfish", {
          start: 5,
          end: 9,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: 'seal_left',
        frames: [
          { key: 'seal_left', frame: 'seal_left_05'},
          { key: 'seal_left', frame: 'seal_left_01'},
          { key: 'seal_left', frame: 'seal_left_02'},
          { key: 'seal_left', frame: 'seal_left_03'},
          { key: 'seal_left', frame: 'seal_left_04'},
        ],
        frameRate: 5,
        repeat: -1
      })
  
      this.anims.create({
        key: 'seal_right',
        frames: [
          { key: 'seal_right', frame: 'seal_right_01'},
          { key: 'seal_right', frame: 'seal_right_05'},
          { key: 'seal_right', frame: 'seal_right_03'},
          { key: 'seal_right', frame: 'seal_right_02'},
          { key: 'seal_right', frame: 'seal_right_04'},
        ],
        frameRate: 5,
        repeat: -1
      })
  
      // Object layers
      var startPoint = map.findObject(
        "spawn",
        (obj) => obj.name === "startPoint"
      );
      // var endPoint = map.findObject(
      //   "objectLayer",
      //   (obj) => obj.name === "endPoint"
      // );
  
      var start = map.findObject("spawn",(obj) => obj.name === "start");
  
      this.player = this.physics.add.sprite(40, 305, 'front')
      .setScale(1.5).setSize(16, 16);

      //enemy位子
      this.seal_right = this.physics.add.sprite(303, 529, 'seal_right').play('seal_right');
      this.seal_left = this.physics.add.sprite(1123, 500, 'seal_left').play('seal_left');

      // enable debugging
    window.player = this.player
  
      this.player.setCollideWorldBounds(true); // don't go out of the this.map （set character不会跑出去map，true就是不会，改成false就会）

       // collectables

    this.greenfish1 = this.physics.add
    .sprite(77, 480, "greenfish")
    .play("leftGreenfish")
    .setScale(1.5)
    .setSize(12, 12);
  this.greenfish2 = this.physics.add
    .sprite(125, 570, "greenfish")
    .play("rightGreenfish")
    .setScale(1.5)
    .setSize(12, 12);
  this.greenfish3 = this.physics.add
    .sprite(350, 580, "greenfish")
    .play("leftGreenfish")
    .setScale(1.5)
    .setSize(12, 12);
  this.greenfish4 = this.physics.add
    .sprite(870, 580, "greenfish")
    .play("rightGreenfish")
    .setScale(1.5)
    .setSize(12, 12);  
  this.greenfish5 = this.physics.add
    .sprite(1170, 530, "greenfish")
    .play("leftGreenfish")
    .setScale(1.5)
    .setSize(12, 12);
    
  //   // Small fish icon at top of the screen
  //   this.greenFishIcon1 = this.add
  //     .sprite(20, 10, "greenfish")
  //     .setScale(2)
  //     .setScrollFactor(0)
  //     .setVisible(false);

  //   this.greenFishIcon2 = this.add
  //     .sprite(60, 10, "greenfish")
  //     .setScale(2)
  //     .setScrollFactor(0)
  //     .setVisible(false);

  //   this.greenFishIcon3 = this.add
  //     .sprite(100, 10, "greenfish")
  //     .setScale(2)
  //     .setScrollFactor(0)
  //     .setVisible(false);

  //   this.greenFishIcon4 = this.add
  //   .sprite(20, 10, "greenfish")
  //   .setScale(2)
  //   .setScrollFactor(0)
  //   .setVisible(false);

  // this.greenFishIcon5 = this.add
  //   .sprite(60, 10, "greenfish")
  //   .setScale(2)
  //   .setScrollFactor(0)
  //   .setVisible(false);

  
      // // create the arrow keys
       this.cursors = this.input.keyboard.createCursorKeys();
  
      // // camera follow player （这个就是如果你的map size大过你的game size然后你在网站开出来的时候显示不完整个地图的时候你可以加这个，镜头会跟着你的character移动！）
      this.cameras.main.startFollow(this.player);
  
  
      this.treeLayer.setCollisionByExclusion(-1, true) //（额，这个setCollisionByExclusion在你layer的好像是如果你加了的话，你的character就不会穿过这些东西，就会block它啦）
      
  
      this.physics.add.collider(this.player, this.treeLayer); //这个，应该，也是跟上面一样set Collider的，but你应该是要加这个才可以真的不会撞到？所以应该是一起的
      
      this.physics.add.overlap(this.player, this.greenfish1, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.greenfish2, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.greenfish3, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.greenfish4, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.greenfish5, this.collectFish, null, this);

      // enemy overlap 
      this.physics.add.overlap(this.player, this.seal_left, this.minusheartLeft, null, this);
      this.physics.add.overlap(this.player, this.seal_right, this.minusheartRight, null, this);

      this.greenScore = this.add
         .text(26, 46, "Green Fish 0",{
          fontSize: "20px",
          fill: "#155660",
         })
         .setScrollFactor(0);

    };
    /////////////////// end of create //////////////////////////////
  
    update() {
      ///////// check for wintermap2
      if ( this.player.x > 1092 && this.player.x < 1115
        && this.player.y > 141 && this.player.y < 145 ) {
          this.wintermap2();
        }

      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
        this.player.anims.play("left", true); //（你那个红色那边的字要跟着你上面animation create那个key的名字一样噢）
      } 
      else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(200);
        this.player.anims.play("right", true);
      } 
      else if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-200);
        this.player.anims.play("back", true);
        //console.log('up');
      } 
      else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(200);
        this.player.anims.play("front", true);
        //console.log('down');
      } 
      else {
        this.player.anims.stop(); //这个就是比如你move你character然后停下来，它就停在那个地方那个角度瓜）
        this.player.body.setVelocity(0, 0);
      }
    } /////////////////// end of update //////////////////////////////
    
    

  // heart//
    minusheartLeft(player, seal_left,){
    console.log("minus heart left by seal")
    window.heart -- ;
    player.x = seal_left.x+80
    player.y = seal_left.y+80
     //penguin get hit sound
     this.hitsound.play();
    this.cameras.main.shake(200);

       if (window.heart == 2){
    this.heart3.setVisible(false);
  } else if (window.heart == 1){
    this.heart2.setVisible(false);
  } else if (window.heart == 0){
    this.heart1.setVisible(false);
    console.log("diedie")
    this.scene.start('gameover');
  }
}
    minusheartRight(player, seal_right,){
      console.log("minus heart right by seal")
      window.heart -- ;
      player.x = seal_right.x+80
      player.y = seal_right.y+80
       //penguin get hit sound
      this.hitsound.play();
      this.cameras.main.shake(200);
  
         if (window.heart == 2){
      this.heart3.setVisible(false);
    } else if (window.heart == 1){
      this.heart2.setVisible(false);
    } else if (window.heart == 0){
      this.heart1.setVisible(false);
      console.log("diedie")
      this.scene.start('gameover');
    }
    }

    
    // Function to jump to wintermap2
    wintermap2(player, tile) {
      console.log("wintermap2 function");
      this.scene.start("wintermap2");
    }

  collectFish (player, fish) {
  console.log("collect Fish");

  fish.disableBody(true, true);

  this.collectsound.play();

  window.greenfish = window.greenfish + 1;
  console.log("greenfish: ", window.greenfish);

  this.greenScore.setText("Green Fish: " + window.greenfish );

//  // Display fish icon as fishes are collected
//  if (window.greenfish == 0) {
//   this.greenFishIcon1.setVisible(false);
//   this.greenFishIcon2.setVisible(false);
//   this.greenFishIcon3.setVisible(false);
//   this.greenFishIcon4.setVisible(false);
//   this.greenFishIcon5.setVisible(false);
// } else if (window.greenfish == 1) {
//   this.greenFishIcon1.setVisible(true);
// } else if (window.greenfish == 2) {
//   this.greenFishIcon1.setVisible(true);
//   this.greenFishIcon2.setVisible(true);
// } else if (window.greenfish == 3) {
//   this.greenFishIcon1.setVisible(true);
//   this.greenFishIcon2.setVisible(true);
//   this.greenFishIcon3.setVisible(true);
// }
//    else if (window.greenfish == 3) {
//   this.greenFishIcon1.setVisible(true);
//   this.greenFishIcon2.setVisible(true);
//   this.greenFishIcon3.setVisible(true);
// }
//   else if (window.greenfish == 4) {
//   this.greenFishIcon1.setVisible(true);
//   this.greenFishIcon2.setVisible(true);
//   this.greenFishIcon3.setVisible(true);
//   this.greenFishIcon4.setVisible(true);
// }
//   else if (window.greenfish == 5) {
//   this.greenFishIcon1.setVisible(true);
//   this.greenFishIcon2.setVisible(true);
//   this.greenFishIcon3.setVisible(true);
//   this.greenFishIcon4.setVisible(true);
//   this.greenFishIcon5.setVisible(true);
// }
}
moveDownUp1() {
  console.log('moveDownUp1')
  this.tweens.timeline({
      targets: this.seal_right,
      ease: 'Linear',
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
      {
          x: 123,
      },
      {
          x: 303,
      },
  ]
  });
}

moveDownUp2() {
  console.log('moveDownUp2')
  this.tweens.timeline({
      targets: this.seal_left,
      ease: 'Linear',
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
      {
          x: 996,
      },
      {
          x: 1123,
      },
  ]
  });
}

  // score += 10;

// scoreText.setText('Score' + score);
}//////////// end of class world ////////////
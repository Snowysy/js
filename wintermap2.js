class wintermap2 extends Phaser.Scene {
    constructor() {
      super({
        key: "wintermap2",
      });
    }
  
    // incoming data from scene below
    init(data) {}
  
    preload() {
      // Step 1, load JSON
      this.load.tilemapTiledJSON("winter_map_02","assets/winter_map_02.json");
  
      // // Step 2 : Preload any images here, nickname, filename （这里放你的tileset PNG和你的character animation那些，反正就是图片那些）
  
      this.load.image("snow1","assets/snow1.png");
      this.load.image("snow2","assets/snow2.png");
      this.load.image("snow3","assets/snow3.png");
      this.load.image("snowtree","assets/snowtree.png");
      this.load.image("snowspike","assets/snowspike.png");
      this.load.image("winter1","assets/winter1.png");
      this.load.image("winter2","assets/winter2.png");
  
      //heart
      console.log("live:", window.heart);

      //enemy
      this.load.atlas( 'seal_left', 'assets/seal left.png', 'assets/seal left.json');
      this.load.atlas( 'seal_right', 'assets/seal right.png', 'assets/seal right.json');

      this.load.spritesheet("redfish", "assets/redfish.png", {
        frameWidth: 34,
        frameHeight: 34,
      });
    }
  
    create() {
      console.log("*** wintermap2 scene");
  
      //Step 3 - Create the map from main
      let map = this.make.tilemap({key:'winter_map_02'}); //or var map 也可以，然后那个key的字，跟着你上面那个step1的world1，要一样的名字！因为是connect的！
  
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
      let snowtreeTiles = map.addTilesetImage("snowtree", "snowtree");
      let snowspikeTiles = map.addTilesetImage("snowspike", "snowspike");
      let winter1Tiles = map.addTilesetImage("winter1", "winter1");
      let winter2Tiles = map.addTilesetImage("winter2", "winter2");
  
  
  
      let tilesArray = [ snow1Tiles,snow2Tiles,snow3Tiles,snowspikeTiles,snowtreeTiles,winter1Tiles,winter2Tiles ] //这个是tilesArray是方便你不用下面一个个打出来，直接load完你全部的tileset）（看下一个step）
  



      // Step 5  Load in layers by layers (一层一层加layer，从最底层的layer a.k.a第一个layer开始load进来）
      this.groudLayer = map.createLayer("groudLayer", tilesArray, 0, 0); //layer的名字要跟你在tilemap里面取的layer名字一样！，后面tilesArray就是你直接load你的tileset进来了）
      this.treeLayer = map.createLayer("treeLayer", tilesArray, 0, 0);
      this.houseLayer = map.createLayer("houseLayer", tilesArray, 0, 0);
        
  
      this.physics.world.bounds.width = this.groudLayer.width; //这个应该也是set你character不会跑出去一个地方的，but with layer？不是很确定
      this.physics.world.bounds.height = this.groudLayer.height;

      this.heart1 = this.add.image(70,25,'heart').setScale(0.1).setScrollFactor(0);
      this.heart2 = this.add.image(110,25,'heart').setScale(0.1).setScrollFactor(0);
      this.heart3 = this.add.image(150,25,'heart').setScale(0.1).setScrollFactor(0);

      //敌人走动
      this.time.addEvent({ delay: 1000, callback: this.moveDownUp1, callbackScope: this, loop: false });
      this.time.addEvent({ delay: 1000, callback: this.moveDownUp2, callbackScope: this, loop: false });

      this.anims.create({
        key: "leftRedfish",
        frames: this.anims.generateFrameNumbers("redfish", {
          start: 0,
          end: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
  
      this.anims.create({
        key: "rightRedfish",
        frames: this.anims.generateFrameNumbers("redfish", {
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
  
      this.player = this.physics.add.sprite(30, 590, 'front')
      .setScale(1.5).setSize(16, 16);

      //enemy位子
      this.seal_right = this.physics.add.sprite(312, 533, 'seal_right').play('seal_right');
      this.seal_left = this.physics.add.sprite(1243, 591, 'seal_left').play('seal_left');

       // enable debugging
    window.player = this.player
  
      this.player.setCollideWorldBounds(true); // don't go out of the this.map （set character不会跑出去map，true就是不会，改成false就会）

      // collectables

  this.redfish1 = this.physics.add
    .sprite(623, 73, "redfish")
    .play("leftRedfish")
    .setScale(1.5)
    .setSize(12, 12);
  this.redfish2 = this.physics.add
    .sprite(195, 569, "redfish")
    .play("rightRedfish")
    .setScale(1.5)
    .setSize(12, 12);
  this.redfish3 = this.physics.add
    .sprite(350, 580, "redfish")
    .play("leftRedfish")
    .setScale(1.5)
    .setSize(12, 12);
  this.redfish4 = this.physics.add
    .sprite(971, 598, "redfish")
    .play("rightRedfish")
    .setScale(1.5)
    .setSize(12, 12);  
  this.redfish5 = this.physics.add
    .sprite(1170, 530, "redfish")
    .play("leftRedfish")
    .setScale(1.5)
    .setSize(12, 12);  
  this.redfish6 = this.physics.add
    .sprite(743, 20, "redfish")
    .play("leftRedfish")
    .setScale(1.5)
    .setSize(12, 12);
  this.redfish7 = this.physics.add
    .sprite(1106, 618, "redfish")
    .play("rightRedfish")
    .setScale(1.5)
    .setSize(12, 12);
  this.redfish8 = this.physics.add
    .sprite(1244, 628, "redfish")
    .play("leftRedfish")
    .setScale(1.5)
    .setSize(12, 12);
  this.redfish9 = this.physics.add
    .sprite(505, 12, "redfish")
    .play("rightRedfish")
    .setScale(1.5)
    .setSize(12, 12);  
  this.redfish10 = this.physics.add
    .sprite(277, 495, "redfish")
    .play("leftRedfish")
    .setScale(1.5)
    .setSize(12, 12);  
  
  //    // Small fish icon at top of the screen
  //    this.redFishIcon1 = this.add
  //    .sprite(20, 10, "redfish")
  //    .setScale(2)
  //    .setScrollFactor(0)
  //    .setVisible(false);

  //  this.redFishIcon2 = this.add
  //    .sprite(60, 10, "redfish")
  //    .setScale(2)
  //    .setScrollFactor(0)
  //    .setVisible(false);

  //  this.redFishIcon3 = this.add
  //    .sprite(100, 10, "redfish")
  //    .setScale(2)
  //    .setScrollFactor(0)
  //    .setVisible(false);

  //    this.redFishIcon4 = this.add
  //    .sprite(100, 10, "redfish")
  //    .setScale(2)
  //    .setScrollFactor(0)
  //    .setVisible(false);

  //    this.redFishIcon5 = this.add
  //    .sprite(100, 10, "redfish")
  //    .setScale(2)
  //    .setScrollFactor(0)
  //    .setVisible(false);

      // // create the arrow keys
       this.cursors = this.input.keyboard.createCursorKeys();
  
      // // camera follow player （这个就是如果你的map size大过你的game size然后你在网站开出来的时候显示不完整个地图的时候你可以加这个，镜头会跟着你的character移动！）
      this.cameras.main.startFollow(this.player);
  
  
      this.treeLayer.setCollisionByExclusion(-1, true) //（额，这个setCollisionByExclusion在你layer的好像是如果你加了的话，你的character就不会穿过这些东西，就会block它啦）
      
  
      this.physics.add.collider(this.player, this.treeLayer); //这个，应该，也是跟上面一样set Collider的，but你应该是要加这个才可以真的不会撞到？所以应该是一起的
      
      this.physics.add.overlap(this.player, this.redfish1, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.redfish2, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.redfish3, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.redfish4, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.redfish5, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.redfish6, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.redfish7, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.redfish8, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.redfish9, this.collectFish, null, this);
      this.physics.add.overlap(this.player, this.redfish10, this.collectFish, null, this);

       // enemy overlap 
       this.physics.add.overlap(this.player, this.seal_left, this.minusheartLeft, null, this);
       this.physics.add.overlap(this.player, this.seal_right, this.minusheartRight, null, this);

      this.redScore = this.add
         .text(26, 46, "Red Fish 0",{
          fontSize: "20px",
          fill: "#155660",
         })
         .setScrollFactor(0);

    };
    /////////////////// end of create //////////////////////////////
  
    update() {
 ///////// check for wintermap3
 if ( this.player.x > 1081 && this.player.x < 1108
  && this.player.y > 142 && this.player.y < 168 ) {
    this.wintermap3();
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
  
    // Function to jump to wintermap3
    wintermap3(player, tile) {
      console.log("wintermap3 function");
      this.scene.start("wintermap3");
    }

    collectFish (player, fish){
    console.log("collect Fish");

  fish.disableBody(true, true);

  this.collectsound.play();

  window.redfish = window.redfish + 1;
  console.log("redfish: ", window.redfish);

  this.redScore.setText("Red Fish: " + window.redfish );

//   //  // Display fish icon as fishes are collected
//  if (window.redfish == 0) {
//   this.redFishIcon1.setVisible(false);
//   this.redFishIcon2.setVisible(false);
//   this.redFishIcon3.setVisible(false);
//   this.redFishIcon4.setVisible(false);
//   this.redFishIcon5.setVisible(false);
// } else if (window.redfish == 1) {
//   this.redFishIcon1.setVisible(true);
// } else if (window.redfish == 2) {
//   this.redFishIcon1.setVisible(true);
//   this.redFishIcon2.setVisible(true);
// } else if (window.redfish == 3) {
//   this.redFishIcon1.setVisible(true);
//   this.redFishIcon2.setVisible(true);
//   this.redFishIcon3.setVisible(true);
// }
//    else if (window.redfish == 3) {
//   this.redFishIcon1.setVisible(true);
//   this.redFishIcon2.setVisible(true);
//   this.redFishIcon3.setVisible(true);
// }
//   else if (window.redfish == 4) {
//   this.redFishIcon1.setVisible(true);
//   this.redFishIcon2.setVisible(true);
//   this.redFishIcon3.setVisible(true);
//   this.redFishIcon4.setVisible(true);
// }
//   else if (window.redfish == 5) {
//   this.redFishIcon1.setVisible(true);
//   this.redFishIcon2.setVisible(true);
//   this.redFishIcon3.setVisible(true);
//   this.redFishIcon4.setVisible(true);
//   this.redFishIcon5.setVisible(true);
// }
    }
moveDownUp1() {
  console.log('moveDownUp1')
  this.tweens.timeline({
      targets: this.seal_right,
      ease: 'Linear',
      loop: -1, // loop forever
      duration: 3000,
      tweens: [
      {
          x: 125,
      },
      {
          x: 312,
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
      duration: 3000,
      tweens: [
      {
          x: 1033,
      },
      {
          x: 1243,
      },
  ]
  });
}

}
   //////////// end of class world ////////////////////////

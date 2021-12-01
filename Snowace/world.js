class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {}

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world_map_01","assets/world_map_01.json");

    // // Step 2 : Preload any images here, nickname, filename （这里放你的tileset PNG和你的character animation那些，反正就是图片那些）

    this.load.image("snow1","assets/snow1.png");
    this.load.image("snow2","assets/snow2.png");
    this.load.image("snow3","assets/snow3.png");
    this.load.image("snowtree","assets/snowtree.png");
    this.load.image("snowspike","assets/snowspike.png");
    this.load.image("winter1","assets/winter1.png");
    this.load.image("winter2","assets/winter2.png");

    this.load.atlas( 'left', 'assets/penguin left.png', 'assets/penguin left.json'); //load了png然后load你的j.son在后面
    this.load.atlas( 'right', 'assets/penguin right.png', 'assets/penguin right.json');
    this.load.atlas( 'front', 'assets/penguin front.png', 'assets/penguin front.json');
    this.load.atlas( 'back', 'assets/penguin back.png', 'assets/penguin back.json');
  }
    //enemy
    //this.load.atlas( 'seal', 'assets/seal left.png', 'assets/seal left.json');

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:'world_map_01'}); //or var map 也可以，然后那个key的字，跟着你上面那个step1的world1，要一样的名字！因为是connect的！

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
    this.gorundLayer = map.createLayer("gorundLayer", tilesArray, 0, 0); //layer的名字要跟你在tilemap里面取的layer名字一样！，后面tilesArray就是你直接load你的tileset进来了）
    this.treeLayer = map.createLayer("treeLayer", tilesArray, 0, 0);
    this.houseLayer = map.createLayer("houseLayer", tilesArray, 0, 0);
      
    this.anims.create({ //这个是放你character animation的地方
      key: 'left',
      frames: [
        { key: 'left', frame: 'penguin_left_05'}, //（你那个frame的顺序和字要去你export出来的json file看是什么，然后要完全一模一样跟着写！）
        { key: 'left', frame: 'penguin_left_06'},
        { key: 'left', frame: 'penguin_left_03'},
        { key: 'left', frame: 'penguin_left_01'},
        { key: 'left', frame: 'penguin_left_04'},
        { key: 'left', frame: 'penguin_left_07'},
        { key: 'left', frame: 'penguin_left_02'},

      ],
      frameRate: 6, //（这个是你character移动的速度、or应该说是movement速度也可以，反正，就是速度，可自行调噢）
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: [
        { key: 'right', frame: 'penguin_right_03'},
        { key: 'right', frame: 'penguin_right_05'},
        { key: 'right', frame: 'penguin_right_01'},
        { key: 'right', frame: 'penguin_right_02'},
        { key: 'right', frame: 'penguin_right_06'},
        { key: 'right', frame: 'penguin_right_07'},
        { key: 'right', frame: 'penguin_right_04'},

      ],
      frameRate: 6,
      repeat: -1
    })



    this.anims.create({
      key: 'back',
      frames: [
        { key: 'back', frame: 'penguin_back_03'},
        { key: 'back', frame: 'penguin_back_02'},
        { key: 'back', frame: 'penguin_back_04'},
        { key: 'back', frame: 'penguin_back_05'},
        { key: 'back', frame: 'penguin_back_01'},
      ],
      frameRate: 6,
      repeat: -1
    })

     this.anims.create({
      key: 'front',
      frames: [
        { key: 'front', frame: 'penguin_front_02'},
        { key: 'front', frame: 'penguin_front_03'},
        { key: 'front', frame: 'penguin_front_04'},
        { key: 'front', frame: 'penguin_front_01'},
        { key: 'front', frame: 'penguin_front_05'},
      ],
      frameRate: 6,
      repeat: -1
    })
    // this.anims.create({
    //   key: 'down',
    //   frames: [
    //     { key: 'seal', frame: 'seal_left_05'},
    //     { key: 'seal', frame: 'seal_left_01'},
    //     { key: 'seal', frame: 'seal_left_02'},
    //     { key: 'seal', frame: 'seal_left_03'},
    //     { key: 'seal', frame: 'seal_left_04'},
    //   ],
    //   frameRate: 6,
    //   repeat: -1
    // })

    this.physics.world.bounds.width = this.gorundLayer.width; //这个应该也是set你character不会跑出去一个地方的，but with layer？不是很确定
    this.physics.world.bounds.height = this.gorundLayer.height;

    // Object layers
    var startPoint = map.findObject(
      "object",
      (obj) => obj.name === "startPoint"
    );
    // var endPoint = map.findObject(
    //   "objectLayer",
    //   (obj) => obj.name === "endPoint"
    // );

    var start = map.findObject("object",(obj) => obj.name === "start");

    this.player = this.physics.add.sprite(100, 605, 'up');

    // enable debugging
    window.player = this.player

    this.player.setCollideWorldBounds(true); // don't go out of the this.map （set character不会跑出去map，true就是不会，改成false就会）
    //enemy
    this.add.sprite(170, 200, "seal").play("seal left");
    // // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player （这个就是如果你的map size大过你的game size然后你在网站开出来的时候显示不完整个地图的时候你可以加这个，镜头会跟着你的character移动！）
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);


    this.treeLayer.setCollisionByExclusion(-1, true) //（额，这个setCollisionByExclusion在你layer的好像是如果你加了的话，你的character就不会穿过这些东西，就会block它啦）
    

    this.physics.add.collider(this.player, this.treeLayer); //这个，应该，也是跟上面一样set Collider的，but你应该是要加这个才可以真的不会撞到？所以应该是一起的
    
  } 
  /////////////////// end of create //////////////////////////////

  update() {

// ///////// check for wintermap1

    if ( this.player.x > 1868 && this.player.x < 1905
        && this.player.y > 307 && this.player.y < 353 ) {
          this.wintermap1();
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

  // Function to jump to wintermap1
  wintermap1(player, tile) {
    console.log("wintermap1 function");
    this.scene.start("wintermap1");
  }
} //////////// end of class world ////////////////////////

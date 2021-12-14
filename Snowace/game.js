var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 20,
    height: 32 * 20,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#FFFFFF',
    pixelArt: true,
    scene: [preload, mainpage, storyline, intropage, rules, world, wintermap1, wintermap2, wintermap3, win, gameover]
};

var game = new Phaser.Game(config);
window.greenfish = 0;
window.redfish = 0;
window.yellowfish = 0;

window.heart = 3;
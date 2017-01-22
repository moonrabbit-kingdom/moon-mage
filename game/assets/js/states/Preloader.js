MoonMage.states.Preloader = function (game) {
    console.log('Preloader.construct');
    //this.preloadBar = null;
    //this.titleText = null;
    //this.ready = false;
};

MoonMage.states.Preloader.prototype = {

    preload: function () {
        console.log('Preloader.preload');
        //this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
        //this.preloadBar.anchor.setTo(0.5, 0.5);
        //this.load.setPreloadSprite(this.preloadBar);
        //this.titleText = this.add.image(this.world.centerX, this.world.centerY - 220, 'titleimage');
        //this.titleText.anchor.setTo(0.5, 0.5);

        //this.load.bitmapFont('eightbitwonder', ..., ...);
        this.game.load.image('platform', 'assets/img/platform.png');
        this.game.load.image('diamond', 'assets/img/diamond.png');

        this.game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);

        this.game.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('background', 'assets/spritesheets/background.png');


        // load game assets
    },

    create: function () {
        console.log('Preloader.create');
        //this.preloadBar.cropEnabled = false;
    },

    update: function () {
        //this.ready = true;
        this.state.start('MainMenu');
    },
}

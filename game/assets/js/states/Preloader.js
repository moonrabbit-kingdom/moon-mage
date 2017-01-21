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
        this.game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
        this.game.load.spritesheet('terrain', 'assets/spritesheets/terrain.png', 32, 48);

        // load game assets
    },

    create: function () {
        console.log('Preloader.create');
        //this.preloadBar.cropEnabled = false;
    },

    update: function () {
        //this.ready = true;
        this.state.start('Level1');
    },
}

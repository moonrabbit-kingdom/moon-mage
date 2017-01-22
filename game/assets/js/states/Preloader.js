MoonMage.states.Preloader = function (game) {
    MoonMage.debug('stateHooks', 'Preloader.constructor');
};

MoonMage.states.Preloader.prototype = {

    preload: function () {
        MoonMage.debug('stateHooks', 'Preloader.preload');

        this.game.load.image('box', 'assets/img/box.png');
        this.game.load.image('moon', 'assets/img/moon.png');

        this.game.load.spritesheet('luna', 'assets/spritesheets/luna.png', 64, 64);
        this.game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
        this.game.load.spritesheet('ground', 'assets/spritesheets/ground.png', 32, 32, 2);

        this.game.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.json('level1Objects', 'assets/levels/level1.json');


        // load game assets
    },

    create: function () {
    MoonMage.debug('stateHooks', 'Preloader.create');
        //this.preloadBar.cropEnabled = false;
    },

    update: function () {
        //this.ready = true;
        this.state.start(MoonMage.config.startState === null ? 'MainMenu' : MoonMage.config.startState);
    },
}

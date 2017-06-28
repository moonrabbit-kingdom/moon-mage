import MoonMage from '../MoonMage';

var Preloader = function (game) {
    MoonMage.debug('stateHooks', 'Preloader.constructor');
};

Preloader.prototype = {

    preload: function () {
        MoonMage.debug('stateHooks', 'Preloader.preload');

        this.game.load.image('box', 'assets/img/box.png');
        this.game.load.image('moon', 'assets/img/moon.png');

        this.game.load.spritesheet('luna', 'assets/spritesheets/luna.png', 48, 64, 240);
        this.game.load.spritesheet('ground', 'assets/spritesheets/ground.png', 32, 32, 2);

        this.game.load.audio('background-music', 'assets/audio/background-music.mp3');
        this.game.load.audio('wave-sound', 'assets/audio/wave-sound.wav');
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

export default Preloader;

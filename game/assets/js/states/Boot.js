import MoonMage from '../MoonMage';

var Boot = function(game) {
    MoonMage.debug('stateHooks', 'Boot.constructor');
    this.game = game;
};

Boot.prototype = {
    preload: function() {
        MoonMage.debug('stateHooks', 'Boot.preload');
    },

    create: function() {
        MoonMage.debug('stateHooks', 'Boot.create');
        this.scale.minWidth = 1000;
        this.scale.minHeight = 562;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.stage.backgroundColor = '#171642';

        this.state.start('Preloader');
    }
}

export default Boot;

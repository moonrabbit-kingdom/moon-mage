import MoonMage from '../MoonMage';

var PlayIntro = function(game) {
    MoonMage.debug('stateHooks', 'PlayIntro.constructor');
};

PlayIntro.prototype = {
    preload: function() {
        MoonMage.debug('stateHooks', 'PlayIntro.preload');

        this.game.load.video('intro', 'assets/video/intro.mp4');
    },

    create: function() {
        MoonMage.debug('stateHooks', 'PlayIntro.create');

        this.video = this.game.add.video('intro');

        this.video.onPlay.addOnce(function() {
            this.game.time.events.add(96000, function() {
                this._goToGame();
            }, this);
        }, this);

        this.video.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 1.172, 1.169);

        this.video.play();

        var style = { font: '28px Arial', fill: '#FFFFFF', align: 'center' };
        var text = this.game.add.text(this.game.world.centerX - 110, MoonMage.config.viewport.height - 40, 'press \'enter\' to skip' , style);
    },

    update: function() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.video.stop();
            this._goToGame();
        }
    },

    _goToGame() {
        this.game.world.setBounds(0, 0, MoonMage.config.viewport.width, MoonMage.config.viewport.height);
        this.state.start('Level1');
    }
}

export default PlayIntro;

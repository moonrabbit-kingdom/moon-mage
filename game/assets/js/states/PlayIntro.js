MoonMage.states.PlayIntro = function(game) {
    MoonMage.debug('stateHooks', 'PlayIntro.constructor');
};

MoonMage.states.PlayIntro.prototype = {
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

        sprite = this.video.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5);

        this.video.play();

        var style = { font: '28px Arial', fill: '#FFFFFF', align: 'left' };
        var text = this.game.add.text(0, 0, text, style);
    },

    update: function() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.video.stop();
            this._goToGame();
        }
    },

    _goToGame() {
        this.game.world.setBounds(0, 0, MoonMage.config.viewport.width, MoonMage.config.viewport.height);
        this.state.start('Level2');
    }
}

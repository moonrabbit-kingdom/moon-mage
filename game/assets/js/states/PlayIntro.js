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
                this._goToMainMenu();
            }, this);
        }, this);

        sprite = this.video.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5);

        this.video.play();
    },

    update: function() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.video.stop();
            this._goToMainMenu();
        }
    },

    _goToMainMenu() {
        this.game.world.setBounds(0, 0, MoonMage.config.viewport.width, MoonMage.config.viewport.height);
        this.state.start('MainMenu');
    }
}

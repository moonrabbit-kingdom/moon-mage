MoonMage.entities.ui.PauseBox = function (game, state) {
    this.game = game;
    this.state = state;

    var centerX = this.game.camera.x + MoonMage.config.viewport.width/2;
    var centerY = this.game.camera.y + MoonMage.config.viewport.height/2;
    this.pauseBox = this.game.add.sprite(centerX, centerY, 'pause-menu-box');
    this.pauseBox.anchor.setTo(0.5, 0.5);

    this._setupButton(-140, 15, 'pause-continue', this.closePauseMenu);
    this._setupButton(0, 15, 'pause-exit', this._exitPlay);

    this.pauseBox.scale.set(0);

    this.pause = {
        tween: {},
        isPaused: false
    }
}

MoonMage.entities.ui.PauseBox.prototype = {
    _setupButton(x, y, sprite, callback) {
        var button = this.game.add.button(x, y, sprite, callback, this);
        button.input.useHandCursor = true;
        this.pauseBox.addChild(button);
    },

    isPaused: function() {
        return this.pause.isPaused;
    },

    openPauseMenu: function() {
        var tween = this.pause.tween;

        if ((this.pop !== null && tween.isRunning) || this.pause.isPaused) {
            return;
        }

        this.pause.isPaused = true;
        this.pause.tween = this.game.add.tween(this.pauseBox.scale).to( { x: 1, y: 1 }, 100, Phaser.Easing.Linear.None, true);
    },

    closePauseMenu: function() {
        var tween = this.pause.tween;

        if (tween && tween.isRunning || !this.pause.isPaused) {
            return;
        }

        this.pause.isPaused = false;
        this.pause.tween = this.game.add.tween(this.pauseBox.scale).to( { x: 0, y: 0 }, 150, Phaser.Easing.Linear.None, true);
    },

    _exitPlay: function() {
        this.game.world.setBounds(0, 0, MoonMage.config.viewport.width, MoonMage.config.viewport.height);
        this.state.start('MainMenu');
    },
}

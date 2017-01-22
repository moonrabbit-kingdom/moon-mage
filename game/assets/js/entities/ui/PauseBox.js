MoonMage.entities.ui.PauseBox = function (game, state) {
    this.game = game;
    this.state = state;

    var centerX = this.game.camera.x + MoonMage.config.viewport.width/2;
    var centerY = this.game.camera.y + MoonMage.config.viewport.height/2;
    var pauseBox = this.game.add.sprite(centerX, centerY, 'pause-menu-box');
    pauseBox.anchor.setTo(0.5, 0.5);

    var continueButton = this.game.add.button(-140, 15, 'pause-continue', this.closePauseMenu, this);
    continueButton.input.useHandCursor = true;
    pauseBox.addChild(continueButton);


    var exitButton = this.game.add.button(0, 15, 'pause-exit', this._exitPlay, this);
    exitButton.input.useHandCursor = true;
    pauseBox.addChild(exitButton);

    pauseBox.scale.set(0);

    this.pause = {
        box: pauseBox,
        tween: {},
        isPaused: false
    }
}

MoonMage.entities.ui.PauseBox.prototype = {
    isPaused: function() {
        return this.pause.isPaused;
    },

    openPauseMenu: function() {
        var tween = this.pause.tween;

        if ((this.pop !== null && tween.isRunning) || this.pause.isPaused) {
            return;
        }

        this.pause.isPaused = true;
        this.pause.tween = this.game.add.tween(this.pause.box.scale).to( { x: 1, y: 1 }, 100, Phaser.Easing.Linear.None, true);
    },

    closePauseMenu: function() {
        var tween = this.pause.tween;

        if (tween && tween.isRunning || !this.pause.isPaused) {
            return;
        }

        this.pause.isPaused = false;
        this.pause.tween = this.game.add.tween(this.pause.box.scale).to( { x: 0, y: 0 }, 150, Phaser.Easing.Linear.None, true);
    },

    _exitPlay: function() {
        this.game.world.setBounds(0, 0, MoonMage.config.viewport.width, MoonMage.config.viewport.height);
        this.state.start('MainMenu');
    },
}

MoonMage.states.MainMenu = function(game) {
    MoonMage.debug('stateHooks', 'MainMenu.constructor');
};

MoonMage.states.MainMenu.prototype = {
    preload: function() {
        MoonMage.debug('stateHooks', 'MainMenu.preload');

        this.game.load.image('main-menu-background', 'assets/img/main-menu/background.png');
        this.game.load.image('main-menu-caret', 'assets/img/main-menu/caret.png');
        this.game.load.image('main-menu-start', 'assets/img/main-menu/start.png');
    },

    create: function() {
        MoonMage.debug('stateHooks', 'MainMenu.create');

        var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'main-menu-background');
        background.anchor.setTo(0.5, 0.5);

        var button = this.game.add.button(this.game.world.centerX - 200, 460, 'main-menu-start', this._startGame, this);
        button.input.useHandCursor = true;

        var variance = 14;
        var caret = this.game.add.sprite(this.game.world.centerX - 270, 460, 'main-menu-caret');

        this.game.add.tween(caret.position).to( { x: caret.position.x + variance}, 1000, Phaser.Easing.Exponential.EaseInOut, true, 1, -1, true);
    },

    update: function() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this._startGame();
        }
    },

    _startGame() {
        this.state.start('PlayIntro');
    }
}

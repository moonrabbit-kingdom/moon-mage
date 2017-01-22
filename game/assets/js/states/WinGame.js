MoonMage.states.WinGame = function(game) {
    MoonMage.debug('stateHooks', 'WinGame.constructor');
};

MoonMage.states.WinGame.prototype = {
    preload: function() {
        MoonMage.debug('stateHooks', 'WinGame.preload');

        this.game.load.image('main-menu-background', 'assets/img/main-menu/background.png');
        this.game.load.image('main-menu-caret', 'assets/img/main-menu/caret.png');
        this.game.load.image('main-menu-start', 'assets/img/main-menu/start.png');
    },

    create: function() {
        MoonMage.debug('stateHooks', 'WinGame.create');

        this._setupButton(
            this.game.world.centerX - 160,
            this.game.world.centerY + 180,
            'Go to Main Menu',
            this._goToMainMenu
        );

        var variance = 14;
        var caret = this.game.add.sprite(
            this.game.world.centerX - 250,
            this.game.world.centerY + 170,
            'main-menu-caret'
        );

        this.game.add.tween(caret.position).to( { x: caret.position.x + variance}, 1000, Phaser.Easing.Exponential.EaseInOut, true, 1, -1, true);
    },

    update: function() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this._goToMainMenu();
        }
    },

    _setupButton(x, y, text, callback) {
        var button = this.game.add.button(x, y, null, callback, this);
        button.input.useHandCursor = true;

        var style = { font: '36px Arial', fill: '#FFFFFF', align: 'left' };
        var text = this.game.add.text(0, 0, text, style);
        button.addChild(text);
    },

    _goToMainMenu() {
        this.state.start('MainMenu');
    }
}
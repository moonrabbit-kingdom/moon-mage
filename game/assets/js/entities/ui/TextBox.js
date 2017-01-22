MoonMage.entities.ui.TextBox = function (game, text, x, y, width) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.text = text;

    this._setupBox();

}

MoonMage.entities.ui.TextBox.prototype = {
    _setupBox() {
        var centerX = this.x;
        var centerY = this.y;

        var textBoxGraphics = this.game.add.graphics(0, 0);
        textBoxGraphics.beginFill(0xFFFFFF, 1);
        textBoxGraphics.lineStyle(2, 0x000000);
        textBoxGraphics.drawRoundedRect(
            centerX,
            centerY,
            this.width,
            60,
            20
        );

        var textBoxTexture = textBoxGraphics.generateTexture();
        textBoxGraphics.destroy();

        this.textBox = this.game.add.sprite(
            centerX,
            centerY,
            textBoxTexture
        );

        var style = { font: '36px Arial', fill: '#000000', align: 'left' };
        var text = this.game.add.text(- (this.width / 2.6), -20, this.text, style);
        this.textBox.addChild(text);

        this.textBox.anchor.set(0.5, 0.5);
    },

    //_setupButton(x, y, text, callback) {
    //    var button = this.game.add.button(x, y, null, callback, this);
    //    button.input.useHandCursor = true;

    //    var style = { font: '28px Arial', fill: '#000000', align: 'left' };
    //    var text = this.game.add.text(0, 0, text, style);
    //    button.addChild(text);

    //    this.textBox.addChild(button);
    //},

    //isPaused: function() {
    //    return this.pause.isPaused;
    //},

    //openPauseMenu: function() {
    //    var tween = this.pause.tween;

    //    if ((this.pop !== null && tween.isRunning) || this.pause.isPaused) {
    //        return;
    //    }

    //    this.pause.isPaused = true;
    //    this.pause.tween = this.game.add.tween(this.textBox.scale).to( { x: 1, y: 1 }, 100, Phaser.Easing.Linear.None, true);
    //},

    //closePauseMenu: function() {
    //    var tween = this.pause.tween;

    //    if (tween && tween.isRunning || !this.pause.isPaused) {
    //        return;
    //    }

    //    this.pause.isPaused = false;
    //    this.pause.tween = this.game.add.tween(this.textBox.scale).to( { x: 0, y: 0 }, 150, Phaser.Easing.Linear.None, true);
    //},

    //_exitPlay: function() {
    //    this.game.world.setBounds(0, 0, MoonMage.config.viewport.width, MoonMage.config.viewport.height);
    //    this.state.start('MainMenu');
    //},

    //_toggleFullScreen: function() {
    //    if (this.game.scale.isFullScreen) {
    //        this.game.scale.stopFullScreen();
    //    }
    //    else {
    //        this.game.scale.startFullScreen(false);
    //    }
    //}
}

MoonMage.entities.ui.TextBox = function (game, text, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 0;
    this.text = text;

    this._setupBox();

}

MoonMage.entities.ui.TextBox.prototype = {
    _setupBox() {
        var constants = {
            X_PADDING: 30,
            Y_PADDING: 5,
        };
        var centerX = this.x;
        var centerY = this.y;
        var style = { font: '28px Arial', fill: '#000000', align: 'left' };
        var text = this.game.add.text(0, 0, this.text, style);
 
        var textBoxGraphics = this.game.add.graphics(0, 0);
        textBoxGraphics.beginFill(0xFFFFFF, 1);
        textBoxGraphics.lineStyle(2, 0x000000);
        textBoxGraphics.drawRoundedRect(
            0,
            0,
            text._width + constants.X_PADDING * 2,
            text._height + constants.Y_PADDING * 2,
            2
        );

        var textBoxTexture = textBoxGraphics.generateTexture();
        textBoxGraphics.destroy();

        this.textBox = this.game.add.sprite(
            this.x,
            this.y,
            textBoxTexture
        );

        this.textBox.addChild(text);

        text.x += constants.X_PADDING;
        text.y += constants.Y_PADDING + 3;

        //this.textBox.anchor.set(0.5, 0.5);
    },
}
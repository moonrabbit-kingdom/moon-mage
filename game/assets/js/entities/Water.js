MoonMage.entities.Water = function(game) {
    this.game = game;
    this.constants = {
        HEIGHT_OFFSET: 520,
        OFFSCREEN_OVERFLOW: 10
    }

    var waterBasin = this.game.add.graphics(0, 0);
    waterBasin.beginFill(0x0033FF, 1);
    waterBasin.drawRect(
        -this.constants.OFFSCREEN_OVERFLOW,
        this.constants.HEIGHT_OFFSET,
        this.game._width + this.constants.OFFSCREEN_OVERFLOW * 2,
        this.game._height + this.constants.OFFSCREEN_OVERFLOW);

    var waterBasinTexture = waterBasin.generateTexture();
    waterBasin.destroy();

    // TODO figure out why we need to position so weirdly
    this.sprite = game.add.sprite(
        this.game._width/2, 
        this.game._height/2 + this.constants.HEIGHT_OFFSET, 
        waterBasinTexture);
    this.sprite.anchor.set(0.5);
};

MoonMage.entities.Water.prototype = {};
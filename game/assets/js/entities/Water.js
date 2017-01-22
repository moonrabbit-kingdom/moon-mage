MoonMage.entities.Water = function(game) {
    this.game = game;
    this.constants = {
        HEIGHT_OFFSET: 520,
        OFFSCREEN_OVERFLOW: 10,
        MAX_WAVE_HEIGHT: 300,
        WAVE_WIDTH: 120,
        COLOR: 0x0033FF
    };

    this.createWaterBasin();
    this.createWavePolygon();
};

MoonMage.entities.Water.prototype = {
    createWaterBasin() {
        var waterBasinGraphics = this.game.add.graphics(0, 0);
        waterBasinGraphics.beginFill(this.constants.COLOR, 1);
        waterBasinGraphics.drawRect(
            -this.constants.OFFSCREEN_OVERFLOW,
            this.constants.HEIGHT_OFFSET,
            this.game._width + this.constants.OFFSCREEN_OVERFLOW * 2,
            this.game._height + this.constants.OFFSCREEN_OVERFLOW);

        var waterBasinTexture = waterBasinGraphics.generateTexture();
        waterBasinGraphics.destroy();

        this.waterBasinSprite = this.game.add.sprite(
            0,
            this.constants.HEIGHT_OFFSET,
            waterBasinTexture
        );

        this.waterBasinSprite.anchor.set(0);
    },

    createWavePolygon() {
        var wavePoly = new Phaser.Polygon([
            new Phaser.Point(0, this.constants.MAX_WAVE_HEIGHT),
            new Phaser.Point(this.constants.WAVE_WIDTH * 1/4, 0),
            new Phaser.Point(this.constants.WAVE_WIDTH * 3/4, 0),
            new Phaser.Point(this.constants.WAVE_WIDTH, this.constants.MAX_WAVE_HEIGHT)
        ]);

        var waveGraphics = this.game.add.graphics(0, 0);

        waveGraphics.beginFill(this.constants.COLOR);
        waveGraphics.drawPolygon(wavePoly.points);

        var waveTexture = waveGraphics.generateTexture();
        waveGraphics.destroy();

        this.waveSprite = this.game.add.sprite(
            0,
            this.constants.HEIGHT_OFFSET - 10,
            waveTexture
        );

        this.waveSprite.height = 10;

        this.waveSprite.anchor.set(0);
    },

    update: function(level) {
        var moonX = level.moon.getX();
        var moonStrength = level.moon.getStrength();

        this.waveSprite.height = this.constants.MAX_WAVE_HEIGHT * moonStrength;
        this.waveSprite.position.x = moonX - this.constants.WAVE_WIDTH / 2;
        this.waveSprite.position.y = this.constants.HEIGHT_OFFSET - this.waveSprite.height;
    }
};
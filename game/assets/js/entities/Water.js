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
    this.createWaveSprite();
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

        this.game.physics.arcade.enable(this.waterBasinSprite);
        this.waterBasinSprite.body.immovable = true;
        this.waterBasinSprite.anchor.set(0);


        // waterBasinGraphics.boundsPadding = 0;
        // this.waterBasinSprite = this.game.add.sprite(0, 0);
        // this.waterBasinSprite.addChild(waterBasinGraphics);
        // this.game.physics.arcade.enable(this.waterBasinSprite);
    },

    createWaveSprite() {
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
            this.constants.HEIGHT_OFFSET,
            waveTexture
        );

        this.waveSprite.height = 10;

        this.game.physics.arcade.enable(this.waveSprite);
        this.waveSprite.anchor.set(1);
    },

    update: function(level) {
        var moonX = level.moon.getX();
        var moonStrength = level.moon.getStrength();

        var moonVelocity = level.moon.getVelocity();

        // this.waveSprite.height = this.constants.MAX_WAVE_HEIGHT * moonStrength;
        this.waveSprite.scale.y = (level.moon.getY() - level.moon.getRangeY()) / level.moon.getRangeY() * 1.4;
        this.waveSprite.body.velocity.x = moonVelocity.x * 55;
    }
};

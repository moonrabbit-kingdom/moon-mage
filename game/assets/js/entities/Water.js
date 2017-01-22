MoonMage.entities.Water = function(game, level) {
    this.game = game;
    this.constants = {
        HEIGHT_OFFSET: 520,
        OFFSCREEN_OVERFLOW: 10,
        MAX_WAVE_HEIGHT: 300,
        WAVE_WIDTH: 120,
        COLOR: 0x0033FF,
        COLOR_HIGHLIGHT: 0x2577FF,
        RIPPLE_VARIANCE: 10
    };

    this._createWave(level);
    this._createElaborateWaterBasin();
};

MoonMage.entities.Water.prototype = {
    /**
     * To be used if the elaborate water basin is too costly in performance
     */
    _createWaterBasin() {
        var waterBasinGraphics = this.game.add.graphics(0, 0);
        waterBasinGraphics.beginFill(this.constants.COLOR, 1);
        waterBasinGraphics.drawRect(
            -this.constants.OFFSCREEN_OVERFLOW,
            this.constants.HEIGHT_OFFSET,
            this.game.world.bounds.width + this.constants.OFFSCREEN_OVERFLOW * 2,
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
    },

    _createElaborateWaterBasin() {
        this.points = [
            [MoonMage.config.viewport.width, this.constants.HEIGHT_OFFSET],
            [MoonMage.config.viewport.width, MoonMage.config.viewport.height],
            [-this.constants.OFFSCREEN_OVERFLOW, MoonMage.config.viewport.height],
            [-this.constants.OFFSCREEN_OVERFLOW, this.constants.HEIGHT_OFFSET]
        ];

        for (var i = 0; i < MoonMage.config.viewport.width; i += 32) {
            this.points.push([i, this.constants.HEIGHT_OFFSET]);
        }

        this.mod = {
            y: -this.constants.RIPPLE_VARIANCE/2
        };

        this.game.add.tween(this.mod).to( { y: this.constants.RIPPLE_VARIANCE/2}, 1000, Phaser.Easing.Sinusoidal.InOut, true, 1, -1, true);

        this.elaborateGraphics = this.game.add.graphics(0, 0);

        // Create Physics
        var waterBasinGraphics = this.game.add.graphics(0, 0);
        waterBasinGraphics.beginFill(this.constants.COLOR, 0); // clear
        waterBasinGraphics.drawRect(
            -this.constants.OFFSCREEN_OVERFLOW,
            this.constants.HEIGHT_OFFSET + 10,
            this.game.world.bounds.width + this.constants.OFFSCREEN_OVERFLOW * 2,
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
    },

    _updateElaborateWaterBasin() {
        this.elaborateGraphics.clear();

        this.elaborateGraphics.lineStyle(2, this.constants.COLOR_HIGHLIGHT);
        this.elaborateGraphics.beginFill(this.constants.COLOR);
        this.elaborateGraphics.moveTo(this.points[0][0] + this.game.camera.x, this.points[0][1]);
        this.elaborateGraphics.lineTo(this.points[1][0] + this.game.camera.x, this.points[1][1]);

        var mod = Math.round(this.mod.y);
        var i = 0;
        for(; i < 4; i++) {
            this.elaborateGraphics.lineTo(this.points[i][0] + this.game.camera.x, this.points[i][1] + mod);
        }
        for(; i < this.points.length - 1; i++) {
            var x = this.points[i][0] + this.game.camera.x;
            if (i%2 === 0) {
                this.elaborateGraphics.lineTo(x, this.points[i][1] + mod);
            } else {
                this.elaborateGraphics.lineTo(x, this.points[i][1] - mod);
            }
        }

        this.elaborateGraphics.endFill();
    },

    _createWaveSprite(level) {
        var wavePoly = new Phaser.Polygon([
            new Phaser.Point(0, this.constants.MAX_WAVE_HEIGHT),
            new Phaser.Point(this.constants.WAVE_WIDTH * 1/4, 0),
            new Phaser.Point(this.constants.WAVE_WIDTH * 3/4, 0),
            new Phaser.Point(this.constants.WAVE_WIDTH, this.constants.MAX_WAVE_HEIGHT)
        ]);

        var waveGraphics = this.game.add.graphics(0, 0);
        waveGraphics.lineStyle(2, this.constants.COLOR_HIGHLIGHT);

        waveGraphics.beginFill(this.constants.COLOR);
        waveGraphics.drawPolygon(wavePoly.points);

        var waveTexture = waveGraphics.generateTexture();
        waveGraphics.destroy();

        this.waveSprite = this.game.add.sprite(
            0,
            this.constants.HEIGHT_OFFSET + this.constants.RIPPLE_VARIANCE,
            waveTexture
        );

        this.waveSprite.height = 10;
        this.waveSprite.mass = 6000;

        this.game.physics.arcade.enable(this.waveSprite);
        this.waveSprite.anchor.set(1);
        this.waveSprite.x = level.moon.getX();
    },

    _updateWaveSprite(level) {
        if (!level.moon.isBeingControlled) {
            this.waveSprite.x = level.moon.getX() + 50;
        } else {
            var moonStrength = level.moon.getStrength();
            var moonVelocity = level.moon.getVelocity();

            this.waveSprite.body.velocity.x = moonVelocity.x * 60;
        }
        // this.waveSprite.height = this.constants.MAX_WAVE_HEIGHT * moonStrength;
        this.waveSprite.scale.y = Math.max((level.moon.getY() - level.moon.getRangeY()) / level.moon.getRangeY() * 1.4, 0);
    },

    _createWave(level) {
        // create visual
        this._createWaveSprite(level);
        // create physics
    },

    _updateWave() {
        // update visual (scale, etc)
        // update physics
    },

    update: function(level) {
        this._updateElaborateWaterBasin();
        this._updateWaveSprite(level);
    }
};

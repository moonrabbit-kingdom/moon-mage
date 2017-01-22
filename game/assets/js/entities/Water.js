MoonMage.entities.Water = function(game, level) {
    this.game = game;
    this.constants = {
        HEIGHT_OFFSET: 470,
        OFFSCREEN_OVERFLOW: 15,
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
        var beyondScreenY = MoonMage.config.viewport.height + this.constants.HEIGHT_OFFSET;
        this.points = [
            [MoonMage.config.viewport.width, this.constants.HEIGHT_OFFSET],
            [MoonMage.config.viewport.width, beyondScreenY],
            [-this.constants.OFFSCREEN_OVERFLOW, beyondScreenY],
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
        waterBasinGraphics.beginFill(this.constants.COLOR, 0.5); // clear
        waterBasinGraphics.drawRect(
            -this.constants.OFFSCREEN_OVERFLOW,
            this.constants.HEIGHT_OFFSET + 10,
            this.game.world.bounds.width + this.constants.OFFSCREEN_OVERFLOW * 2,
            90);

        var waterBasinTexture = waterBasinGraphics.generateTexture();
        waterBasinGraphics.destroy();

        this.waterBasinSprite = this.game.add.sprite(
            this.game.world.bounds.width / 2,
            this.constants.HEIGHT_OFFSET + 50,
            waterBasinTexture
        );

        this.game.physics.p2.enable(this.waterBasinSprite);
        this.waterBasinSprite.body.kinematic = true;

        this.waterBasinSprite.body.updateCollisionMask();
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
            if (i % 2 === 0) {
                this.elaborateGraphics.lineTo(x, this.points[i][1] + mod);
            } else {
                this.elaborateGraphics.lineTo(x, this.points[i][1] - mod);
            }
        }

        this.elaborateGraphics.endFill();
    },

    _createWave(level) {
        // create visual
        this._createWaveSprite(level);
        // create physics
        this._createWavePhysics(level);
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

        this.game.physics.arcade.enable(this.waveSprite);
        this.waveSprite.anchor.set(1);
        this.waveSprite.x = level.moon.getX();
    },

    _createWavePhysics(level) {
        var wavePhysicsGraphics = this.game.add.graphics(0, 0);
        if (MoonMage.config.debug.wavePhysics) {
            wavePhysicsGraphics.lineStyle(2, 0xFF0000);
        }

        wavePhysicsGraphics.beginFill(0xFF0000, 0);
        var minX = this.constants.WAVE_WIDTH * 1/4;
        var width = this.constants.WAVE_WIDTH * 2/4;
        wavePhysicsGraphics.drawRect(
            minX,
            0,
            width,
            this.constants.MAX_WAVE_HEIGHT
        );

        var wavePhysicsTexture = wavePhysicsGraphics.generateTexture();
        wavePhysicsGraphics.destroy();

        this.wavePhysicsSprite = this.game.add.sprite(
            level.moon.getX(),
            this.constants.HEIGHT_OFFSET,
            wavePhysicsTexture
        );

        this.game.physics.p2.enable(this.wavePhysicsSprite);
        this.wavePhysicsSprite.body.fixedRotation = true;
        this.wavePhysicsSprite.body.offset.setTo(this.constants.WAVE_WIDTH * 1/4, -this.constants.MAX_WAVE_HEIGHT/2);
    },

    _updateWave(level) {
        // update physics
        this._updateWavePhysics(level);
        // update visual (scale, etc)
        this._updateWaveSprite(level);
    },

    _updateWavePhysics(level) {
        var desiredX = level.moon.position.x - 30; // woah oah it's magic
        var desiredY = this.constants.HEIGHT_OFFSET + this.constants.RIPPLE_VARIANCE + 40;

        if (level.moon.isBeingControlled) {
            desiredY = this._mapMoonY(level.moon);
        }

        var desiredVelocity = getVelocityToPoint(
            desiredX,
            desiredY,
            this.wavePhysicsSprite.position.x,
            this.wavePhysicsSprite.position.y,
            180
        );

        // distance threshold dampens middle wobbling
        var distanceThreshold = 2.7;
        var xDiff = Math.abs(this.wavePhysicsSprite.position.x - desiredX)
        var yDiff = Math.abs(this.wavePhysicsSprite.position.y - desiredY)
        var xNotMovingMuch = xDiff < distanceThreshold;
        var yNotMovingMuch = yDiff < distanceThreshold;

        if (xNotMovingMuch && level.moon.isStopped) {
            desiredVelocity.x = 0;
        }

        if (yNotMovingMuch && level.moon.isStopped && level.moon.isBeingControlled) {
            desiredVelocity.y = 0;
        }

        // dampens top specifically
        if (level.moon.isBeingControlled && this.wavePhysicsSprite.position.y < 260 &&
            level.moon.position.y === level.moon.maxY) {
            desiredVelocity.y = 0;
        }


        this.wavePhysicsSprite.body.velocity.x = desiredVelocity.x;
        this.wavePhysicsSprite.body.velocity.y = desiredVelocity.y;
    },

    _mapMoonY(moon) {
        var moonY = moon.position.y;
        var moonMinY = moon.getMinY();
        var moonRangeY = moon.getRangeY();
        var waveMinY = 260;
        var waveRangeY = 270;

        var scalar = (moonY - moonMinY) / moonRangeY;
        var mappedY = waveMinY + (waveRangeY * (1 - scalar));

        return mappedY;
    },

    _updateWaveSprite() {
        this.waveSprite.position.x = this.wavePhysicsSprite.position.x + this.constants.WAVE_WIDTH * 3/4;

        var baseY = this.constants.HEIGHT_OFFSET + this.constants.RIPPLE_VARIANCE;
        var physicsY = this.wavePhysicsSprite.position.y;
        var rangeY = this.constants.MAX_WAVE_HEIGHT;
        this.waveSprite.scale.y = (baseY - physicsY) / rangeY;
    },

    update: function(level) {
        this._updateElaborateWaterBasin();
        this._updateWave(level);
    }
};

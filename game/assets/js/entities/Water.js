MoonMage.entities.Water = function(game, level) {
    this.game = game;
    this.level = level;
    this.constants = {
        HEIGHT_OFFSET: 470,
        OFFSCREEN_OVERFLOW: 15,
        MAX_WAVE_HEIGHT: 300,
        WAVE_WIDTH: 120,
        COLOR: 0x0033FF,
        COLOR_HIGHLIGHT: 0x2577FF,
        RIPPLE_VARIANCE: 10,
        WAVE_POINT_RHYTHM: 32
    };

    this._createWavePhysics(level);
    this._createElaborateWaterBasin(level);

    this.isControlled = false;
    this.cursors = this.game.input.keyboard.createCursorKeys();
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

    _createElaborateWaterBasin(level) {
        var beyondScreenY = MoonMage.config.viewport.height + this.constants.HEIGHT_OFFSET;
        this.points = [
            [MoonMage.config.viewport.width, this.constants.HEIGHT_OFFSET],
            [MoonMage.config.viewport.width, beyondScreenY],
            [-this.constants.OFFSCREEN_OVERFLOW, beyondScreenY],
            [-this.constants.OFFSCREEN_OVERFLOW, this.constants.HEIGHT_OFFSET]
        ];

        for (var i = 0; i < MoonMage.config.viewport.width; i += this.constants.WAVE_POINT_RHYTHM) {
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

        this.waterBasinSprite.body.setCollisionGroup(level.physicsController.waterCollisionGroup);
        this.waterBasinSprite.body.collides([level.physicsController.boxCollisionGroup]);
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

        var waveLeft = this.wavePhysicsSprite.position.x - this.game.camera.x;
        var waveTop = Math.min(this.wavePhysicsSprite.y - this.constants.MAX_WAVE_HEIGHT/2 - this.constants.RIPPLE_VARIANCE, this.constants.HEIGHT_OFFSET);
        var halfTop = Math.min(this.wavePhysicsSprite.y - this.constants.MAX_WAVE_HEIGHT/2, this.constants.HEIGHT_OFFSET);
        var leftIndex = Math.round(waveLeft / this.constants.WAVE_POINT_RHYTHM + 4);

        for(; i < this.points.length - 1; i++) {
            var x = this.points[i][0] + this.game.camera.x;

            if (i === leftIndex) {
                this.elaborateGraphics.lineTo(x, waveTop);
            } else if (i === leftIndex - 1) {
                this.elaborateGraphics.lineTo(x, waveTop);
            } else if (i === leftIndex + 1) {
                this.elaborateGraphics.lineTo(x, waveTop);
            } else if (i % 2 === 0) {
                this.elaborateGraphics.lineTo(x, this.constants.HEIGHT_OFFSET + mod);
            } else {
                this.elaborateGraphics.lineTo(x, this.constants.HEIGHT_OFFSET - mod);
            }
        }

        this.elaborateGraphics.endFill();
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
            0,
            this.constants.HEIGHT_OFFSET,
            wavePhysicsTexture
        );

        this.game.physics.p2.enable(this.wavePhysicsSprite);
        this.wavePhysicsSprite.body.fixedRotation = true;
        this.wavePhysicsSprite.body.kinematic = true;
        this.wavePhysicsSprite.body.setCollisionGroup(level.physicsController.waterCollisionGroup);
        this.wavePhysicsSprite.body.collides([level.physicsController.boxCollisionGroup]);

        // new this.game.physics.p2.BodyDebug(this.game, this.water.wavePhysicsSprite.body);
        // Phaser.Physics.P2.BodyDebug(this.game, this.water.wavePhysicsSprite.body);

        // this.wavePhysicsSprite.body.offset.setTo(this.constants.WAVE_WIDTH * 1/4, -this.constants.MAX_WAVE_HEIGHT/2);
        this.wavePhysicsSprite.body.y = this.constants.HEIGHT_OFFSET + this.constants.MAX_WAVE_HEIGHT/2 + this.constants.RIPPLE_VARIANCE;
        this.wavePhysicsSprite.body.x += this.constants.WAVE_WIDTH * 1/4;
    },

    _updateWave(level) {
        // update physics
        this._updateWavePhysics(level);
    },

    setControl(isControlled) {
        this.isControlled = isControlled;
    },

    _getMovementIntent() {
        var intent = {
            x: 0,
            y: 0
        };

        if (this.cursors.up.isDown) {
            intent.y--
        }
        if (this.cursors.down.isDown) {
            intent.y++
        }
        if (this.cursors.left.isDown) {
            intent.x--
        }
        if (this.cursors.right.isDown) {
            intent.x++
        }

        return intent;
    },

    _updateWavePhysics() {
        if (this.isControlled) {
            var intent = this._getMovementIntent();

            this.wavePhysicsSprite.body.velocity.x = 100 * intent.x;
            this.wavePhysicsSprite.body.velocity.y = 100 * intent.y;
        } else {
            var desiredX = 250 + this.game.camera.x;
            var desiredY = this.constants.HEIGHT_OFFSET + this.constants.MAX_WAVE_HEIGHT + this.constants.RIPPLE_VARIANCE + 40;

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

            if (xNotMovingMuch) {
                desiredVelocity.x = 0;
            }
            if (yNotMovingMuch) {
                desiredVelocity.y = 0;
            }

            this.wavePhysicsSprite.body.velocity.x = desiredVelocity.x;
            this.wavePhysicsSprite.body.velocity.y = desiredVelocity.y;
        }

        this.wavePhysicsSprite.body.x = Math.min(Math.max(this.wavePhysicsSprite.body.x, this.game.camera.x), this.game.camera.x + MoonMage.config.viewport.width);
        this.wavePhysicsSprite.body.y = Math.max(Math.min(this.wavePhysicsSprite.body.y, MoonMage.config.viewport.height + this.constants.MAX_WAVE_HEIGHT/2), 350);
    },

    update: function(level) {
        this._updateWave(level);
        this._updateElaborateWaterBasin();
    }
};

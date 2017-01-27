MoonMage.states.Level2 = function(game) {
    MoonMage.debug('stateHooks', 'Level1.constructor');
    this.game = game;
    this.player;
    this.platformGroup;
    this.levelID = 'level1';
};

MoonMage.states.Level2.prototype = {
    preload: function() {
        MoonMage.debug('stateHooks', 'Level1.preload');
        this.game.load.tilemap(this.levelID, 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.json('level1Objects', 'assets/levels/level1.json');

        this.game.load.audio('background-music', 'assets/audio/background-music.mp3');
    },

    create: function() {
        MoonMage.debug('stateHooks', 'Level1.create');

        // create physics
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);

        this.game.physics.p2.gravity.y = 350;
        this.game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        this.game.physics.p2.world.setGlobalStiffness(1e5);

        var spritesCollisionGroup = this.physics.p2.createCollisionGroup();
        var tilesCollisionGroup = this.physics.p2.createCollisionGroup();
        var boxCollisionGroup = this.physics.p2.createCollisionGroup();
        var waterCollisionGroup = this.physics.p2.createCollisionGroup();

        // load the tilemap and create the ground and moveable boxes
        this.levelController = new MoonMage.controllers.LevelController(this.game, 'level1');
        this.game.world.setBounds(0, 0, this.levelController.map.widthInPixels, 562);

        this.levelController.createGround('Tile Layer 1',
            tilesCollisionGroup,
            [spritesCollisionGroup, boxCollisionGroup])

        this.levelController.createBoxes('level1Objects',
            boxCollisionGroup,
            [spritesCollisionGroup, tilesCollisionGroup, waterCollisionGroup, boxCollisionGroup])

        this.moon = new MoonMage.entities.Moon(this.game);

        this.water = new MoonMage.entities.Water(this.game, this);

        this.water.waterBasinSprite.body.setCollisionGroup(waterCollisionGroup);
        this.water.waterBasinSprite.body.collides([boxCollisionGroup]);
        this.water.wavePhysicsSprite.body.setCollisionGroup(waterCollisionGroup);
        this.water.wavePhysicsSprite.body.collides([boxCollisionGroup]);
        // new this.game.physics.p2.BodyDebug(this.game, this.water.wavePhysicsSprite.body);
        // Phaser.Physics.P2.BodyDebug(this.game, this.water.wavePhysicsSprite.body);

        this.player = new MoonMage.entities.player(this.game, this.moon, this.water, 32, this.game.world.height - 300);

        // copypast
        this.game.physics.p2.enable('dude', false);
        this.player.sprite.body.setCollisionGroup(spritesCollisionGroup);
        this.player.sprite.body.collides(tilesCollisionGroup, this.testCollide);
        this.player.sprite.body.collides(boxCollisionGroup);

        // create text instructions
        var firstText = new MoonMage.entities.ui.TextBox(this.game, "'↑' to jump", 500, 80, 250);
        var secondText = new MoonMage.entities.ui.TextBox(this.game, "hold 'space' to invoke moon powers", 1500, 80, 700);

        this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

        this.pauseBox = new MoonMage.entities.ui.PauseBox(this.game, this.state);
        this.pauseLastPressed = new Date().getTime();

        this.sound = this.game.add.audio('background-music');
        this.game.sound.setDecodedCallback([this.sound], function() {
            this.sound.loopFull(0.6);
        }, this);
    },

    update: function() {
        if (!this.pauseBox.isPaused()) {
            this.player.update();
            this.water.update(this);
            this.moon.update(this.water.wavePhysicsSprite.position.x);

            if (this._shouldTogglePause()) {
                this.pauseBox.openPauseMenu(this._onPause.bind(this));
            }
        } else {
            if (this._shouldTogglePause()) {
                this.pauseBox.closePauseMenu(this._onResume.bind(this));
            }
        }

        if (this.player.sprite.position.x > this.game.world.width - 64) {
            this.sound.pause();
            this.game.world.setBounds(0, 0, MoonMage.config.viewport.width, MoonMage.config.viewport.height);
            this.state.start('WinGame');
        }
    },

    _shouldTogglePause() {
        if (!this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
            return false;
        }

        var newTime = new Date().getTime();

        if ((newTime - this.pauseLastPressed) > 300) {
            this.pauseLastPressed = newTime;
            return true;
        }

        return false;
    },

    _onPause() {
        this.game.physics.p2.paused = true;
        this.player.pause();
    },

    _onResume() {
        this.game.physics.p2.paused = false;
        this.player.unpause();
    }
}

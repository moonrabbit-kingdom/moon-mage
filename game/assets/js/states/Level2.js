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

        this.physicsController = new MoonMage.controllers.PhysicsController(this.game);

        // load the tilemap and create the ground and moveable boxes
        this.levelController = new MoonMage.controllers.LevelController(this.game, this);
        this.game.world.setBounds(0, 0, this.levelController.map.widthInPixels, 562);

        this.levelController.createGround('Tile Layer 1');

        // create text instructions
        var firstText = new MoonMage.entities.ui.TextBox(this.game, "→", 80, 380);
        var firstText = new MoonMage.entities.ui.TextBox(this.game, "↑", 535, 380);
        var secondText = new MoonMage.entities.ui.TextBox(this.game, "'space'  &  ← ↑ →", 1300, 380);

        this.levelController.createBoxes('level1Objects');

        this.moon = new MoonMage.entities.Moon(this.game);

        this.water = new MoonMage.entities.Water(this.game, this);

        this.player = new MoonMage.entities.player(this.game, this, 32, this.game.world.height - 300, this._onPlayerDeath.bind(this));
        this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

        //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
        //  those 2 materials collide it uses the following settings.
        //  A single material can be used by as many different sprites as you like.
        var contactMaterial = this.game.physics.p2.createContactMaterial(this.water.waveMaterial, this.levelController.boxMaterial);

        contactMaterial.friction = 100;     // Friction to use in the contact of these two materials.
        contactMaterial.restitution = 0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
        contactMaterial.stiffness = 1e7;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
        contactMaterial.relaxation = 3;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
        contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
        contactMaterial.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
        contactMaterial.surfaceVelocity = 0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right

        // swaps the order in the world group. position determines z order
        this.game.world.swap(this.player.sprite, this.moon.moonRender);

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

    _onPlayerDeath() {
        this.state.start('Level2');
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

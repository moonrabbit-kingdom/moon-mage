MoonMage.states.Level2 = function(game) {
    MoonMage.debug('stateHooks', 'Level1.constructor');
    this.game = game;
    this.player;
    this.platformGroup;
};

MoonMage.states.Level2.prototype = {
    preload: function() {
        MoonMage.debug('stateHooks', 'Level1.preload');

    },

    create: function() {
        MoonMage.debug('stateHooks', 'Level1.create');

        // load the tilemap and create the ground and moveable "diamonds"
        var levelController = new MoonMage.controllers.LevelController(this.game, 'level1');

        this.map = levelController.loadTileMap();
        this.game.world.setBounds(0, 0, this.map.widthInPixels, 562);
        this.groundLayer = levelController.createGround(this.map, 'Tile Layer 1');

        this.moon = new MoonMage.entities.Moon(this.game);

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);


        this.game.physics.p2.gravity.y = 350;
        this.game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        this.game.physics.p2.world.setGlobalStiffness(1e5);

        var spritesCollisionGroup = this.physics.p2.createCollisionGroup();
        var tilesCollisionGroup = this.physics.p2.createCollisionGroup();
        var boxCollisionGroup = this.physics.p2.createCollisionGroup();
        var waterCollisionGroup = this.physics.p2.createCollisionGroup();

        this.water = new MoonMage.entities.Water(this.game, this);

        this.water.waterBasinSprite.body.setCollisionGroup(waterCollisionGroup);
        this.water.waterBasinSprite.body.collides([boxCollisionGroup]);
        this.water.wavePhysicsSprite.body.setCollisionGroup(waterCollisionGroup);
        this.water.wavePhysicsSprite.body.collides([boxCollisionGroup]);
        // new this.game.physics.p2.BodyDebug(this.game, this.water.wavePhysicsSprite.body);
        // Phaser.Physics.P2.BodyDebug(this.game, this.water.wavePhysicsSprite.body);

        this.player = new MoonMage.entities.player(this.game, this.moon, /* 1430 */ 32, this.game.world.height - 300);

        // copypast
        this.game.physics.p2.enable('dude', false);
        this.player.sprite.body.setCollisionGroup(spritesCollisionGroup);
        this.player.sprite.body.collides(tilesCollisionGroup, this.testCollide);
        this.player.sprite.body.collides(boxCollisionGroup);

       // map.setCollisionBetween(1, 12, true, layer2);
        var tileObjects = this.physics.p2.convertTilemap(this.map, 'Tile Layer 1');

        for (var i = 0; i < tileObjects.length; i++) {
            var tileBody = tileObjects[i];
            tileBody.setCollisionGroup(tilesCollisionGroup);
            tileBody.collides([spritesCollisionGroup, boxCollisionGroup]);
        }

        var objects = this.game.cache.getJSON('level1Objects').layers[1].objects;

        var boxes = this.game.add.group();

        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            var box = boxes.create(object.x, object.y, 'box');
            this.game.physics.p2.enable(box, false);
            box.body.setRectangle(64, 64, 0, 0);
            box.body.fixedRotation = true;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides([spritesCollisionGroup,
                               tilesCollisionGroup,
                               waterCollisionGroup,
                               boxCollisionGroup]);
        };


        var firstText = new MoonMage.entities.ui.TextBox(this.game, "'↑' to jump", 500, 80, 250);

        var secondText = new MoonMage.entities.ui.TextBox(this.game, "hold 'a' to invoke moon powers", 1500, 80, 600);
        //this.game.add.text(100, 100,
        //this.game.add.text(400, 100,
        //this.game.add.text(600, 100, "notice the moon");

        this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

        this.pauseBox = new MoonMage.entities.ui.PauseBox(this.game, this.state);
        this.pauseLastPressed = new Date().getTime();
    },

    update: function() {
        if (!this.pauseBox.isPaused()) {
            this.player.update();
            this.moon.update();
            this.water.update(this);

            if (this._shouldTogglePause()) {
                this.game.physics.p2.paused = true;
                this.player.pause();
                this.pauseBox.openPauseMenu();
            }
        } else {
            if (this._shouldTogglePause()) {
                this.game.physics.p2.paused = false;
                this.player.unpause();
                this.pauseBox.closePauseMenu();
            }
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
    }
}

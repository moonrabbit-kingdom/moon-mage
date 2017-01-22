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
        this.boxes = levelController.createBoxes(this.map, 'Object Layer 1', 'box');

        //this.moon = new MoonMage.entities.Moon(this.game);

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);


        this.game.physics.p2.gravity.y = 350;
        this.game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        this.game.physics.p2.world.setGlobalStiffness(1e5);

        var spritesCollisionGroup = this.physics.p2.createCollisionGroup();
        var tilesCollisionGroup = this.physics.p2.createCollisionGroup();
        var boxCollisionGroup = this.physics.p2.createCollisionGroup();

        this.game.physics.p2.updateBoundsCollisionGroup(false);

        this.player = new MoonMage.entities.player(this.game, this.moon, 1430, this.game.world.height - 300);
        // copypast
        this.game.physics.p2.enable('dude', false);
        this.player.sprite.body.setCollisionGroup(spritesCollisionGroup);
        this.player.sprite.body.collides(tilesCollisionGroup);
        this.player.sprite.body.collides(boxCollisionGroup);

       // map.setCollisionBetween(1, 12, true, layer2);
        var tileObjects = this.physics.p2.convertTilemap(map, 'Tile Layer 1');

        for (var i = 0; i < tileObjects.length; i++) {
            var tileBody = tileObjects[i];
            tileBody.setCollisionGroup(tilesCollisionGroup);
            tileBody.collides(spritesCollisionGroup);
        }

        //this.boxes.forEach(function (box) {
        //    //box.enableBody = true;
        //    //box.physicsBodyType = Phaser.Physics.P2JS;
        //    box.body.setCollisionGroup(boxCollisionGroup);
        //    box.body.collides([spritesCollisionGroup, tilesCollisionGroup]);
        //});

        //var ship = this.add.sprite(200, 200, 'ship');
        //this.physics.p2.enable(ship, false);
        //ship.body.setCollisionGroup(spritesCollisionGroup);
        //ship.body.collides(tilesCollisionGroup);


        //this.game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);
        //var groundPlayerCM = this.game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { friction: 0.0 });

        //this.water = new MoonMage.entities.Water(this.game, this);

        this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

        //this._createPauseMenu();
    },

    update: function() {
        this.player.update();
    },
}

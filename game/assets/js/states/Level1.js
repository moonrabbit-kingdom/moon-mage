MoonMage.states.Level1 = function(game) {
    console.log('Level1.construct');
    this.game = game;
    this.player;
    this.platformGroup;
};

MoonMage.states.Level1.prototype = {
    preload: function() {},

    create: function() {


        // load the tilemap and create the ground and moveable "diamonds"
        var levelController = new MoonMage.controllers.LevelController(this.game, 'level1');

        this.map = levelController.loadTileMap();
        this.game.world.setBounds(0, 0, this.map.widthInPixels, 562);
        this.groundLayer = levelController.createGround(this.map, 'Tile Layer 1');
        this.boxes = levelController.createBoxes(this.map, 'Object Layer 1', 'diamond');

        this.water = new MoonMage.entities.Water(this.game);

        this.moon = new MoonMage.entities.Moon(this.game);

        this.player = new MoonMage.entities.player(this.game, this.moon, 32, this.game.world.height - 300);
        this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

    },

    pushBoxes: function (player, star) {
        console.log(player, star);
        return true;
    },

    update: function() {
        var hitPlatform = this.game.physics.arcade.collide(this.player.sprite, this.groundLayer);
        this.game.physics.arcade.collide(this.boxes, this.groundLayer);
        this.game.physics.arcade.collide(this.player.sprite, this.boxes);

        // this.game.physics.arcade.collide(this.water.wavePhysics, this.player.sprite);
        this.game.physics.arcade.collide(this.water.waterBasinSprite, this.boxes);
        this.game.physics.arcade.collide(this.water.waveSprite, this.boxes, function() {
            console.log('wave sprite hit boxes');
            return true;
        });
        this.game.physics.arcade.collide(this.water.wavePhysics, this.boxes, function() {
            console.log('wave physics hit boxes');
            return true;
        });
        this.game.physics.arcade.collide(this.water.wavePhysics, this.player.sprite, function() {
            console.log('wave hit player');
        });

        this.player.update(hitPlatform);
        this.moon.update();
        this.water.update(this);
    },
}

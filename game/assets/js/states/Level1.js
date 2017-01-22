MoonMage.states.Level1 = function(game) {
    console.log('Level1.construct');
    this.game = game;
    this.player;
    this.platformGroup;
};

MoonMage.states.Level1.prototype = {
    preload: function() {},

    create: function() {

        this.water = new MoonMage.entities.Water(this.game);

        this.moon = new MoonMage.entities.Moon(this.game);

        // load the tilemap and create the ground and moveable "diamonds"
        var levelController = new MoonMage.controllers.LevelController(this.game, 'level1');

        this.map = levelController.loadTileMap();
        this.groundLayer = levelController.createGround(this.map, 'Tile Layer 1');
        this.createBoxes = levelController.createBoxes(this.map, 'Object Layer 1', 'diamond');

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = new MoonMage.entities.player(this.game, 32, this.game.world.height - 300);
    },

    update: function() {
        var hitPlatform = this.game.physics.arcade.collide(this.player.sprite, this.groundLayer);

        this.player.update(hitPlatform);
        this.moon.update();
        this.water.update(this);
    },
}

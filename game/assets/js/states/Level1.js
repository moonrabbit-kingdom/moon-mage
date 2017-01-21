MoonMage.states.Level1 = function(game) {
    console.log('Level1.construct');
    this.game = game;

    this.player;
    this.platformGroup;
};

MoonMage.states.Level1.prototype = {
    preload: function() {
        console.log('Level1.preload');
    },

    create: function() {
        console.log('Level1.create');
        this.buildWorld();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.player = new MoonMage.entities.player(this.game);

        this.water = new MoonMage.entities.Water(this.game);
    },

    buildWorld: function () {
        this.platformGroup = this.add.group();
        this.platformGroup.enableBody = true;

        // draw platforms
        for (var i = 0; i < 10; i++) {

            var platform = this.platformGroup.create(i * 32, this.game.world.height - 64);

            this.game.add.sprite(i * 32, this.game.world.height - 64, 'platform');
            //  This stops it from falling away when you jump on it
            platform.body.immovable = true;
        }
    },

    update: function() {
        var hitPlatform = this.game.physics.arcade.collide(this.player.sprite, this.platformGroup);

        this.player.update(hitPlatform);
        this.water.update();
    },
}

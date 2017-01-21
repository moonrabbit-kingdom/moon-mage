MoonMage.Level1 = function(game) {
    console.log('Level1.construct');
    this.game = game;

    this.player;
    this.platformGroup;
};

MoonMage.Level1.prototype = {
    preload: function() {
        console.log('Level1.preload');
    },

    create: function() {
        console.log('Level1.create');
        this.buildWorld();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // The player and its settings
        this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
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
        var hitPlatform = this.game.physics.arcade.collide(this.player, this.platformGroup);
        console.log('hitPlatform', hitPlatform);
    },



}

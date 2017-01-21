var MoonMage = {};

MoonMage.Boot = function(game) {
    console.log('Boot.construct');
    this.game = game;
};

MoonMage.Boot.prototype = {
    preload: function() {
        console.log('Boot.preload', this.game);
        this.game.load.image('logo', 'phaser.png');

    },

    create: function() {
        console.log('Boot.create');
        this.scale.minWidth = 1000;
        this.scale.minHeight = 562;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.stage.backgroundColor = '#171642';

        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);

        this.state.start('Preloader');
    }
}

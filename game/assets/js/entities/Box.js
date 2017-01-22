MoonMage.entities.Box = function (game, x, y, spriteName) {
    Phaser.Sprite.call(this, game, x, y, spriteName);

    game.physics.arcade.enable(this);
    this.body.gravity.y = 600;
    this.body.drag.x = 300;
    this.mass = 150;
}

MoonMage.entities.Box.prototype = Object.create(Phaser.Sprite.prototype);
MoonMage.entities.Box.prototype.constructor = MoonMage.entities.Box;

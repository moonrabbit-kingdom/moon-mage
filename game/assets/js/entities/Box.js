MoonMage.entities.Box = function (game, x, y, spriteName) {
    Phaser.Sprite.call(this, game, x, y, spriteName);

    game.physics.arcade.enable(this);
    this.body.gravity.y = 600;
}

MoonMage.entities.Box.prototype = Object.create(Phaser.Sprite.prototype);
MoonMage.entities.Box.prototype.constructor = MoonMage.entities.Box;

MoonMage.entities.Box.prototype.update = function () {
   if (this.body.y < (this.game.height - 50)) {
       //console.log (this.body.y);
   }
}

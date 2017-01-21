MoonMage.entities.Moon = function(game) {
    this.game = game;

    // TODO replace with sprite
    this.moonRender = this.game.add.graphics(0, 0);

    this.moonRender.beginFill(0xBBBBBB, 1);
    this.moonRender.drawCircle(300, 300, 100);
};

MoonMage.entities.Moon.prototype = {
    update: function() {
        // debugger;
        // this.game.physics.arcade.moveToPointer(this.moonRender, 100);
    }
};
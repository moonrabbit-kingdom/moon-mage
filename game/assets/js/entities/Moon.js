MoonMage.entities.Moon = function(game) {
    this.game = game;

    this.defaultX = 300;
    this.defaultY = 60;

    this.moonRender = this.game.add.sprite(this.defaultX, this.defaultY, "moon");
    this.halfWidth = this.moonRender.width / 2;
};

MoonMage.entities.Moon.prototype = {
    update: function(x) {
        this.moonRender.position.x = x - this.halfWidth;
    }
};

MoonMage.entities.Water = function(game) {
    this.game = game;
    this.constants = {
        HEIGHT_OFFSET: 520,
        OFFSCREEN_OVERFLOW: 10,
        VERTEX_RHYTHM: 32
    }
    this.points = [];

    var totalWidth = this.game._width + this.constants.OFFSCREEN_OVERFLOW * 2;
    var totalHeight = this.game._height + this.constants.OFFSCREEN_OVERFLOW;

    for (var i = 0; i < totalWidth; i += this.constants.VERTEX_RHYTHM) {
        this.points.push([
            i,
            this.constants.HEIGHT_OFFSET
        ]);
    }

    this.points.push([totalWidth, this.constants.HEIGHT_OFFSET]); // add point at the width
    this.points.push([totalWidth, totalHeight]); // bottom right corner
    this.points.push([-this.constants.OFFSCREEN_OVERFLOW, totalHeight]); // bottom left corner

    this.graphics = this.game.add.graphics(-this.constants.OFFSCREEN_OVERFLOW, 0);
};

MoonMage.entities.Water.prototype = {
    update: function() {
        this.graphics.beginFill(0x0033FF, 0.4);
        this.graphics.lineStyle(4, 0xd9d9FF, 1);

        this.graphics.moveTo(this.points[0][0],this.points[0][1]);

        for(var i = 1; i < this.points.length; i++) {
            this.graphics.lineTo(this.points[i][0], this.points[i][1]);
        }

        this.graphics.endFill();
    }
};
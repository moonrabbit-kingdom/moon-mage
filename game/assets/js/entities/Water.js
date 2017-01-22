MoonMage.entities.Water = function(game) {
    this.game = game;
    this.constants = {
        HEIGHT_OFFSET: 520,
        OFFSCREEN_OVERFLOW: 10,
        VERTEX_RHYTHM: 32,
        WATER_VARIATION: 6
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

    // this.info = this.game.add.text(32, 32, 'Value', { font: "24px Arial", fill: "#ffffff", align: "center" });

    // TODO commenting out water movement until we know phaser enough to optimize
    // this.waterMorph = {min: 0, max: 0};
    // this.game.add.tween(this.waterMorph).to({max: this.constants.WATER_VARIATION}, 1000, Phaser.Easing.Linear.None , true, 0, -1, true);
};

MoonMage.entities.Water.prototype = {
    update: function() {
        // this.info.text = Math.round(this.waterMorph.max);

        this.draw();
    },

    draw: function() {
        this.graphics.beginFill(0x0033FF, 0.4);
        this.graphics.lineStyle(4, 0xd9d9FF, 1);

        this.graphics.moveTo(this.points[0][0],this.points[0][1]);


        // var change = -this.constants.WATER_VARIATION/2 + this.waterMorph.max;

        for(var i = 1; i < this.points.length; i++) {
            // TODO commenting out water movement until we know phaser enough to optimize
            // if (i < this.points.length - 4) {
            //     this.points[i][1] = this.constants.HEIGHT_OFFSET + ((i%2 === 0 ? -1 : 1) * change);
            // }
            this.graphics.lineTo(this.points[i][0], this.points[i][1]);
        }

        this.graphics.endFill();
    }
};
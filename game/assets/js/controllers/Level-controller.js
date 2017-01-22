MoonMage.controllers.LevelController = function (game, level) {
    this.game = game;
    this.level = level;
}

MoonMage.controllers.LevelController.prototype = {
    loadTileMap: function () {
        map = this.game.add.tilemap(this.level, 32, 32);
        map.addTilesetImage('ground');

        return map;
    },

    createGround: function (map, layerName) {
        var groundLayer = map.createLayer(layerName);
        map.setCollisionBetween(1, 100, true, layerName);

        return groundLayer;
    },

    createBoxes: function (map, layerName) {
        var groundLayer = map.createLayer(layerName);
        //boxes.enableBody = true;
        //boxes.enableBody = true;
        //boxes.physicsBodyType = Phaser.Physics.P2JS;


        //layerName, // layer name in json
        //2, // gid
        //spriteName, //
        //1, // frame
        //true,
        //false,
        //boxes, // group name
        //MoonMage.entities.Box); // custom class
    }
}

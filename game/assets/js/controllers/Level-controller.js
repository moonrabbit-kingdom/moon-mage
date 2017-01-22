MoonMage.controllers.LevelController = function (game, level) {
    this.game = game;
    this.level = level;
}

MoonMage.controllers.LevelController.prototype = {
    loadTileMap: function () {
        console.log(this.game);
        map = this.game.add.tilemap(this.level, 32, 32);
        map.addTilesetImage('background');

        return map;
    },

    createGround: function (map, layerName) {
        var groundLayer = map.createLayer(layerName);
        map.setCollisionBetween(1, 100, true, layerName);

        return groundLayer;
    },

    createBoxes: function (map, layerName, spriteName) {
        var boxes = this.game.add.group();
        boxes.enableBody = true;
        map.createFromObjects(layerName, // layer name in json
                              3, // gid
                              spriteName, //
                              null,
                              true,
                              false,
                              boxes, // group name
                              MoonMage.entities.Box); // custom class

        return boxes;
    }
}

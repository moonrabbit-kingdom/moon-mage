MoonMage.controllers.LevelController = function (game, level) {
    this.game = game;
    this.level = level;
    this.map = this.game.add.tilemap(this.level, 32, 32);
    this.map.addTilesetImage('ground');
}

MoonMage.controllers.LevelController.prototype = {
    loadTileMap: function () {
    },

    createGround: function (layerName, tilesCollisionGroup, collides) {
        // draws the img
        this.map.createLayer(layerName);
        // adds collision to the img
        this.map.setCollisionBetween(1, 100, true, layerName);

        var tileObjects = this.game.physics.p2.convertTilemap(this.map, layerName);
        for (var i = 0; i < tileObjects.length; i++) {
            var tileBody = tileObjects[i];
            tileBody.setCollisionGroup(tilesCollisionGroup);
            tileBody.collides(collides);
        }

        return tileObjects;
    },

    createBoxes: function (jsonCachedFile, boxCollisionGroup, collides) {
        var objects = this.game.cache.getJSON(jsonCachedFile).layers[1].objects;
        var boxes = this.game.add.group();
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            var box = boxes.create(object.x, object.y, 'box');
            this.game.physics.p2.enable(box, false);
            box.body.setRectangle(64, 64, 0, 0);
            box.body.fixedRotation = true;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(collides);
        };
        return boxes;
    }
}

MoonMage.controllers.LevelController = function (game, levelID) {
    this.game = game;
    this.tileObjects;
    this.boxes = this.game.add.group();

    this.levelID = levelID;
    this.map = this.game.add.tilemap(this.levelID, 32, 32);
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

        this.tileObjects = this.game.physics.p2.convertTilemap(this.map, layerName);
        for (var i = 0; i < this.tileObjects.length; i++) {
            var tileBody = this.tileObjects[i];
            tileBody.setCollisionGroup(tilesCollisionGroup);
            tileBody.collides(collides);
        }

        return this.tileObjects;
    },

    addPhysics: function (physicsController) {
    },

    createBoxes: function (jsonCachedFile, boxCollisionGroup, collides) {
        var objects = this.game.cache.getJSON(jsonCachedFile).layers[1].objects;
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            var box = this.boxes.create(object.x, object.y, 'box');
            this.game.physics.p2.enable(box, false);
            box.body.setRectangle(64, 64, 0, 0);
            box.body.fixedRotation = true;
            box.body.setCollisionGroup(boxCollisionGroup);
            box.body.collides(collides);
        };
        return this.boxes;
    }
}

MoonMage.controllers.LevelController = function (game, level) {
    this.game = game;
    this.tileObjects;
    this.boxes = this.game.add.group();

    this.level = level;
    this.map = this.game.add.tilemap(this.level.levelID, 32, 32);
    this.map.addTilesetImage('ground');
}

MoonMage.controllers.LevelController.prototype = {

    createGround: function (layerName) {
        // draws the img
        this.map.createLayer(layerName);
        // adds collision to the img
        this.map.setCollisionBetween(1, 100, true, layerName);

        this.tileObjects = this.game.physics.p2.convertTilemap(this.map, layerName);
        for (var i = 0; i < this.tileObjects.length; i++) {
            var tileBody = this.tileObjects[i];
            tileBody.setCollisionGroup(this.level.physicsController.tilesCollisionGroup);
            tileBody.collides([this.level.physicsController.spritesCollisionGroup,
                               this.level.physicsController.boxCollisionGroup])
        }

        return this.tileObjects;
    },

    createBoxes: function (jsonCachedFile, boxCollisionGroup, collides) {
        var objects = this.game.cache.getJSON(jsonCachedFile).layers[1].objects;

        this.boxMaterial = this.game.physics.p2.createMaterial("boxMaterial");

        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            var box = this.boxes.create(object.x, object.y, 'box');
            this.game.physics.p2.enable(box, false);
            box.body.setRectangle(64, 64, 0, 0);
            box.body.fixedRotation = true;
            box.body.setCollisionGroup(this.level.physicsController.boxCollisionGroup);
            box.body.collides([this.level.physicsController.spritesCollisionGroup,
                               this.level.physicsController.tilesCollisionGroup,
                               this.level.physicsController.waterCollisionGroup,
                               this.level.physicsController.boxCollisionGroup]);

           box.body.data.mass = 1;
           //box.groundVelocity = new Phaser.Point();

           box.body.setMaterial(this.boxMaterial);
        };
        return this.boxes;
    }
}

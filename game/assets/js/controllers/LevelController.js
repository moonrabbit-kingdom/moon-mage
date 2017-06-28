var LevelController = function (game, level, tilemapPath, tileLayerName) {
  this.game = game;

  this.level = level;

  this.tilemapID = this.level.levelID + '_tilemap';
  this.jsonID = this.level.levelID + '_objects';
  this.tilemapPath = tilemapPath;
  this.tileLayerName = tileLayerName;
};

LevelController.prototype = {
  preload: function () {
    this.game.load.tilemap(this.tilemapID, this.tilemapPath, null, Phaser.Tilemap.TILED_JSON);
    this.game.load.json(this.jsonID, this.tilemapPath);
  },

  createGround: function () {
    this.map = this.game.add.tilemap(this.tilemapID, 32, 32);
    this.map.addTilesetImage('ground');
    // draws the img
    this.map.createLayer(this.tileLayerName);
    // adds collision to the img
    this.map.setCollisionBetween(1, 100, true, this.tileLayerName);

    this.tileObjects = this.game.physics.p2.convertTilemap(this.map, this.tileLayerName);
    for (var i = 0; i < this.tileObjects.length; i++) {
      var tileBody = this.tileObjects[i];
      tileBody.setCollisionGroup(this.level.physicsController.tilesCollisionGroup);
      tileBody.collides([this.level.physicsController.spritesCollisionGroup,
        this.level.physicsController.boxCollisionGroup]);
    }

    return this.tileObjects;
  },

  createBoxes: function () {
    var objects = this.game.cache.getJSON(this.jsonID).layers[1].objects;

    this.boxMaterial = this.game.physics.p2.createMaterial('boxMaterial');

    this.boxes = this.game.add.group();
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
      // box.groundVelocity = new Phaser.Point();

      box.body.setMaterial(this.boxMaterial);
    }
    return this.boxes;
  }
};

export default LevelController;

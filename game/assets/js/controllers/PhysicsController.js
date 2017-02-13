MoonMage.controllers.PhysicsController = function (game) {
    this.game = game;
    // create physics
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.game.physics.p2.setImpactEvents(true);

    this.game.physics.p2.gravity.y = 350;
    this.game.physics.p2.world.defaultContactMaterial.friction = 0.5;
    this.game.physics.p2.world.setGlobalStiffness(1e5);

    this.spritesCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.tilesCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.boxCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.waterCollisionGroup = this.game.physics.p2.createCollisionGroup();
}

//MoonMage.controllers.PhysicsController.prototype = {
//}

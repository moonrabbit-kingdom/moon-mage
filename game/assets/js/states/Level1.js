MoonMage.states.Level1 = function(game) {
    MoonMage.debug('stateHooks', 'Level1.constructor');
    this.game = game;
    this.player;
    this.platformGroup;
};

MoonMage.states.Level1.prototype = {
    preload: function() {
        MoonMage.debug('stateHooks', 'Level1.preload');

        this._loadPauseMenu();
    },

    _loadPauseMenu: function() {
        this.game.load.image('pause-menu-box', 'assets/img/pause-menu/box.png');
        this.game.load.image('pause-caret', 'assets/img/pause-menu/caret.png');
        this.game.load.image('pause-continue', 'assets/img/pause-menu/continue.png');
        this.game.load.image('pause-exit', 'assets/img/pause-menu/exit.png');
    },

    create: function() {
        MoonMage.debug('stateHooks', 'Level1.create');

        // todo:
        // crystal should interact with physics when 'riding' on the wave
        // wave shouldn't vibrase
        // wave shouldn't launch crystal and person up
        // player shouldn't fall through crystal
        // player stops riding when crystal is jumpy

        // d wave doesn't go down until released

        // load the tilemap and create the ground and moveable "diamonds"
        var levelController = new MoonMage.controllers.LevelController(this.game, 'level1');

        this.map = levelController.loadTileMap();
        this.game.world.setBounds(0, 0, this.map.widthInPixels, 562);
        this.groundLayer = levelController.createGround(this.map, 'Tile Layer 1');
        this.boxes = levelController.createBoxes(this.map, 'Object Layer 1', 'box');

        this.moon = new MoonMage.entities.Moon(this.game);

        this.water = new MoonMage.entities.Water(this.game, this);

        this.player = new MoonMage.entities.player(this.game, this.moon, 1522, this.game.world.height - 300);
        this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

        this.pauseBox = new MoonMage.entities.ui.PauseBox(this.game, this.state);
    },

    onCollideWaterBox: function (water, box) {
        //console.log(water, box);
    },

    onCollideBoxGround: function (box, ground) {
        if (ground.faceLeft || ground.faceRight) {
            box.body.position = box.body.prev;
            box.body.velocity.x = 0;
        }
    },

    update: function() {
        var hitPlatform = this.game.physics.arcade.collide(this.player.sprite, this.groundLayer);
        this.game.physics.arcade.collide(this.boxes, this.groundLayer, this.onCollideBoxGround);
        this.game.physics.arcade.collide(this.player.sprite, this.boxes, this.player.toRide.bind(this.player));

        // this.game.physics.arcade.collide(this.water.wavePhysics, this.player.sprite);
        this.game.physics.arcade.collide(this.water.waterBasinSprite, this.boxes, this.onCollideWaterBox);
        // this.game.physics.arcade.collide(this.water.waveSprite, this.boxes);
        // this.game.physics.arcade.collide(this.water.wavePhysics, this.boxes);
        // this.game.physics.arcade.collide(this.water.wavePhysics, this.player.sprite);
        this.game.physics.arcade.collide(this.water.wavePhysicsSprite, this.boxes);

        if (!this.pauseBox.isPaused()) {
            this.player.update(hitPlatform);
            this.moon.update();
            this.water.update(this);

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
                this.game.physics.arcade.isPaused = true;
                this.player.pause();
                this.pauseBox.openPauseMenu();
            }
        } else {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
                this.game.physics.arcade.isPaused = false;
                this.player.unpause();
                this.pauseBox.closePauseMenu();
            }
        }

    },
}

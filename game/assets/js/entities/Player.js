MoonMage.entities.player = function (game, moon, startingX, startingY) {
    this.game = game;
    this.moon = moon;

    this.startingX = startingX;
    this.startingY = startingY;

    // The player and its settings
    this.sprite = this.game.add.sprite(this.startingX, this.startingY, 'dude');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(this.sprite);

    //  Player physics properties. Give the little guy a slight bounce.
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 600;
    //this.sprite.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);

    // controls
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.isDown = {
        left: false,
        right: false
    };

    this.moonControlToggleThrottle = new Date().getTime() // throttle

    this.isControllingMoon = false;
}

MoonMage.entities.player.prototype = {
    update: function (hitPlatform) {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.isControllingMoon = true;
            this.stopMoving();
            this.moon.setMoonControl(true);
        } else {
            this.isControllingMoon = false;
            this.moon.setMoonControl(false);
        }

        if (!this.isControllingMoon) {
            this.handleControllingPlayer();
        }
        // else -> Moon control handled by moon

        this.checkIfDead();
    },

    handleControllingPlayer: function() {
        this.handleHorizontalMovement();

        //  Allow the sprite to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.sprite.body.blocked.down) {
            this.sprite.body.velocity.y = -300;
        }
    },

    handleHorizontalMovement: function() {
        var newRightIsDown = this.cursors.right.isDown
        var newLeftIsDown = !newRightIsDown && this.cursors.left.isDown;

        if (newRightIsDown && !this.isDown.right) {
            this.startMoveRight();
        } else if (newLeftIsDown && !this.isDown.left) {
            this.startMoveLeft();
        } else if (!newRightIsDown && !newLeftIsDown) {
            this.stopMoving();
        }
    },

    stopMoving: function() {
        this.sprite.body.velocity.x = 0;

        this.sprite.animations.stop();

        this.sprite.frame = 4;

        this.isDown.left = false;
        this.isDown.right = false;
    },

    startMoveLeft: function() {
        this.sprite.body.velocity.x = -150;

        this.sprite.animations.play('left');

        this.isDown.left = true;
    },

    startMoveRight: function() {
        this.sprite.body.velocity.x = 150;

        this.sprite.animations.play('right');

        this.isDown.right = true;
    },

    checkIfDead: function() {
        if(this.sprite.body.y > this.game.world.height ||
           this.sprite.body.x < 0) this.respawn();
    },

    respawn: function() {
        this.stopMoving();
        this.sprite.body.x = this.startingX;
        this.sprite.body.y = this.startingY;
    }
}

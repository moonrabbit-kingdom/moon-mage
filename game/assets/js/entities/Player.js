MoonMage.entities.player = function (game, moon, water, startingX, startingY) {
    this.game = game;
    this.moon = moon;
    this.water = water;
    this.ridingOn = null;
    this.intendedVelocity = 0;
    this.ridingVelocity = 0;

    this.startingX = startingX;
    this.startingY = startingY;

    // The player and its settings
    this.sprite = this.game.add.sprite(this.startingX, this.startingY, 'dude');

    //  We need to enable physics on the player
    this.game.physics.p2.enable(this.sprite);
    //this.game.physics.arcade.enable(this.sprite);

    ////  Player physics properties. Give the little guy a slight bounce.
    //this.sprite.body.bounce.y = 0.2;
    //this.sprite.body.gravity.y = 600;
    //this.sprite.mass = 1;
    //this.sprite.body.collideWorldBounds = true;

    this.sprite.body.fixedRotation = true;
    this.sprite.body.damping = 0.5;

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

        this.ridingVelocity = 0;
        if (this.ridingOn !== null) {
            this.ridingVelocity = this.ridingOn.body.velocity.x;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
           this.isControllingMoon = true;
           this.stopMoving();
        //    this.moon.setMoonControl(true);
            this.water.setControl(true);
        } else {
           this.isControllingMoon = false;
        //    this.moon.setMoonControl(false);
            this.water.setControl(false);
        }

        if (!this.isControllingMoon) {
            this.handleControllingPlayer();
        }
        // else -> Moon control handled by moon

        var newVelocity = this.intendedVelocity + this.ridingVelocity;
        if (newVelocity < 0) {
            this.sprite.body.moveLeft(-newVelocity);
        } else {
            this.sprite.body.moveRight(newVelocity);
        }
        this.checkIfDead();
    },

    handleControllingPlayer: function() {
        this.handleHorizontalMovement();

        //  Allow the sprite to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.checkIfCanJump()) {
            this.sprite.body.velocity.y = -300;
            this.ridingOn = null;
        }

    },

    checkIfCanJump: function() {
        var result = false;
        var yAxis = p2.vec2.fromValues(0, 1);
        for (var i=0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++)
        {
            var c = this.game.physics.p2.world.narrowphase.contactEquations[i];

            if (c.bodyA === this.sprite.body.data || c.bodyB === this.sprite.body.data)
            {
                var d = p2.vec2.dot(c.normalA, yAxis);

                if (c.bodyA === this.sprite.body.data)
                {
                    d *= -1;
                }

                if (d > 0.5)
                {
                    result = true;
                }
            }
        }
        return result;
    },

    handleHorizontalMovement: function() {
        //if (this.sprite.body.blocked.left || this.sprite.body.blocked.right) {
        //    this.ridingOn = null;
        //}

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
        this.sprite.animations.stop();

        this.sprite.frame = 4;

        this.isDown.left = false;
        this.isDown.right = false;

        this.intendedVelocity = 0;
    },

    startMoveLeft: function() {
        this.sprite.animations.play('left');
        this.isDown.left = true;

        this.intendedVelocity = -150;
    },

    startMoveRight: function() {
        this.sprite.animations.play('right');
        this.isDown.right = true;

        this.intendedVelocity = 150;
    },

    pause: function() {
        this.sprite.animations.paused = true;
        this.stopMoving();
    },

    unpause: function() {
        this.sprite.animations.paused = false;
    },

    checkIfDead: function() {
        if(this.sprite.body.y > this.game.world.height ||
           this.sprite.body.x < 0) this.respawn();
    },

    toRide: function (player, box) {
        if (this.sprite.body.touching.down) {
            this.ridingOn = box;
        }
    },

    respawn: function() {
        this.stopMoving();
        this.sprite.body.x = this.startingX;
        this.sprite.body.y = this.startingY;
    }
}

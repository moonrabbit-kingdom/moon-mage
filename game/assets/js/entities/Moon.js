MoonMage.entities.Moon = function(game) {
    this.game = game;

    // TODO replace with sprite
    this.defaultX = 300;
    this.defaultY = 60;
    this.moonRender = this.game.add.graphics(this.defaultX, this.defaultY);

    this.moonRender.beginFill(0xBBBBBB, 1);
    this.moonRender.drawCircle(0, 0, 100);

    this.pointer = this.game.input.activePointer;
    this.speed = 3;
    this.distanceThreshold = 2.7;
    this.maxY = 160;
    this.minY = 60;
    this.rangeY = this.maxY - this.minY;
    this.maxX = this.game._width - 60;
    this.minX = 60;

    this.position = this.moonRender.position;

    this.oldPointerX = this.pointer.worldX;
    this.oldPointerY = this.pointer.worldY;

    this.velocity = {
        x: 0,
        y: 0
    };

    this.isBeingControlled = false; // TODO set to false by default when play toggles control
};

MoonMage.entities.Moon.prototype = {
    update: function() {
        if (this.isBeingControlled) {
            this.handleControlledMovement();
        } else {
            this.handleUncontrolledMovement();
        }
    },

    setVelocityToPoint(destinationX, destinationY) {
        var angle = Math.atan2(destinationY - this.position.y, destinationX - this.position.x);

        this.velocity.x = Math.cos(angle) * this.speed;
        this.velocity.y = Math.sin(angle) * this.speed;
    },

    applyVelocity(destinationX, destinationY) {
        if (Math.abs(this.position.x - destinationX) > this.distanceThreshold
            || Math.abs(this.position.y - destinationY) > this.distanceThreshold) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.position.x = this.clamp(this.position.x, this.minX, this.maxX, 'x');
            this.position.y = this.clamp(this.position.y, this.minY, this.maxY , 'y');
        }
        else {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    },

    handleUncontrolledMovement() {
        this.setVelocityToPoint(this.defaultX, this.defaultY);
        this.applyVelocity(this.defaultX, this.defaultY);
    },

    handleControlledMovement() {
        var newPointerX = this.pointer.worldX;
        var newPointerY = this.pointer.worldY;

        // Check for changes in direction
        if (this.oldPointerX !== newPointerX || this.oldPointerY !== newPointerY) {
            this.setVelocityToPoint(this.pointer.worldX, this.pointer.worldY);

            this.oldPointerX = newPointerX;
            this.oldPointerY = newPointerY;
        }

        this.applyVelocity(this.pointer.worldX, this.pointer.worldY);
    },

    clamp(value, min, max, what) {
        return Math.max(Math.min(value, max), min);
    },

    getX() {
        return this.position.x;
    },

    getY() {
        return this.position.y;
    },

    getVelocity() {
        return {
            x: this.velocity.x,
            y: this.velocity.y
        }
    },

    getRangeY() {
        return this.rangeY;
    },

    /**
     * Returns a value 0 to 1 of the moons strength
     */
    getStrength() {
        return (this.position.y - this.minY) / this.rangeY;
    },

    toggleMoonControl() {
        this.isBeingControlled = !this.isBeingControlled;
    }
};
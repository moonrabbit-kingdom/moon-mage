MoonMage.entities.Moon = function(game) {
    this.game = game;

    // TODO replace with sprite
    this.defaultX = 300;
    this.defaultY = 60;
    //this.moonRender = this.game.add.graphics(this.defaultX, this.defaultY);

    //this.moonRender.beginFill(0xBBBBBB, 1);
    //this.moonRender.drawCircle(0, 0, 100);

    this.moonRender = this.game.add.sprite(this.defaultX, this.defaultY, "moon");

    // this.pointer = this.game.input.activePointer;
    // this.speed = 6;
    // this.distanceThreshold = 2.7;
    // this.maxY = 160;
    // this.minY = 60;
    // this.rangeY = this.maxY - this.minY;
    // this.maxRelativeX = this.game._width - 60;
    // this.minRelativeX = 60;
    // this.maxX = this._getMaxX();
    // this.minX = this._getMinX();
    // this.rangeX = this.maxRelativeX - this.minRelativeX;

    // this.position = this.moonRender.position;
    // this.isStopped = true;

    // this.oldPointerX = this.pointer.worldX;
    // this.oldPointerY = this.pointer.worldY;

    // this.velocity = {
    //     x: 0,
    //     y: 0
    // };

    // this.isBeingControlled = false; // TODO set to false by default when play toggles control
};

MoonMage.entities.Moon.prototype = {
    update: function(x) {
        this.moonRender.position.x = x;
        // if (this.isBeingControlled) {
        //     this.handleControlledMovement();
        // } else {
        //     this.handleUncontrolledMovement();
        // }
    },

    // setVelocityToPoint(destinationX, destinationY) {
    //     var velocity = getVelocityToPoint(destinationX, destinationY, this.position.x, this.position.y, this.speed);

    //     this.velocity.x = velocity.x;
    //     this.velocity.y = velocity.y;
    // },

    // applyVelocity(destinationX, destinationY) {
    //     if (Math.abs(this.position.x - destinationX) > this.distanceThreshold
    //         || Math.abs(this.position.y - destinationY) > this.distanceThreshold) {
    //         this.isStopped = false;
    //         this.position.x += this.velocity.x;
    //         this.position.y += this.velocity.y;
    //         this.position.x = this.clamp(this.position.x, this._getMinX(), this._getMaxX(), 'x');
    //         this.position.y = this.clamp(this.position.y, this.minY, this.maxY , 'y');
    //     }
    //     else {
    //         this.isStopped = true;
    //         this.velocity.x = 0;
    //         this.velocity.y = 0;
    //     }
    // },

    // handleUncontrolledMovement() {
    //     var returnToX = this.defaultX + this.game.camera.x;

    //     this.setVelocityToPoint(returnToX, this.defaultY);
    //     this.applyVelocity(returnToX, this.defaultY);
    // },

    // handleControlledMovement() {
    //     var newPointerX = this.pointer.worldX;
    //     var newPointerY = this.pointer.worldY;

    //     // Check for changes in direction
    //     if (this.oldPointerX !== newPointerX || this.oldPointerY !== newPointerY) {
    //         this.setVelocityToPoint(this.pointer.worldX, this.pointer.worldY);

    //         this.oldPointerX = newPointerX;
    //         this.oldPointerY = newPointerY;
    //     }

    //     this.applyVelocity(this.pointer.worldX, this.pointer.worldY);
    // },

    // clamp(value, min, max, what) {
    //     return Math.max(Math.min(value, max), min);
    // },

    // getX() {
    //     return this.position.x;
    // },

    // getY() {
    //     return this.position.y;
    // },

    // getVelocity() {
    //     return {
    //         x: this.velocity.x,
    //         y: this.velocity.y
    //     }
    // },

    // getMaxY() {
    //     return this.maxY;
    // },

    // getMinY() {
    //     return this.minY;
    // },

    // getRangeY() {
    //     return this.rangeY; // - this.moonRender.height;
    // },

    // _getMaxX: function() {
    //     return this.game.camera.x + this.maxRelativeX;
    // },

    // _getMinX: function() {
    //     return this.game.camera.x + this.minRelativeX;
    // },

    // getRangeX() {
    //     return this.rangeX;
    // },

    // /**
    //  * Returns a value 0 to 1 of the moons strength
    //  */
    // getStrength() {
    //     return (this.position.y - this.minY) / this.rangeY;
    // },

    // setMoonControl(isBeingControlled) {
    //     this.isBeingControlled = isBeingControlled;
    // }
};

MoonMage.entities.Moon = function(game) {
    this.game = game;

    // TODO replace with sprite
    this.moonRender = this.game.add.graphics(0, 0);

    this.moonRender.beginFill(0xBBBBBB, 1);
    this.moonRender.drawCircle(0, 0, 100);

    this.pointer = this.game.input.activePointer;
    this.speed = 3;
    this.threshold = 2.7;

    this.position = this.moonRender.position;

    this.oldPointerX = this.pointer.worldX;
    this.oldPointerY = this.pointer.worldY;

    this.xVelocity = 0;
    this.yVelocity = 0;

    this.isBeingControlled = false; // TODO set to false by default when play toggles control
};

MoonMage.entities.Moon.prototype = {
    update: function() {
        if (this.isBeingControlled) {
            this.handleControlledMovement();
        }
    },

    handleControlledMovement() {
        var newPointerX = this.pointer.worldX;
        var newPointerY = this.pointer.worldY;

        // Check for changes in direction
        if (this.oldPointerX !== newPointerX || this.oldPointerY !== newPointerY) {
            var angle = Math.atan2(this.pointer.worldY - this.position.y, this.pointer.worldX - this.position.x);

            this.xVelocity = Math.cos(angle) * this.speed;
            this.yVelocity = Math.sin(angle) * this.speed;

            this.oldPointerX = newPointerX;
            this.oldPointerY = newPointerY;
        }

        // Apply known velocity
        if (Math.abs(this.position.x - this.pointer.worldX) > this.threshold
            || Math.abs(this.position.y - this.pointer.worldY) > this.threshold) {
            this.position.x += this.xVelocity;
            this.position.y += this.yVelocity;
        }
    }
};
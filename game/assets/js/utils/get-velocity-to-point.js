var getVelocityToPoint = function(destinationX, destinationY, positionX, positionY, speed) {
    var angle = Math.atan2(destinationY - positionY, destinationX - positionX);

    speed = speed || 1;

    return {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
    };
}
MoonMage.debug = function(flag, message) {
    if (MoonMage.config.debug[flag]) {
        console.log(message);
    }
}
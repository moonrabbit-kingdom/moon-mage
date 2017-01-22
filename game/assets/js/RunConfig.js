MoonMage.config = {
    /**
     * Use quickboot to quickly jump into a state, simply provide a string with the
     * registered state name
     *
     * If none is provided the game will load into the MainMenu
     */
    startState: 'Level2',

    /**
     * Viewport dimensions
     */
    viewport: {
        height: 562,
        width: 1000
    },

    /**
     * Used in conjunction with MoonMage.debug to define channels to enable debugging on
     * When a flag is enabled, all debug prints on that channel will print to the console
     *
     * Some enable additional debugging features
     */
    debug: {
        stateHooks: false,
        wavePhysics: true, // bounding boxes, etc
        water: false
    }
};

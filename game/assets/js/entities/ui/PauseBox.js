import MoonMage from '../../MoonMage';

MoonMage.entities.ui.PauseBox = function (game, state) {
  this.game = game;
  this.state = state;

  // define fullscreen mode
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

  this._setupBox();
  this._setupButton(-60, -10, 'Continue', this.closePauseMenu);
  this._setupButton(-60, 40, 'Exit', this._exitPlay);
  this._setupButton(-60, 90, 'Fullscreen', this._toggleFullScreen);

  this.pauseBox.scale.set(0);

  this.pause = {
    tween: {},
    isPaused: false
  };
};

MoonMage.entities.ui.PauseBox.prototype = {
  _setupBox () {
    var centerX = this.game.camera.x + MoonMage.config.viewport.width / 2;
    var centerY = this.game.camera.y + MoonMage.config.viewport.height / 2;

    var pauseBoxGraphics = this.game.add.graphics(0, 0);
    pauseBoxGraphics.beginFill(0xFFFFFF, 1);
    pauseBoxGraphics.lineStyle(2, 0x000000);
    pauseBoxGraphics.drawRoundedRect(
      centerX,
      centerY,
      300,
      300,
      20
    );

    var pauseBoxTexture = pauseBoxGraphics.generateTexture();
    pauseBoxGraphics.destroy();

    this.pauseBox = this.game.add.sprite(
      centerX,
      centerY,
      pauseBoxTexture
    );

    var style = { font: '48px Arial', fill: '#000000', align: 'left' };
    var text = this.game.add.text(-80, -100, 'PAUSED', style);
    this.pauseBox.addChild(text);

    this.pauseBox.anchor.set(0.5, 0.5);
  },

  _setupButton (x, y, content, callback) {
    var button = this.game.add.button(x, y, null, callback, this);
    button.input.useHandCursor = true;

    var style = { font: '28px Arial', fill: '#000000', align: 'left' };
    var text = this.game.add.text(0, 0, content, style);
    button.addChild(text);

    this.pauseBox.addChild(button);
  },

  isPaused: function () {
    return this.pause.isPaused;
  },

  openPauseMenu: function () {
    this.pauseBox.position.x = this.game.camera.x + MoonMage.config.viewport.width / 2;
    this.pauseBox.position.y = this.game.camera.y + MoonMage.config.viewport.height / 2;

    var tween = this.pause.tween;

    if ((this.pop !== null && tween.isRunning) || this.pause.isPaused) {
      return;
    }

    this.pause.isPaused = true;
    this.pause.tween = this.game.add.tween(this.pauseBox.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.None, true);
  },

  closePauseMenu: function () {
    var tween = this.pause.tween;

    if ((tween && tween.isRunning) || !this.pause.isPaused) {
      return;
    }

    this.pause.isPaused = false;
    this.pause.tween = this.game.add.tween(this.pauseBox.scale).to({ x: 0, y: 0 }, 150, Phaser.Easing.Linear.None, true);
  },

  _exitPlay: function () {
    this.game.world.setBounds(0, 0, MoonMage.config.viewport.width, MoonMage.config.viewport.height);
    this.state.start('MainMenu');
  },

  _toggleFullScreen: function () {
    if (this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen();
    } else {
      this.game.scale.startFullScreen(false);
    }
  }
};

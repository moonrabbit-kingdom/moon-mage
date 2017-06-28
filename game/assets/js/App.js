import MoonMage from './MoonMage';

// States
import Boot from './states/Boot';
import Preloader from './states/Preloader';
import MainMenu from './states/MainMenu';
import WinGame from './states/WinGame';
import PlayIntro from './states/PlayIntro';

// Levels
import Level from './states/Level1';

// Entities
import './entities/Player';
import './entities/Water';
import './entities/Moon';
import './entities/Box';
import './entities/ui/PauseBox';
import './entities/ui/TextBox';

window.onload = function() {
    var game = new Phaser.Game(MoonMage.config.viewport.width, MoonMage.config.viewport.height, Phaser.CANVAS, '');

    game.state.add('Boot', Boot);
    game.state.add('Preloader', Preloader);
    game.state.add('MainMenu', MainMenu);
    game.state.add('WinGame', WinGame);
    game.state.add('PlayIntro', PlayIntro);
    game.state.add('Level1', Level);

    game.state.start('Boot');
};

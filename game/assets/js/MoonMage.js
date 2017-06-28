import LevelController from './controllers/LevelController';
import PhysicsController from './controllers/PhysicsController';
import RunConfig from './RunConfig';

export default {
    states: {},
    entities: {
        ui: {}
    },
    controllers: {
      LevelController: LevelController,
      PhysicsController: PhysicsController
    },
    config: RunConfig,
    debug: function(flag, message) {
        if (this.config.debug[flag]) {
            console.log(message);
        }
    }
};

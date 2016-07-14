import Component from '../core/component';
import Game from '../systems/game';

export default class Player extends Component {
  init() {
    this.system = this.el.sceneEl.systems.game;
  }
}

Player.register();

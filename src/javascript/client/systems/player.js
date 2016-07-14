import System from '../core/system';

function setProperty(object, component, property, value) {
  if (object instanceof Array) {
    return object.forEach(o => setProperty(o, component, property, value));
  }
  object.components[component].data[property] = value;
}

export default class Player extends System {
  static State = {
    DEAD: 0,
    ALIVE: 1,
  }

  init() {
    this.player = document.querySelector('a-player');
    this.spawners = [...document.querySelectorAll('[spawner]')];

    this.sceneEl.addEventListener('loaded', () => {
      this.setAlive();
    });
  }

  setAlive() {
    setProperty(this.player, 'jumper', 'enabled', true);
    setProperty(this.spawners, 'spawner', 'enabled', true);
  }

  setDead() {
    setProperty(this.player, 'jumper', 'enabled', false);
    setProperty(this.spawners, 'spawner', 'enabled', false);
  }

  setWin() {

  }
}

Player.register();

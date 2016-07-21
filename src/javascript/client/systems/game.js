import System from '../core/system';

function setProperty(object, component, property, value) {
  if (object instanceof Array) {
    return object.forEach(o => setProperty(o, component, property, value));
  }
  const target = object.components[component];
  if (value === undefined) {
    target.data = property;
  }
  else {
    target.data[property] = value;
  }
}

const VEHICLE_SPEED = {
  tractor: 10,
  sedan: 20,
  train: 15,
  freighter: 30,
  racecar: 40,
};

const VEHICLE_FREQUENCY = {
  tractor: 6,
  sedan: 8,
  train: 10,
  freighter: 9,
  racecar: 7,
};

export default class Game extends System {
  static State = {
    INTRO: 0,
    READY: 1,
    ALIVE: 2,
    DEAD: 3,
    WIN: 4,
    INCREASE: 5,
    REPLAY: 6,
  }

  init() {
    this.hud = document.querySelector('a-hud');
    this.player = document.querySelector('a-player');
    this.spawners = Array.prototype.slice.call(document.querySelectorAll('[spawner]'), 0);
    this.vehicles = Array.prototype.slice.call(document.querySelectorAll('[vehicle]'), 0);

    this.level = 0;

    this.sceneEl.addEventListener('loaded', () => {
      setTimeout(() => this.setState(Game.State.INTRO), 10);
    });

    this.player.addEventListener('death', () => {
      this.setState(Game.State.DEAD);
    });

    this.player.addEventListener('goal-hit', () => {
      this.setState(Game.State.WIN);
    });

    this.winSound = document.getElementById("audio-win");
    this.winSound.volume = 0.2;
    this.loseSound = document.getElementById("audio-lose");
    this.loseSound.volume = 0.2;
    this.bgm = document.getElementById("audio-bgm");
    this.bgm.volume = 0.05;
    this.bgm.loop = true;
    this.bgm.play();
  }

  setState(state) {
    this.state = state;

    switch(state) {
      case Game.State.INTRO: {
        this.resetPlayer();
        this.setHud('#hud-intro');
        this.onNext(() => this.setState(Game.State.READY));
        break;
      }
      case Game.State.READY: {
        this.setHud('#hud-instructions');
        this.onNext(() => this.setState(Game.State.ALIVE));
        break;
      }
      case Game.State.ALIVE: {
        this.setHud(false);
        this.startGame();
        break;
      }
      case Game.State.DEAD: {
        this.setHud('#hud-dead');
        this.playLoseSound();
        this.stopGame();
        setTimeout(() => this.setState(Game.State.REPLAY), 3000);
        break;
      }
      case Game.State.WIN: {
        this.setHud('#hud-win');
        this.playWinSound();
        this.stopGame();
        this.level += 1;
        setTimeout(() => this.setState(Game.State.INCREASE), 3000);
        break;
      }
      case Game.State.INCREASE: {
        this.setHud('#hud-increase');
        this.level += 1;
        setTimeout(() => this.setState(Game.State.REPLAY), 3000);
        break;
      }
      case Game.State.REPLAY: {
        this.setHud('#hud-replay');
        this.stopGame();
        this.onNext(() => this.setState(Game.State.ALIVE));
        break;
      }
      default: {
        console.warn('Invalid game state: ', state);
      }
    }
  }

  onNext(callback) {
    const events = ['keyup:Space', 'touch:End'];
    const bindings = {};

    const removeEvents = () => {
      events.forEach(event => {
        this.player.removeEventListener(event, bindings[event]);
      });
    }

    events.forEach(event => {
      const binding = () => {
        removeEvents();
        callback();
      };
      bindings[event] = binding;
      this.player.addEventListener(event, binding);
    });
  }

  startGame() {
    this.setDifficulty(this.level);
    setProperty(this.player, 'jumper', 'enabled', true);
    setProperty(this.spawners, 'spawner', 'enabled', true);

    this.resetPlayer();
  }

  playWinSound() {
    this.winSound.play();
  }

  playLoseSound() {
    this.loseSound.play();
  }

  stopGame() {
    setProperty(this.player, 'jumper', 'enabled', false);
    setProperty(this.spawners, 'spawner', 'enabled', false);
    this.player.body.type = CANNON.Body.STATIC;
    this.player.components.jumper.isCharging = false;
  }

  setHud(src) {
    if (!src) return this.hud.setAttribute('visible', 'false');
    this.hud.setAttribute('src', src);
    this.hud.setAttribute('visible', 'true');
  }

  resetPlayer() {
    this.player.body.position.copy({x: 0, y: 1, z: 17});
    this.player.body.velocity.copy({x: 0, y: 0, z: 0});
    this.player.body.type = CANNON.Body.DYNAMIC;
  }

  setDifficulty(level) {
    const adjust = (1 + (0.1 * level));

    this.vehicles.forEach(vehicle => {
      const type = vehicle.id;
      const speed = VEHICLE_SPEED[type] * adjust;
      vehicle.setAttribute('vehicle', `speed: ${speed}`);
    });

    this.spawners.forEach(spawner => {
      const type = spawner.getAttribute('type');
      const frequency = VEHICLE_FREQUENCY[type] * 1000 / adjust;
      spawner.components.spawner.data.timeout = frequency;
    });
  }
}

Game.register();

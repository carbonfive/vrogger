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

export default class Game extends System {
  static State = {
    INTRO: 0,
    READY: 1,
    ALIVE: 2,
    DEAD: 3,
    WIN: 4,
    REPLAY: 5,
  }

  init() {
    this.hud = document.querySelector('a-hud');
    this.player = document.querySelector('a-player');
    this.spawners = Array.prototype.slice.call(document.querySelectorAll('[spawner]'), 0);

    this.sceneEl.addEventListener('loaded', () => {
      setTimeout(() => this.setState(Game.State.INTRO), 10);
    });

    this.player.addEventListener('vehicle-hit', () => {
      this.setState(Game.State.DEAD);
    });

    this.player.addEventListener('goal-hit', () => {
      this.setState(Game.State.WIN);
    });

    this.winSound = document.getElementById("audio-win");
    this.loseSound = document.getElementById("audio-lose");
    this.bgm = document.getElementById("audio-bgm");
    this.bgm.volume = 0.01;
    this.bgm.loop = true;
    this.bgm.play()
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
}

Game.register();

import Component from '../core/component';

export default class Jumper extends Component {
  static dependencies = ['velocity']

  init() {
    document.addEventListener('keydown', () => {
      const force = new THREE.Vector3(0, 0.1, 0);
      const velocity = this.getVector('velocity');
      velocity.add(force);
      this.el.setAttribute('velocity', velocity);
      console.log(velocity);
    });
  }
}

Jumper.register();

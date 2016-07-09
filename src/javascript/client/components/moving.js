import Component from '../core/component';

export default class Moving extends Component {
  static dependencies = ['static-body'];

  static schema = {
    speed: { default: 1 },
  }

  tick() {
    const direction = new THREE.Vector3(this.data.speed, 0, 0);
    direction.applyQuaternion(this.el.object3D.quaternion);

    const position = this.getVector('position');
    position.add(direction);
    this.el.setAttribute('position', position);

    if (Math.abs(this.el.object3D.position.x) > 50) {
      this.el.sceneEl.removeChild(this.el);
    }
  }
}

Moving.register();

import Component from '../core/component';

export default class Vehicle extends Component {
  static schema = {
    speed: { default: 1 },
  }

  init() {
    this.body = null;

    if (this.el.body) {
      this.initBody(this.el.body)
    }
    else {
      this.el.addEventListener('body-loaded', e => this.initBody(e.detail.body));
    }

    this.el.addEventListener('collide', e => this.onCollide(e));
  }

  initBody(body) {
    this.body = body;
  }

  tick() {
    if (!this.body) return;

    const quaternion = this.el.object3D.quaternion;
    const velocity = new THREE.Vector3;

    const front = (new THREE.Vector3(1, 0, 0)).applyQuaternion(quaternion);

    velocity.copy(this.body.velocity);
    velocity.applyQuaternion(quaternion.clone().conjugate());
    velocity.z = this.data.speed;
    velocity.applyQuaternion(quaternion);

    this.body.velocity.copy(velocity);

    if (Math.abs(this.body.position.x) > 50) {
      this.el.sceneEl.removeChild(this.el);
    }
  }

  onCollide(event) {
    const body = event.detail.body;

    if (body.mass == 0) return;

    body.el.emit('vehicle-hit', event);
  }
}

Vehicle.register();

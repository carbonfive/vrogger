import Component from '../core/component';

export default class Jumper extends Component {
  static dependencies = ['velocity', 'geometry']

  static schema = {
    using: { default: 'this' },
    startOn: { default: 'keydown:Space touch:Start' },
    stopOn: { default: 'keyup:Space touch:End' },
    min: { default: 1 },
    max: { default: 5 },
    chargingTime: { default: 3000 },
  }

  init() {
    this.timestamp = 0;
    this.charging = false;
    this.bindings = [];
    this.height = 0;

    this.registerEvents(this.data.startOn, e => this.chargeJump(e));
    this.registerEvents(this.data.stopOn, e => this.jump(e));

    this.el.addEventListener('body-loaded', e => this.bodyLoaded(e));
  }

  bodyLoaded(event) {
    this.body = event.detail.body;
    this.body.fixedRotation = true;
    this.body.updateMassProperties();
    const physics = this.el.sceneEl.systems.physics;
    physics.removeBody(this.body);
    physics.addBody(this.body);

    this.height = this.el.components['geometry'].data.height;
  }

  remove() {
    const events = this.data.startOn.split(' ').concat(this.data.stopOn.split(' '));
    events.forEach(event => document.removeEventListener(event, this.bindings[event]));
  }

  registerEvents(events, method) {
    events.split(' ').forEach(event => {
      this.bindings[event] = document.addEventListener(event, e => method(e));
    });
  }

  chargeJump() {
    if (this.charging) return;
    this.timestamp = event.timeStamp;
    this.charging = true;
  }

  jump(event) {
    this.charging = false;
    if (this.canJump() != true) return;

    const d = Math.min(event.timeStamp - this.timestamp, this.data.chargingTime);
    const p = (d / this.data.chargingTime);
    const power = p * (this.data.max - this.data.min) + this.data.min;

    const element = this.data.using == 'this' ? this.el : document.querySelector(this.data.using);
    const object = element.object3D;

    const force = new THREE.Vector3(0, 1000, 0);
    force.applyQuaternion(object.quaternion);
    force.multiplyScalar(power);

    const point = new CANNON.Vec3(0, 0, 0);
    this.body.applyLocalForce(force, point);
  }

  canJump() {
    const world = this.el.sceneEl.systems.physics.world;

    const from = new CANNON.Vec3;
    from.copy(this.body.position);

    const to = new CANNON.Vec3;
    to.copy(from);
    to.y -= (this.height / 2 + 0.1);

    const ray = new CANNON.Ray(from, to);
    return ray.intersectWorld(world, { skipBackfaces: true });
  }
}

Jumper.register();

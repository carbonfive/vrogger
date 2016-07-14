import Component from '../core/component';

function scale(value, cap, min, max) {
  const clamped = Math.min(value, cap);
  const percent = (clamped / cap);
  return percent * (max - min) + min;
}

export default class Jumper extends Component {
  static dependencies = ['geometry']

  static schema = {
    enabled: { default: true },
    startOn: { default: 'keydown:Space' },
    jumpOn: { default: 'keyup:Space' },
    min: { default: 1 },
    max: { default: 5 },
    time: { default: 3000 },
    rotationElement: { default: 'this' },
  }

  init() {
    this.isCharging = false;
    this.bindings = [];
    this.event = null;
    this.body = null;

    this.initEvents();
  }

  remove() {
    this.data.startOn.concat(this.data.jumpOn).split(' ').forEach(event => {
      document.removeEventListener(event, this.bindings[event]);
    });
  }

  initBody(body) {
    this.body = body;
  }

  initEvents() {
    this.registerEvents(this.data.startOn, e => this.startJump(e));
    this.registerEvents(this.data.jumpOn, e => this.executeJump(e));
    this.el.addEventListener('body-loaded', e => this.initBody(e.detail.body));
  }

  registerEvents(events, callback) {
    events.split(' ').forEach(event => {
      this.bindings[event] = document.addEventListener(event, e => callback(e));
    });
  }

  startJump(event) {
    if (this.isCharging) return;
    this.isCharging = true;
    this.event = event;
  }

  executeJump(event) {
    this.isCharging = false;
    if (this.canJump() != true) return;

    const time = event.timeStamp - this.event.timeStamp;
    const power = scale(time, this.data.time, this.data.min, this.data.max);

    const using = this.data.rotationElement;
    const element = using == 'this' ? this.el : document.querySelector(using);
    const object = element.object3D;

    const force = new THREE.Vector3(0, 1000, 0);
    force.applyQuaternion(object.quaternion);
    force.multiplyScalar(power);

    this.body.applyLocalForce(force, new CANNON.Vec3);
  }

  canJump() {
    if (!this.data.enabled) return;

    const extents = this.body.shapes[0].halfExtents;

    const position = this.body.position.clone();
    const bottom = position.clone().vsub({ x: 0, y: extents.y + 0.1, z: 0 });
    const corner = { x: extents.x, y: 0, z: extents.z };

    const rays = [
      new CANNON.Ray(position, bottom.clone().vadd(corner)),
      new CANNON.Ray(position, bottom.clone().vsub(corner)),
    ];

    return rays.some(ray => {
      return ray.intersectWorld(this.body.world, { skipBackfaces: true });
    });
  }
}

Jumper.register();

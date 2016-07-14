import Component from '../core/component';

export default class Spawner extends Component {
  static schema = {
    timeout: { default: 3000 },
    mixin: { default: '' },
    tag: { default: 'a-entity' },
    enabled: { default: true },
  }

  init() {
    this.timer = setInterval(() => this.spawn(), this.data.timeout);
  }

  spawn() {
    if (!this.data.enabled) return;

    const object = this.el.object3D;

    const position = object.getWorldPosition();
    const vector = object.getWorldRotation().toVector3();
    const rotation = vector.multiplyScalar(180 / Math.PI);

    const entity = document.createElement(this.data.tag);
    entity.setAttribute('position', position);
    entity.setAttribute('rotation', rotation);
    entity.setAttribute('mixin', this.data.mixin);

    this.el.sceneEl.appendChild(entity);
  }
}

Spawner.register();

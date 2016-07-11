import Component from '../core/component';

export default class Spawner extends Component {
  static schema = {
    timeout: { default: 3000 },
    mixin: { default: '' },
  }

  init() {
    this.timer = setInterval(() => this.spawn(), this.data.timeout);
  }

  spawn() {
    const el = this.el;
    const scene = el.sceneEl;

    const matrixWorld = el.object3D.matrixWorld;
    const rotation = el.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
    const position = new THREE.Vector3;
    position.setFromMatrixPosition(matrixWorld);

    const entity = document.createElement('a-entity');
    entity.setAttribute('position', position);
    entity.setAttribute('mixin', this.data.mixin);
    entity.setAttribute('rotation', rotation);

    scene.appendChild(entity);
  }
}

Spawner.register();

import Component from '../core/component';

export default class TransformModel extends Component {
  static dependencies = ['rotation', 'geometry'];

  static schema = {
    translate: { type: 'vec3' },
    rotation: { type: 'vec3' },
    scale: { type: 'vec3', default: { x: 1, y: 1, z: 1 } },
  }

  init() {
    this.el.addEventListener('model-loaded', e => this.initModel(e.detail.model));
  }

  initModel(model) {
    model.position.copy(this.data.translate);
    model.scale.copy(this.data.scale);

    const vector = (new THREE.Vector3).copy(this.data.rotation);
    vector.multiplyScalar(Math.PI / 180);
    model.rotation.setFromVector3(vector);
  }
}

TransformModel.register();

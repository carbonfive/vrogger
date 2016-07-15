import Component from '../core/component';

export default class FixMaterial extends Component {
  static dependencies = ['material'];

  init() {
    this.el.addEventListener('model-loaded', e => this.initModel(e.detail.model));
  }

  initModel(model) {
    const material = this.el.components.material.material;

    model.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
  }
}

FixMaterial.register();

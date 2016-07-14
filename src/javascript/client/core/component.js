import { registerComponent } from 'aframe';
import { toDashCase, prototypeObject } from './util';

export default class Component {
  static register() {
    const name = toDashCase(this.name);

    const props = Object.assign(
      {},
      this,
      prototypeObject(Component),
      prototypeObject(this)
    );

    registerComponent(name, props);
  }

  getVector(attribute) {
    const vector = this.el.getAttribute(attribute) || new THREE.Vector3;
    return new THREE.Vector3(vector.x, vector.y, vector.z);
  }
}

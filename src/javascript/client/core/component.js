import aframe from 'aframe';

export function toDashCase(string) {
  const head = string[0].toLowerCase();
  const tail = string.substr(1).replace(/([A-Z])/g, (_, chr) => {
    return `-${chr.toLowerCase()}`;
  });
  return head + tail;
}

function prototypeObject(cls) {
  return Object.getOwnPropertyNames(cls.prototype)
    .reduce((h, k) => {
      h[k] = cls.prototype[k];
      return h;
    }, {});
}

export default class Component {
  static register() {
    const name = toDashCase(this.name);

    const props = Object.assign(
      {},
      this,
      prototypeObject(Component),
      prototypeObject(this)
    );

    aframe.registerComponent(name, props);
  }

  getVector(attribute) {
    const vector = this.el.getAttribute(attribute) || new THREE.Vector3;
    return new THREE.Vector3(vector.x, vector.y, vector.z);
  }
}

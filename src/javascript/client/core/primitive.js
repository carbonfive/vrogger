import { registerPrimitive } from 'aframe';
import { toDashCase, prototypeObject } from './util';

export default class Primitive {
  static register() {
    const name = toDashCase(this.name);

    const props = Object.assign(
      {},
      this,
      prototypeObject(Primitive),
      prototypeObject(this)
    );

    registerPrimitive('a-' + name, props);
  }
}

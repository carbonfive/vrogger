import { registerSystem } from 'aframe';
import { toDashCase, prototypeObject } from './util';

export default class System {
  static register() {
    const name = toDashCase(this.name);

    const props = Object.assign(
      {},
      this,
      prototypeObject(System),
      prototypeObject(this)
    );

    registerSystem(name, props);
  }
}

import Primitive from '../core/primitive';

export default class Hud extends Primitive {
  static defaultAttributes = {
    position: {
      x: 0,
      y: 0,
      z: -0.5,
    },
    geometry: {
      primitive: 'plane',
      height: 0.5,
      width: 0.5,
    },
    material: {
      transparent: true,
      shader: 'flat',
    },
    visible: false,
  };

  static mappings = {
    src: "material.src",
  }
}

Hud.register();

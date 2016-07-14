import Primitive from '../core/primitive';

export default class Vehicle extends Primitive {
  static defaultAttributes = {
    'dynamic-body': '',
    'fixed-rotation': '',
    vehicle: {
      speed: 2,
    },
    geometry: {
      primitive: 'box',
      height: 1,
      width: 2,
      depth: 6,
    }
  }

  static mappings = {
    'height': 'geometry.height',
    'width': 'geometry.width',
    'depth': 'geometry.depth',
  }
}

Vehicle.register();

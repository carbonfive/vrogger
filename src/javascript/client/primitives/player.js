import Primitive from '../core/primitive';

export default class Player extends Primitive {
  static defaultAttributes = {
    'dynamic-body': '',
    'fixed-rotation': '',
    'keyboard-controls': '',
    'touch-controls': '',
    player: '',
    jumper: {
      enabled: false,
      rotationElement: '[camera]',
    },
    geometry: {
      primitive: 'box',
      height: 2,
      width: 1,
    }
  }

  static mappings = {
    'height': 'geometry.height',
  }
}

Player.register();

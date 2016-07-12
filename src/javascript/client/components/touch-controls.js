import Component from '../core/component';

export default class TouchControls extends Component {
  init() {
    this.el.sceneEl.addEventListener('enter-vr', e => {
      document.addEventListener('touchstart', e => { this.el.emit('touch:Start', e) });
      document.addEventListener('touchend', e => this.el.emit('touch:End', e));
    });
  }
}

TouchControls.register();

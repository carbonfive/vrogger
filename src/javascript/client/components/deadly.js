import Component from '../core/component';

export default class Deadly extends Component {
  init() {
    this.el.addEventListener('collide', e => this.onCollision(e));
  }

  onCollision(event) {
    const body = event.detail.body;

    if (body.mass == 0) return;

    body.el.emit('death', event);
  }
}

Deadly.register();

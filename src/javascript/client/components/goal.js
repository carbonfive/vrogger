import Component from '../core/component';

export default class Goal extends Component {
  init() {
    this.body = null;

    if (this.el.body) {
      this.initBody(this.el.body)
    }
    else {
      this.el.addEventListener('body-loaded', e => this.initBody(e.detail.body));
    }

    this.el.addEventListener('collide', e => this.onCollide(e));
  }

  initBody(body) {
    this.body = body;
  }

  onCollide(event) {
    const body = event.detail.body;

    if (body.mass == 0) return;

    body.el.emit('goal-hit', event);
  }
}

Goal.register();

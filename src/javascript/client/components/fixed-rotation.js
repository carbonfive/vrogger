import Component from '../core/component';

export default class FixedRotation extends Component {
  static dependencies = ['dynamic-body']

  init() {
    if (this.el.body) {
      this.initBody(this.el.body);
    }
    else {
      this.el.addEventListener('body-loaded', e => this.initBody(e.detail.body));
    }
  }

  initBody(body) {
    this.body = body;
    this.body.fixedRotation = true;
    this.body.updateMassProperties();
  }
}

FixedRotation.register();


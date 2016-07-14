import Component from '../core/component';

export default class FixPhysics extends Component {
  static dependencies = ['rotation', 'geometry'];

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

    if (this.el.hasLoaded) {
      this.onLoad();
    }
    else {
      this.el.addEventListener('loaded', e => this.onLoad());
    }
  }

  onLoad() {
    this.fixGeometry();
    this.fixRotation();
  }

  fixGeometry() {
    const geometry = this.el.components.geometry;
    const position = this.getVector('position');

    position.add(geometry.data.translate);
    geometry.data.translate = new THREE.Vector3;
    geometry.update();

    this.el.setAttribute('position', position);
    this.body.position.copy(position);
  }

  fixRotation() {
    const r = new THREE.Vector3;
    r.copy(this.el.getComputedAttribute('rotation'));
    r.multiplyScalar(Math.PI / 180);
    this.body.quaternion.setFromEuler(r.x, r.y, r.z);
  }
}

FixPhysics.register();

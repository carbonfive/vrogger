import Component from '../core/component';

function rad(deg) {
  return deg * (Math.PI / 180);
}

export default class FixPhysics extends Component {
  static dependencies = ['rotation', 'geometry'];

  init() {
    this.el.addEventListener('body-loaded', ({ detail: { body } }) => {
      const geometry = this.el.components.geometry;
      const position = this.getVector('position');

      const adjusted = position.add(geometry.data.translate);
      this.el.setAttribute('position', position);
      geometry.data.translate = new THREE.Vector3;
      geometry.update();
      body.position.copy(adjusted);

      const r = this.el.getComputedAttribute('rotation');
      body.quaternion.setFromEuler(rad(r.x), rad(r.y), rad(r.z));
    });
  }
}

FixPhysics.register();

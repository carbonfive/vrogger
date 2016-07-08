import aframe from 'aframe';

aframe.registerComponent('moving', {
  schema: {
    speed: { default: 1 },
  },

  tick: function() {
    const direction = new THREE.Vector3(this.data.speed, 0, 0);
    direction.applyQuaternion(this.el.object3D.quaternion);

    this.el.object3D.position.add(direction);

    if (Math.abs(this.el.object3D.position.x) > 50) {
      this.el.sceneEl.removeChild(this.el);
    }
  }
});

aframe.registerComponent('spawner', {
  schema: {
    timeout: { default: 3000 },
    mixin: { default: '' },
  },

  init: function() {
    this.timer = setInterval(() => this.spawn(), this.data.timeout);
  },

  spawn: function() {
    const el = this.el;
    const scene = el.sceneEl;

    const matrixWorld = el.object3D.matrixWorld;
    const rotation = el.getAttribute('rotation') || { x: 0, y: 0, z: 0 };
    const position = new THREE.Vector3;
    position.setFromMatrixPosition(matrixWorld);

    const entity = document.createElement('a-entity');
    entity.setAttribute('position', position);
    entity.setAttribute('mixin', this.data.mixin);
    entity.setAttribute('rotation', rotation);

    scene.appendChild(entity);
  }
});

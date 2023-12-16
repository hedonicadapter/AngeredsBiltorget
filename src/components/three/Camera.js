import { PerspectiveCamera } from 'three';

export class Camera {
  constructor() {
    this.instance = new PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.instance.position.set(-0.6, 1, 12); //x,y,z
    this.instance.rotation.x = -0.1;
    return this.instance;
  }
}

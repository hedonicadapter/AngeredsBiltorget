import { TextureLoader } from 'three';
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';

export class Headlights {
  static textureLoader = new TextureLoader();
  static textureFlare0 = this.textureLoader.load('lens-flare.png');
  static createdHeadlights = [];

  createLensflare(x, y, z) {
    const lensFlare = new Lensflare();

    lensFlare.position.set(x, y, z);
    lensFlare.addElement(
      new LensflareElement(Headlights.textureFlare0, 700, 0)
    );

    return lensFlare;
  }

  saveHeadlightTuple(headlights) {
    Headlights.createdHeadlights.push(headlights);
  }

  toggleHeadlightTuple(index) {
    return Headlights.createdHeadlights[index]?.map((headlight) => {
      headlight.visible = !headlight.visible;
    });
  }
}

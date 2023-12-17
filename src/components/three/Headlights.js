import { TextureLoader } from 'three';
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';

export class Headlights {
  static textureLoader = new TextureLoader();
  static textureFlare0 = this.textureLoader.load('lens-flare.webp');
  static createdHeadlights = [];

  createLensflare(z, left, visible = false) {
    const lensFlare = new Lensflare();
    const x = left ? -0.68 : 0.68;

    lensFlare.position.set(x, 0.7, z);
    lensFlare.addElement(
      new LensflareElement(Headlights.textureFlare0, 700, 0)
    );
    lensFlare.visible = visible;

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

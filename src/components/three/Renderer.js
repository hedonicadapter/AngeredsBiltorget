import { WebGLRenderer, SRGBColorSpace, ACESFilmicToneMapping } from 'three';

export class Renderer {
  constructor(sizeMultiplier = 1, antialias = false) {
    this.instance = new WebGLRenderer({
      alpha: true,
      antialias,
    });

    this.instance.setClearColor(0x000000, 0);
    this.instance.setSize(
      window.innerWidth,
      window.innerHeight * sizeMultiplier
    );
    this.instance.outputColorSpace = SRGBColorSpace;
    this.instance.toneMapping = ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 0.2;

    return this.instance;
  }
}

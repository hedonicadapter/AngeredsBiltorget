import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';
import {
  getRandomInt,
  mediaQuery,
  reverseInterpolateClamped,
} from '../util/helpers';

const isntMobile = mediaQuery('(min-width: 1024px)');
const sizeMultiplier = isntMobile ? 1 : 0.4;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-0.6, 1, 12); //x,y,z
camera.rotation.x = -0.1;
scene.position.y = -1.4;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  // antialias: true
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight * sizeMultiplier);
document.getElementById('model-container').appendChild(renderer.domElement);

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.2;

const envLoader = new RGBELoader();
envLoader.load('/environments/MR_INT-005_WhiteNeons_NAD.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});

const textureLoader = new THREE.TextureLoader();
const textureFlare0 = textureLoader.load('lens-flare.png');

function createLensflare(x, y, z) {
  const lensFlare = new Lensflare();

  lensFlare.position.set(x, y, z);
  lensFlare.addElement(new LensflareElement(textureFlare0, 700, 0));

  return lensFlare;
}

const modelLoader = new GLTFLoader();

modelLoader.load(
  'car.glb',
  function (gltf) {
    const modelScene = gltf.scene;
    modelScene.rotation.y = -0.6;

    for (let i = 0; i < 3; i++) {
      const clonedModel = modelScene.clone();

      // Add lens flares to the scene
      const leftHeadlightFlare = createLensflare(-0.68, 0.7, 2.265 - i * 0.005);
      clonedModel.add(leftHeadlightFlare);

      const rightHeadlightFlare = createLensflare(0.67, 0.7, 2.265 - i * 0.005);
      clonedModel.add(rightHeadlightFlare);

      clonedModel.position.z = i * -3;
      clonedModel.position.x = i * -1;

      scene.add(clonedModel);
    }
  },

  undefined,
  function (error) {
    console.error(error);
  }
);

// const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  // controls.update(); // Update OrbitControls
  renderer.render(scene, camera);
  // composer.render();
}

animate();

window.addEventListener('resize', () => {
  const isntMobile = mediaQuery('(min-width: 1024px)');

  const newWidth = window.innerWidth;
  const newHeight = isntMobile
    ? window.innerHeight
    : window.innerHeight * sizeMultiplier;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const scrollPercent =
    (scrollY / (document.body.scrollHeight - window.innerHeight)) * 0.1;

  camera.position.y = 1 - reverseInterpolateClamped(0, 1, scrollPercent * 2);
  camera.position.x = scrollPercent * (8 - -0.6) + -0.6;
  camera.position.z = interpolate(12, 20, scrollPercent * 0.3);
  camera.rotation.y =
    (reverseInterpolateClamped(0, 1, scrollPercent) * (6 - -0.1) + -0.1) * 0.1;

  scene.position.y = interpolate(-1.4, -4, scrollPercent); // Modify this line
});
function interpolate(start, end, progress) {
  return start + (end - start) * progress;
}

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';

import { mediaQuery } from '../util/helpers';

const isntMobile = mediaQuery('(min-width: 1024px)');
const sizeMultiplier = isntMobile ? 1 : 0.4;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / (window.innerHeight * sizeMultiplier),
  0.1,
  1000
);
camera.position.set(-0.8, 1, 9); //x,y,z
camera.rotation.x = -0.1;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
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

const modelLoader = new GLTFLoader();

modelLoader.load(
  'car.glb',
  function (gltf) {
    const modelScene = gltf.scene;
    modelScene.rotation.y = -0.4;

    for (let i = 0; i < 3; i++) {
      const clonedModel = modelScene.clone();

      clonedModel.position.x = i * -1;
      clonedModel.position.z = i * -3;

      scene.add(clonedModel);
    }
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const composer = new EffectComposer(renderer);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  // composer.render();
}

animate();

window.addEventListener('resize', () => {
  const isntMobile = mediaQuery('(min-width: 1024px)');

  const newWidth = window.innerWidth;
  const newHeight = isntMobile ? window.innerHeight : window.innerHeight * 0.4;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

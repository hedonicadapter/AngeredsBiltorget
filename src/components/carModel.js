import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  interpolate,
  mediaQuery,
  reverseInterpolateClamped,
} from '../util/helpers';
import { Renderer } from './three/Renderer';
import { Camera } from './three/Camera';
import { Headlights } from './three/Headlights';

const scene = new THREE.Scene();
const renderer = new Renderer();
const camera = new Camera();
const headlights = new Headlights();

const isntMobile = mediaQuery('(min-width: 1024px)');
const sizeMultiplier = isntMobile ? 1 : 0.4;

scene.position.y = -1.4;

document.getElementById('model-container').appendChild(renderer.domElement);

const envLoader = new RGBELoader();
envLoader.load('/environments/MR_INT-005_WhiteNeons_NAD.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});

const modelLoaderCallback = (gltf) => {
  const modelScene = gltf.scene;
  modelScene.rotation.y = -0.6;

  for (let i = 0; i < 3; i++) {
    const clonedModel = modelScene.clone();

    const leftHeadlightFlare = headlights.createLensflare(
      -0.68,
      0.7,
      2.265 - i * 0.005
    );
    const rightHeadlightFlare = headlights.createLensflare(
      0.68,
      0.7,
      2.265 - i * 0.005
    );
    clonedModel.add(leftHeadlightFlare);
    clonedModel.add(rightHeadlightFlare);

    headlights.saveHeadlightTuple([leftHeadlightFlare, rightHeadlightFlare]);

    clonedModel.position.z = i * -3;
    clonedModel.position.x = i * -1;

    scene.add(clonedModel);
  }
};

const modelLoader = new GLTFLoader();
modelLoader.load('car.glb', modelLoaderCallback, undefined, (error) => {
  console.error(error);
});

const handleResize = () => {
  const isntMobile = mediaQuery('(min-width: 1024px)');

  const newWidth = window.innerWidth;
  const newHeight = isntMobile
    ? window.innerHeight
    : window.innerHeight * sizeMultiplier;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
};

const handleScroll = () => {
  const scrollY = window.scrollY;
  const scrollPercent =
    (scrollY / (document.body.scrollHeight - window.innerHeight)) * 0.1;

  camera.position.y = 1 - reverseInterpolateClamped(0, 1, scrollPercent * 2);
  camera.position.x = scrollPercent * (8 - -0.6) + -0.6;
  camera.position.z = interpolate(12, 20, scrollPercent * 0.3);
  camera.rotation.y =
    (reverseInterpolateClamped(0, 1, scrollPercent) * (6 - -0.1) + -0.1) * 0.1;

  scene.position.y = interpolate(-1.4, -4, scrollPercent);
};

// const controls = new OrbitControls(camera, renderer.domElement);
const animate = () => {
  requestAnimationFrame(animate);

  // controls.update(); // Update OrbitControls
  renderer.render(scene, camera);
};
animate();

window.addEventListener('resize', handleResize);
window.addEventListener('scroll', handleScroll);

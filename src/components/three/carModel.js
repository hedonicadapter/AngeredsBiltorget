import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  interpolate,
  mediaQuery,
  reverseInterpolateClamped,
} from '../../util/helpers';
import { Renderer } from './Renderer';
import { Camera } from './Camera';
import { Headlights } from './Headlights';
import { cloneGltf } from './threeUtils';

const isntMobile = mediaQuery('(min-width: 1024px)');
const sizeMultiplier = isntMobile ? 1 : 0.4;
const { availWidth, availHeight } = window.screen;
const maxAspect = availWidth / availHeight;

const scene = new THREE.Scene();
const renderer = new Renderer(sizeMultiplier, true);
const camera = new Camera();
const headlights = new Headlights();

scene.position.y = -1.4;

document.getElementById('model-container').appendChild(renderer.domElement);

const envLoaderCallback = (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
};

const turnOnEngines = () => {
  setTimeout(() => {
    headlights.toggleHeadlightTuple(0);
  }, 2000);
  setTimeout(() => {
    headlights.toggleHeadlightTuple(1);
  }, 2150);
  setTimeout(() => {
    headlights.toggleHeadlightTuple(2);
  }, 2250);

  setTimeout(() => {
    document
      .querySelectorAll('#background-overlay, .hero-header')
      .forEach((div) => div.classList.add('start-engine'));

    navigator.vibrate(100);
  }, 2500);
};

let firstModel;
const modelLoaderCallback = (gltf) => {
  const modelScene = gltf.scene;
  modelScene.rotation.y = -0.6;

  for (let i = 0; i < 3; i++) {
    const clone = cloneGltf(gltf);
    const clonedModel = clone.scene;
    const headlightZ = 2.265 - i * 0.005;

    const leftHeadlightFlare = headlights.createLensflare(headlightZ, true);
    const rightHeadlightFlare = headlights.createLensflare(headlightZ, false);
    clonedModel.add(leftHeadlightFlare);
    clonedModel.add(rightHeadlightFlare);

    headlights.saveHeadlightTuple([leftHeadlightFlare, rightHeadlightFlare]);

    clonedModel.position.z = i * -3;
    clonedModel.position.x = i * -1;

    scene.add(clonedModel);
    if (i === 0) {
      firstModel = clonedModel;
      camera.lookAt(firstModel.position);
    }
  }

  turnOnEngines();
};

const envLoader = new RGBELoader();
envLoader.load('/environments/autoshop_01_4k.hdr', envLoaderCallback);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
);
dracoLoader.preload();
const modelLoader = new GLTFLoader();
modelLoader.setDRACOLoader(dracoLoader);
modelLoader.load(
  'Volvo S90.glb',
  modelLoaderCallback,
  undefined,
  console.error
);

const handleResize = () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  const newAspect = newWidth / newHeight;
  const scale = reverseInterpolateClamped(0, maxAspect, newAspect);

  camera.aspect = newAspect;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
  scene.scale.set(scale, scale, scale);
};

const handleScroll = () => {
  const scrollPercent =
    window.scrollY / (document.body.scrollHeight - window.innerHeight);

  camera.position.y = interpolate(1, 0, scrollPercent * 20);
  camera.position.z = interpolate(12, 20, scrollPercent * 0.3);

  camera.lookAt(firstModel.position);

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

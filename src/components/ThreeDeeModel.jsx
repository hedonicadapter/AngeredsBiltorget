import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  BakeShadows,
  ContactShadows,
  CameraShake,
  PerspectiveCamera,
} from '@react-three/drei';
import Model, { Headlights } from '../../public/Frankenstein';
import { useStore } from '@nanostores/react';
import { CTAHovered } from '../nanoStores/uiStore.ts';
import { LoadingScreen } from './spinners.tsx';
import * as TWEEN from '@tweenjs/tween.js';

export default function ThreeDeeModel() {
  const modelRef = useRef();
  const [modelRotationY, setModelRotationY] = useState(0.001);
  const [runEngine, setRunEngine] = useState(false);

  const $CTAHovered = useStore(CTAHovered);

  useEffect(() => {
    let timeout;
    if ($CTAHovered) {
      timeout = setTimeout(() => setRunEngine(true), 500);
    } else {
      setRunEngine(false);
    }

    return () => clearTimeout(timeout);
  }, [$CTAHovered]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        shadows
        dpr={window.devicePixelRatio}
      >
        <Scene />
        <group position={[0.15, 0, 0]}>
          <ModelMemo
            headlights={<Headlights scale={0.8} />}
            modelRef={modelRef}
            modelRotationY={modelRotationY}
          />

          <EnvironmentMemo />
          {runEngine && <EngineShaker />}
          <CameraMemo modelRef={modelRef} />
        </group>
      </Canvas>
    </Suspense>
  );
}

function Scene() {
  const { gl, size } = useThree();
  const recordedChunks = useRef([]);
  const mediaRecorder = useRef(null);

  useEffect(() => {
    gl.setSize(Math.floor(size.width / 2) * 2, Math.floor(size.height / 2) * 2);

    const stream = gl.domElement.captureStream(60);
    const options = {
      mimeType: 'video/webm; codecs=vp9',
      videoBitsPerSecond: 10000000,
    };
    mediaRecorder.current = new MediaRecorder(stream, options);

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    const startRecording = () => {
      console.log('rec');
      mediaRecorder.current.start();

      // Stop recording after 9 seconds
      setTimeout(() => {
        mediaRecorder.current.stop();

        // Wait for the last dataavailable event
        setTimeout(() => {
          // Create a blob from the recorded chunks
          const blob = new Blob(recordedChunks.current, { type: 'video/webm' });

          // Create a URL for the blob
          const url = URL.createObjectURL(blob);

          // Create a download link and click it
          const link = document.createElement('a');
          link.href = url;
          link.download = 'recorded.webm';
          document.body.appendChild(link);
          link.click();

          // Clean up
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 1000);
      }, 30000);
    };

    window.addEventListener('rec', startRecording);

    return () => window.removeEventListener('rec', startRecording);
  }, []);

  return <></>;
}

function ModelMemo({ modelRotationY, modelRef, headlights }) {
  return useMemo(() => {
    return (
      <group>
        <Model
          scale={0.8}
          ref={modelRef}
          position={[0, 0, 0]}
          rotation={[modelRotationY, -Math.PI / 8, 0]}
        />
        {headlights}
      </group>
    );
  }, [modelRotationY, modelRef]);
}

const exitPosition = { x: 0.45, y: 1.04, z: -0.1 };
const exitTo = { x: 0, y: 1, z: 9 };

const newExitFOV = { fov: 85 };
const toExitFOV = { fov: 60 };

const newExitLookAt = { x: -2.6, y: -1.8, z: 4 };
const toExitLookAt = { x: 0, y: 0, z: 0 };

const newEnterPosition = { x: 0, y: 1, z: 9 };
const toEnterPosition = { x: 0.45, y: 1.04, z: -0.1 };

const newEnterFOV = { fov: 60 };
const toEnterFOV = { fov: 85 };

const newEnterLookAt = { x: 0, y: 0, z: 0 };
const toEnterLookAt = { x: -2.6, y: -1.8, z: 4 };

function CameraMemo() {
  const { camera } = useThree();
  const [position, setPosition] = useState([0, 1, 9]);
  const [FOV, setFOV] = useState(60);
  const [lookAt, setLookAt] = useState([0, 0, 0]);
  const [zoom, setZoom] = useState(1.5);

  const enterCar = () => {
    new TWEEN.Tween(newEnterPosition)
      .to(toEnterPosition, 2000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        setPosition(Object.values(newEnterPosition));
      })
      .start();

    new TWEEN.Tween(newEnterFOV)
      .to(toEnterFOV, 2000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        setFOV(Object.values(newEnterFOV));
      })
      .start();

    new TWEEN.Tween(newEnterLookAt)
      .to(toEnterLookAt, 3250)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        setLookAt(Object.values(newEnterLookAt));
      })
      .start();
  };

  const exitCar = () => {
    new TWEEN.Tween(exitPosition)
      .to(exitTo, 2000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        setPosition(Object.values(exitPosition));
      })
      .start();

    new TWEEN.Tween(newExitFOV)
      .to(toExitFOV, 2000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => {
        setFOV(Object.values(newExitFOV));
      })
      .start();

    new TWEEN.Tween(newExitLookAt)
      .to(toExitLookAt, 2250)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        setLookAt(Object.values(newExitLookAt));
      })
      .start();
  };

  useEffect(() => {
    // TODO: scale with interpolator for smoother zoom
    const handleWindowResize = () => {
      let newZoom = 1.5;
      switch (true) {
        case window.innerWidth < 330:
          newZoom = 0.5;
          break;
        case window.innerWidth < 428:
          newZoom = 0.75;
          break;
        case window.innerWidth < 540:
          newZoom = 1;
          break;
        case window.innerWidth < 700:
          newZoom = 1.25;
          break;
      }

      setZoom(newZoom);
    };

    const handleHashChange = () => {
      // if (window.location.pathname === '/about') enterCar();
      // else exitCar();
    };

    handleHashChange();

    document.addEventListener('astro:page-load', handleHashChange);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      document.removeEventListener('astro:page-load', handleHashChange);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [camera]);

  useFrame(({ camera }) => {
    TWEEN.update();

    camera.lookAt(...lookAt);
  });

  return useMemo(() => {
    return (
      <PerspectiveCamera
        zoom={zoom}
        makeDefault
        fov={FOV}
        position={position}
      />
    );
  }, [position, FOV, zoom]);
}

function EngineShaker() {
  const [shakeIntensity, setShakeIntensity] = useState(0.001);

  useEffect(() => {
    const interval = setInterval(() => {
      setShakeIntensity((prevValue) =>
        prevValue > 0.0005 ? prevValue - 0.0001 : 0.0005
      );
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <CameraShake
      maxYaw={shakeIntensity}
      maxPitch={shakeIntensity}
      maxRoll={shakeIntensity}
      yawFrequency={10}
      pitchFrequency={10}
      rollFrequency={10}
    />
  );
}

function MovingSpots({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef();
  useFrame(
    (state, delta) =>
      (group.current.position.z += delta * 15) > 60 &&
      (group.current.position.z = -60)
  );
  return (
    <group rotation={[0, 0.5, 0]}>
      <group ref={group}>
        {positions.map((x, i) => (
          <Lightformer
            key={i}
            form='circle'
            intensity={2}
            rotation={[Math.PI / 2, 0, 0]}
            position={[x, 4, i * 4]}
            scale={[3, 1, 1]}
          />
        ))}
      </group>
    </group>
  );
}

function EnvironmentMemo() {
  return useMemo(
    () => (
      <group position={[-0.15, 0, 0]}>
        <spotLight
          position={[0, 30, 0]}
          angle={0.3}
          penumbra={1}
          castShadow
          intensity={2}
          shadow-bias={-0.0001}
          shadow-mapSize={[256, 256]}
        />
        <ContactShadows
          resolution={256}
          frames={1}
          position={[0, 0, 0]}
          scale={10}
          blur={3}
          opacity={1}
          far={10}
        />
        <Environment frames={Infinity} resolution={512}>
          <Lightformer
            intensity={0.4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          <MovingSpots />
          <Lightformer
            intensity={4}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[20, 0.05, 1]}
          />
          <Lightformer
            intensity={3}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={[20, 0.05, 1]}
          />
          <Lightformer
            intensity={1}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[20, 1, 1]}
          />
          <Lightformer
            intensity={1}
            form='circle'
            scale={10}
            position={[-15, 10, -25]}
            target={[0, 0, 0]}
          />
        </Environment>
        <BakeShadows />
      </group>
    ),
    []
  );
}

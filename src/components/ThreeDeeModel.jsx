import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  BakeShadows,
  ContactShadows,
  CameraShake,
  PerspectiveCamera,
  ScrollControls,
  Scroll,
} from '@react-three/drei';
import Model from '../../public/Frankenstein';
import useScroll from '../util/useScroll';
import { useStore } from '@nanostores/react';
import { CTAHovered } from '../nanoStores/CTAStore.js';
import { TextureLoader } from 'three';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';

export default function ThreeDeeModel() {
  const modelRef = useRef();
  const [cameraPosition, setCameraPosition] = useState([0, 1, 9]);
  const [modelRotationY, setModelRotationY] = useState(0.001);
  const [runEngine, setRunEngine] = useState(false);

  const [lightSize, setLightSize] = useState([0, 0, 0]);
  const $CTAHovered = useStore(CTAHovered);
  const $CTAHoveredRef = useRef($CTAHovered);

  useEffect(() => {
    let timeout;
    if ($CTAHovered) {
      timeout = setTimeout(() => setRunEngine(true), 500);
    } else {
      setRunEngine(false);
    }

    return () => clearTimeout(timeout);
  }, [$CTAHovered]);

  const modelMemo = useMemo(
    () => (
      <group>
        <Model
          scale={0.8}
          ref={modelRef}
          position={[0, 0, 0]}
          rotation={[modelRotationY, -Math.PI / 8, 0]}
        />
        <Headlights scale={0.8} />
      </group>
    ),
    [modelRotationY]
  );

  const environmentMemo = useMemo(
    () => (
      <group>
        <spotLight
          position={[0, 30, 0]}
          angle={0.3}
          penumbra={1}
          castShadow
          intensity={2}
          shadow-bias={-0.0001}
          shadow-mapSize={[256, 256]}
        />
        <ambientLight intensity={0} />
        <ContactShadows
          resolution={1024}
          frames={1}
          position={[0, 0, 0]}
          scale={10}
          blur={3}
          opacity={1}
          far={10}
        />
        <Environment frames={Infinity} resolution={128}>
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

  const cameraMemo = useMemo(
    () => (
      <PerspectiveCamera
        zoom={0.8}
        makeDefault
        fov={60}
        position={cameraPosition}
      />
    ),
    [cameraPosition]
  );

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Canvas shadows dpr={window.devicePixelRatio}>
        <group position={[0, 0, 0]}>
          {modelMemo}

          {environmentMemo}
          {runEngine && <EngineShaker />}
          <ScrollCallback setModelRotationY={setModelRotationY} />
          {cameraMemo}
        </group>
      </Canvas>
    </Suspense>
  );

  function Headlights(props) {
    const { scene } = useThree();
    const textureFlare0 = useLoader(TextureLoader, 'lens-flare.webp');
    const [lensFlareLeft, setLensFlareLeft] = useState();
    const [lensFlareRight, setLensFlareRight] = useState();

    const [lightSize, setLightSize] = useState([0, 0, 0]);
    const $CTAHovered = useStore(CTAHovered);
    const $CTAHoveredRef = useRef($CTAHovered);

    useEffect(() => {
      $CTAHoveredRef.current = $CTAHovered;
    }, [$CTAHovered]);

    useEffect(() => {
      const interval = setInterval(() => {
        setLightSize((prevValue) => {
          let newvalue;
          if ($CTAHoveredRef.current) {
            newvalue = prevValue[0] < 1 ? prevValue[0] + 0.05 : 1;
          } else {
            newvalue = prevValue[0] > 0 ? prevValue[0] - 0.05 : 0;
          }
          return [newvalue, newvalue, newvalue];
        });
      }, 10);

      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      const lensFlareLeft = new Lensflare();
      lensFlareLeft.addElement(new LensflareElement(textureFlare0, 700, 0));
      // lensFlareLeft.position.set(-0.24, 3.204, 2.34);
      setLensFlareLeft(lensFlareLeft);

      const lensFlareRight = new Lensflare();
      lensFlareRight.addElement(new LensflareElement(textureFlare0, 700, 0));
      // lensFlareRight.position.set(-1.51, 3.225, 1.8);
      setLensFlareRight(lensFlareRight);

      return () => {
        lensFlareLeft.dispose();
        lensFlareRight.dispose();
      };
    }, [scene, textureFlare0]);

    return useMemo(
      () => (
        <group {...props}>
          {lensFlareLeft && (
            <group scale={lightSize}>
              <primitive
                position={[-0.24, 0.72, 2.39]}
                object={lensFlareLeft}
              />
            </group>
          )}
          {lensFlareRight && (
            <group scale={lightSize}>
              <primitive
                position={[-1.55, 0.72, 1.9]}
                object={lensFlareRight}
              />
            </group>
          )}
        </group>
      ),
      [lensFlareLeft, lensFlareRight, lightSize]
    );
  }
  // function Headlights() {
  //   const { scene } = useThree();
  //   const textureFlare0 = useLoader(TextureLoader, 'lens-flare.webp');

  //   useEffect(() => {
  //     const lensFlareLeft = new Lensflare();
  //     lensFlareLeft.addElement(new LensflareElement(textureFlare0, 700, 0));
  //     lensFlareLeft.position.set(-0.24, 3.204, 2.34);
  //     scene.add(lensFlareLeft);

  //     const lensFlareRight = new Lensflare();
  //     lensFlareRight.addElement(new LensflareElement(textureFlare0, 700, 0));
  //     lensFlareRight.position.set(-1.51, 3.225, 1.8);
  //     scene.add(lensFlareRight);

  //
  //     return () => {
  //       scene.remove(lensFlareLeft);
  //       lensFlareLeft.dispose();

  //       scene.remove(lensFlareRight);
  //       lensFlareRight.dispose();
  //     };
  //   }, [scene, textureFlare0]);

  //   return null;
  // }

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

    useEffect(() => {
      console.log(shakeIntensity);
    }, [shakeIntensity]);

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

  function LoadingSpinner() {
    return (
      // stolen from https://tailwindflex.com/@anonymous/loading-dots
      <div class='flex space-x-2 justify-center items-center h-screen'>
        <span class='sr-only'>Loading...</span>
        <div class='h-6 w-6 bg-on-bg rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div class='h-6 w-6 bg-on-bg rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div class='h-6 w-6 bg-on-bg rounded-full animate-bounce'></div>
      </div>
    );
  }

  function ScrollContainer({ children }) {
    return (
      <ScrollControls pages={1} damping={0.05}>
        <Scroll>{children}</Scroll>
      </ScrollControls>
    );
  }
  function ScrollCallback({ children, ...props }) {
    const { camera } = useThree();
    // const scrollData = useScroll();

    useFrame(() => {
      // const modifier = window.scrollY > 0 ? window.scrollY * 0.0004 : 0.0004;
      // console.log(modifier);
      // props.setModelRotationY(-modifier);
      // camera.position.y =
      //   cameraPosition[1] -
      //   (cameraPosition[1] * scrollData.scroll.current * 10 - 0);
    });
    return children;
    // <ScrollControls pages={3} damping={0.1}>
    //   <Scroll>{children}</Scroll>
    // </ScrollControls>
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
}

import { Suspense, useRef, useState, useEffect } from 'react';
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

export default function ThreeDeeModel() {
  const modelRef = useRef();
  const [cameraPosition, setCameraPosition] = useState([0, 1, 9]);
  const [modelRotationY, setModelRotationY] = useState(0.001);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Canvas shadows dpr={window.devicePixelRatio}>
        <group position={[0, 2.5, 0]}>
          <Model
            ref={modelRef}
            scale={1}
            rotation={[modelRotationY, -Math.PI / 8, 0]}
          />
          <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            castShadow
            intensity={2}
            shadow-bias={-0.0001}
            shadow-mapSize={[256, 256]}
          />
          <ambientLight intensity={0.2} />
          <ContactShadows
            resolution={1024}
            frames={1}
            position={[0, -0.1, 0]}
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
          {/* <CameraShake
          maxYaw={0.001}
          maxPitch={0.001}
          maxRoll={0.001}
          yawFrequency={10}
          pitchFrequency={10}
          rollFrequency={10}
        /> */}
          <ScrollCallback setModelRotationY={setModelRotationY} />
          <PerspectiveCamera makeDefault fov={60} position={cameraPosition} />
        </group>
      </Canvas>
    </Suspense>
  );

  // function BMW(props) {
  //   const { scene, nodes, materials } = useGLTF('/frankenstein.glb');
  //   useMemo(() => {
  //     Object.values(nodes).forEach(
  //       (node) => node.isMesh && (node.receiveShadow = node.castShadow = true)
  //     );
  //   }, [nodes, materials]);
  //   return <primitive object={scene} {...props} />;
  // }

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

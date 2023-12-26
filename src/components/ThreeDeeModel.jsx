import * as THREE from 'three';
import {
  Suspense,
  createRef,
  forwardRef,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Canvas, applyProps, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  useGLTF,
  BakeShadows,
  ContactShadows,
  CameraShake,
  PerspectiveCamera,
} from '@react-three/drei';
import Model from '../../public/Frankenstein';

const CameraRig = ({ target, modelRef }) => {
  useEffect(() => {
    console.log(modelRef);
  }, [modelRef]);
  // useThree((state) => {
  //   state.camera?.lookAt(target);
  //   // state.camera.up = new THREE.Vector3(0, 1, 0);
  //   state.camera.updateProjectionMatrix();
  // });
  // return useFrame((state) => {
  //   // const t = state.clock.elapsedTime;
  //   // state.camera.position.lerp(
  //   //   v.set(Math.sin(t / 5), 0, 10 + Math.cos(t / 5)),
  //   //   0.05
  //   // );
  //   console.log(modelRef?.current.position);
  //   state.camera.lookAt(modelRef?.current.position);
  // });
};

export default function ThreeDeeModel() {
  const [position, setPosition] = useState([0, 0, 0]);
  const modelRef = useRef();

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Canvas
        shadows
        dpr={window.devicePixelRatio}
        // camera={{ position: [0, 0, -8], fov: 60 }}
      >
        <group position={[0, 2.5, 0]}>
          <Model
            ref={modelRef}
            scale={1}
            // position={[0, 3, 0]}
            rotation={[0, -(Math.PI / 8), 0]}
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
          <PerspectiveCamera makeDefault fov={60} position={[0, 1, 9]} />
          {/* <CameraRig target={position} model={modelRef} /> */}
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

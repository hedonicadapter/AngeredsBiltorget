import * as THREE from 'three';
import { Suspense, useMemo, useRef } from 'react';
import { Canvas, applyProps, useFrame } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  useGLTF,
  BakeShadows,
  ContactShadows,
} from '@react-three/drei';
import { Model } from '../../public/Frankenstein';

export default function ThreeDeeModel() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Canvas
        shadows
        dpr={window.devicePixelRatio}
        camera={{ position: [0, 0, -15], fov: 20 }}
      >
        <Model
          scale={0.25}
          position={[0, 0, 0]}
          rotation={[0, Math.PI / 5, 0]}
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
        <CameraRig />
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

  function CameraRig({ v = new THREE.Vector3() }) {
    return useFrame((state) => {
      const t = state.clock.elapsedTime;
      state.camera.position.lerp(
        v.set(Math.sin(t / 5), 0, 10 + Math.cos(t / 5)),
        0.05
      );
      state.camera.lookAt(0, 0, 0);
    });
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

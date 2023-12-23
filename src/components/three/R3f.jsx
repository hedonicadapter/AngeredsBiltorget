import React from 'react';
import ReactDOM from 'react-dom';
import { Canvas, applyProps, useFrame } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  useGLTF,
  BakeShadows,
  ContactShadows,
} from '@react-three/drei';

const MyReactComponent = () => {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [-10, 0, 15], fov: 30 }}>
      <Porsche
        scale={1.6}
        position={[-0.5, -0.18, 0]}
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
        position={[0, -1.16, 0]}
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
    </Canvas>
  );
};

function Porsche(props) {
  const { scene, nodes, materials } = useGLTF('/carOptimized.glb');
  useMemo(() => {
    Object.values(nodes).forEach(
      (node) => node.isMesh && (node.receiveShadow = node.castShadow = true)
    );
    applyProps(materials.rubber, {
      color: '#151515',
      roughness: 0.6,
      roughnessMap: null,
      normalScale: [4, 4],
      envMapIntensity: 0.2,
    });
    applyProps(materials.window, {
      color: 'black',
      roughness: 0,
      clearcoat: 0.1,
    });
    applyProps(materials.coat, {
      envMapIntensity: 4,
      roughness: 0.0,
      metalness: 1,
      color: '#445',
    });
    applyProps(materials.paint, {
      roughness: 0.5,
      metalness: 0.75,
      color: '#334',
      envMapIntensity: 2,
    });
  }, [nodes, materials]);
  return <primitive object={scene} {...props} />;
}

// Render your React component
ReactDOM.render(
  React.createElement(MyReactComponent, null, null),
  document.getElementById('react-container')
);

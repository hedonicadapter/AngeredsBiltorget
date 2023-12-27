/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 frankenstein.glb --transform --resolution 512 
Files: frankenstein.glb [12.43MB] > F:\Coding\ITHSLabbar\Vanilla\astro\public\frankenstein-transformed.glb [7.95MB] (36%)
*/
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { forwardRef, useEffect, useMemo, useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { CTAHovered } from '../src/nanoStores/CTAStore.js';

import { TextureLoader } from 'three';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';

const Model = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/frankenstein-transformed.glb');

  useMemo(() => {
    Object.values(nodes).forEach(
      (node) => node.isMesh && (node.receiveShadow = node.castShadow = true)
    );
  }, [nodes, materials]);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        geometry={nodes.Windsheild_Null.geometry}
        material={materials.PaletteMaterial007}
        position={[0, 0, -0.106]}
      />
      <mesh
        geometry={nodes.Plane027.geometry}
        material={materials.DoorPanelRear}
        position={[0, 0, -0.106]}
      />
      <mesh
        geometry={nodes.Floor.geometry}
        material={materials.Shell}
        position={[0, 0, -0.106]}
      />
      <mesh
        geometry={nodes.Plane057.geometry}
        material={materials.DoorPanelFront}
        position={[0, 0, -0.106]}
      />
      <mesh
        geometry={nodes.Driver_Seat.geometry}
        material={materials['Front Seat']}
        position={[0.417, 0.507, 0.12]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.187}
      />
      <mesh
        geometry={nodes.Rear_Seats.geometry}
        material={materials['Rear Seats']}
        position={[0, 0, -0.106]}
      />
      <mesh
        geometry={nodes.CenterConsole.geometry}
        material={materials.CenterConsole}
        position={[0.03, 0.875, 0.184]}
      />
      <mesh
        geometry={nodes.Dashboard.geometry}
        material={materials.Dashboard}
        position={[0.111, 0.639, -0.038]}
      />
      <mesh
        geometry={nodes.SteeringWheel.geometry}
        material={materials.Steeringwheel}
        position={[0.386, 0.865, 0.436]}
        rotation={[-2.859, 0, -Math.PI]}
        scale={[0.179, 0.179, 0.221]}
      />
      <mesh
        geometry={nodes.Shifterknob_Crystal.geometry}
        material={materials.PaletteMaterial008}
        position={[0.051, 0.622, 0.448]}
        scale={[1.091, 1, 1]}
      />
      <mesh
        geometry={nodes.SpeedoScreen.geometry}
        material={materials.Speedometer}
        position={[0.111, 0.639, -0.039]}
      />
      <mesh
        geometry={nodes.GasBrake_Pedal.geometry}
        material={materials.PaletteMaterial009}
        position={[0.267, 0.473, 0.861]}
        rotation={[-0.891, 0, 0]}
        scale={[0.04, 0.004, 0.04]}
      />
      <mesh
        geometry={nodes.InfoTainment_Screen.geometry}
        material={materials.infotainmentScreen}
        position={[0.111, 0.639, -0.038]}
      />
      <mesh
        geometry={nodes.Lightbulb_TrunkTaillight.geometry}
        material={materials.Taillight}
        position={[0.464, 0.914, -2.414]}
        rotation={[Math.PI / 2, 0, 0.269]}
        scale={0.002}
      />
      <mesh
        geometry={nodes.WindsheildWiper_Left.geometry}
        material={materials.PaletteMaterial001}
        position={[0.096, 1.047, 1.041]}
        rotation={[0.499, 0.024, -0.016]}
        scale={[0.864, 1, 1]}
      />
      <mesh
        geometry={nodes.Windsheild_Trim.geometry}
        material={materials.PaletteMaterial010}
        position={[0, 0, -0.106]}
      />
      <mesh
        geometry={nodes.body.geometry}
        material={materials.PaletteMaterial006}
        position={[0, 0, -1.526]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.glass.geometry}
        material={materials.PaletteMaterial002}
        position={[0, 0, -1.526]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.glass001.geometry}
        material={materials.PaletteMaterial003}
        position={[0, 0, -1.526]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.glass003.geometry}
        material={materials.PaletteMaterial004}
        position={[0, 0, -1.526]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.led001.geometry}
        material={materials.PaletteMaterial005}
        position={[0, 0, -1.526]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.object.geometry}
        material={materials.mercemblem}
        position={[0, 0, -1.526]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.disk003.geometry}
        material={materials.metal_brush_cirular}
        position={[0, 0.482, -1.853]}
        rotation={[1.948, Math.PI / 2, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.wheel003.geometry}
        material={materials.metal_rough_plus_rim}
        position={[0, 0.482, -1.853]}
        rotation={[1.948, Math.PI / 2, 0]}
        scale={0.001}
      />
      <mesh
        geometry={nodes.wheelbrakeBkL.geometry}
        material={materials.paint_brake}
        position={[0, 0, -1.526]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.001}
      />
    </group>
  );
});

export function Headlights(props) {
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
            <primitive position={[-0.24, 0.72, 2.39]} object={lensFlareLeft} />
          </group>
        )}
        {lensFlareRight && (
          <group scale={lightSize}>
            <primitive position={[-1.55, 0.72, 1.9]} object={lensFlareRight} />
          </group>
        )}
      </group>
    ),
    [lensFlareLeft, lensFlareRight, lightSize]
  );
}

useGLTF.preload('/frankenstein-transformed.glb');
// useLoader.preload('/lens-flare.webp');

export default Model;

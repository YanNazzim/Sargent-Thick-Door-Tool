import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Chassis = ({ position }) => {
  // Load the base chassis model
  const Chassis8800 = useLoader(GLTFLoader, "/models/ChassisBlank.gltf");
  const Latchbolt8800 = useLoader(GLTFLoader, "/models/Latchbolt8800.gltf");
  const Latchbolt8800SpringPin = useLoader(
    GLTFLoader,
    "/models/Latchbolt8800SpringPin.gltf"
  );
  const Latchbolt8800SpirolPin = useLoader(
    GLTFLoader,
    "/models/latchboltSpirolPin.gltf"
  );
  const Latchbolt8800PivotPin = useLoader(
    GLTFLoader,
    "/models/leverpivotpin.gltf"
  );
  const LiftLeverRH8800 = useLoader(GLTFLoader, "/models/liftleverRH.gltf");
  const LiftLeverLH8800 = useLoader(GLTFLoader, "/models/liftleverLH.gltf");
  const LatchboltSpring8800 = useLoader(
    GLTFLoader,
    "/models/latchboltspring.gltf"
  );
  const LatchboltSpringGroovepin8800 = useLoader(
    GLTFLoader,
    "/models/LBSpringGroovepin.gltf"
  );
  const OutsideCylHub8800 = useLoader(
    GLTFLoader,
    "/models/Cylinderspindlehub8800.gltf"
  );

  return (
    <group position={position}>
      {/* 8800 Chassis */}
      <primitive
        rotation={[Math.PI, Math.PI, 0]} // Default no rotation
        object={Chassis8800.scene}
        position={[0, 41, -0.375]} // Adjust as necessary
        scale={[30, 30, 30]} // Adjust scale to match your scene
      />
      <primitive
        rotation={[Math.PI / 2, Math.PI, (3 * Math.PI) / 2 + 0.9]} // Default no rotation
        object={Latchbolt8800.scene}
        position={[0.7, 41, 0.85]} // Adjust as necessary
        scale={[30, 30, 30]} // Adjust scale to match your scene
      />
      <primitive
        rotation={[0, Math.PI / 2, Math.PI / 2]} // Default no rotation
        object={Latchbolt8800SpringPin.scene}
        position={[0.375, 40.75, 0.645]} // Adjust as necessary
        scale={[30, 30, 30]} // Adjust scale to match your scene
      />
      <primitive
        rotation={[0, Math.PI, 0]} // Default no rotation
        object={LatchboltSpringGroovepin8800.scene}
        position={[-1.085, 39.305, -0.1]} // Adjust as necessary
        scale={[30, 30, 30]} // Adjust scale to match your scene
      />
      <primitive
        rotation={[(3 * Math.PI) / 2 - 0.25, 0, -0.165]} // Default no rotation
        object={LatchboltSpring8800.scene}
        position={[0.37, 40.44, 0.53]} // Adjust as necessary
        scale={[30, 30, 30]} // Adjust scale to match your scene
      />
      <primitive
        rotation={[(3 * Math.PI) / 2, 0, 0]} // Default no rotation
        object={Latchbolt8800SpirolPin.scene}
        position={[0.7375, 40.35, 0.85]} // Adjust as necessary
        scale={[30, 30, 30]} // Adjust scale to match your scene
      />
      <primitive
        rotation={[(3 * Math.PI) / 2, 0, (3 * Math.PI) / 2]} // Default no rotation
        object={Latchbolt8800PivotPin.scene}
        position={[-0.56, 42.2, 0.256]} // Adjust as necessary
        scale={[30, 30, 30]} // Adjust scale to match your scene
      />
      <primitive
        rotation={[0, (3 * Math.PI) / 2, (3 * Math.PI) / 2]} // Default no rotation
        object={LiftLeverRH8800.scene}
        position={[-0.475, 39.795, 0.256]} // Adjust as necessary
        scale={[30, 30, 30]} // Adjust scale to match your scene
      />
      <primitive
        rotation={[Math.PI, Math.PI / 2, (3 * Math.PI) / 2]} // Default no rotation
        object={LiftLeverLH8800.scene}
        position={[-0.475, 42.2, 0.256]} // Adjust as necessary
        scale={[30, 30, 30]} // Adjust scale to match your scene
      />
      <primitive
        rotation={[0, Math.PI, Math.PI*2]} // Default no rotation
        object={OutsideCylHub8800.scene}
        position={[0, 39.795, 0.1005]} // Adjust as necessary
        scale={[30, 30, 30]} // Adjust scale to match your scene
      />
      ))
    </group>
  );
};

export default Chassis;

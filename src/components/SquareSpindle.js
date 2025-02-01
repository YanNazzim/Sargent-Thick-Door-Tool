import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const SquareSpindle = ({ position, thickness }) => {
  // Load the GLTF model
  const gltf = useLoader(GLTFLoader, "/models/SquareSpindle.gltf");

  // Base length for the spindle
  const baseLength = 1.78; // Example base length (adjust as needed)

  // Calculate the extra length based on the door thickness
  const extraLength = thickness - 1.75; // Additional length for thicker doors

  // Calculate the total spindle length
  const spindleLength = baseLength + extraLength;

  // Calculate scale, ensuring X and Y dimensions remain constant
  const baseScale = 30; // Base scale for X and Y
  const zScale = (spindleLength / baseLength) * baseScale; // Scale Z proportionally

  return (
    <group position={position} scale={[baseScale, baseScale, zScale]}>
      <primitive object={gltf.scene} />
    </group>
  );
};

export default SquareSpindle;

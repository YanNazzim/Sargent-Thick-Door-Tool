import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const CrossSpindle = ({ position, thickness }) => {
  // Load the GLTF model for Cross Spindle
  const gltf = useLoader(GLTFLoader, "/models/CrossSpindle.gltf");

  // Base length for the spindle
  const baseLength = 2.78; // Example base length

  // Calculate the extra length based on the door thickness
  const extraLength = thickness - 1.75; // Additional length for thicker doors

  // Calculate the total spindle length
  const spindleLength = baseLength + extraLength;

  // Calculate scale, ensuring X and Y dimensions remain constant
  const baseScale = 30; // Base scale for X and Y
  const zScale = (spindleLength / baseLength) * baseScale; // Scale Z proportionally

  return (
    <group position={position} scale={[baseScale, baseScale, zScale]}>
      <primitive object={gltf.scene.clone()} /> {/* Use .clone() to avoid conflicts */}
    </group>
  );
};

export default CrossSpindle;

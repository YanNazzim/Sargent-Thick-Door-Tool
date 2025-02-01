import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Screws = ({ topPosition, bottomPosition, thickness }) => {
  // Load the GLTF model
  const gltf = useLoader(GLTFLoader, "/models/ETThrubolt.gltf");

  // Base length of the screw for 1.75" thickness
  const baseLength = 2.8;

  // Calculate screw length based on door thickness
  const extraLength = thickness - 1.75; // Additional length for thicker doors
  const screwLength = baseLength + extraLength;

  // Calculate scale, ensuring the base scale starts at 30 for X and Y
  const baseScale = 30;
  const zScale = (screwLength / baseLength) * baseScale; // Scale Z proportionally

  return (
    <group>
      {/* Top Screw */}
      <group position={topPosition} scale={[baseScale, baseScale, zScale]}>
        <primitive object={gltf.scene.clone()} />
      </group>

      {/* Bottom Screw */}
      <group position={bottomPosition} scale={[baseScale, baseScale, zScale]}>
        <primitive object={gltf.scene.clone()} />
      </group>
    </group>
  );
};

export default Screws;

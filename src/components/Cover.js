import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Cover = ({ position }) => {
  // Load the GLTF model
  const gltf = useLoader(GLTFLoader, "/models/ChassisCover.gltf");

  return (
    <group position={position} scale={[30, 30, 30]} rotation={[Math.PI/2,3 * Math.PI / 2,0]}>
      {/* Display the GLTF model */}
      <primitive object={gltf.scene} />
    </group>
  );
};

export default Cover;

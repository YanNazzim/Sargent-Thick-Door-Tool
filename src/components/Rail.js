import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Rail = ({ position, scale = [30, 30, 30], rotations = {} }) => {
  // Load the GLTF models
  const railInsert = useLoader(GLTFLoader, "/models/RailInsert.gltf");
  const railPush = useLoader(GLTFLoader, "/models/RailPush.gltf");
  const railMounting = useLoader(GLTFLoader, "/models/RailMounting.gltf");

  return (
    <group position={position}>
      {/* Rail Insert */}
      <primitive
        object={railInsert.scene}
        position={[-5.305, 41, 2.5]} // Adjust position as needed
        scale={scale}
        rotation={rotations.insert || [0, 0, 0]} // Default no rotation
      />

      {/* Rail Push */}
      <primitive
        object={railPush.scene}
        position={[8.35, 41, 3.035]} // Adjust position as needed
        scale={scale}
        rotation={rotations.push || [0, 0, 0]} // Default no rotation
      />

      {/* Rail Mounting */}
      <primitive
        object={railMounting.scene}
        position={[-15.75, 41, 1.75]} // Adjust position as needed
        scale={scale}
        rotation={rotations.mounting || [0, 0, 0]} // Default no rotation
      />
    </group>
  );
};

export default Rail;

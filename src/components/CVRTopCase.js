import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const CVRTopCase = ({ position, children }) => {
  // Load the GLTF model
  const CVRTopCase = useLoader(GLTFLoader, "/models/CVRTopCase.gltf");
  const CVRTopStopGuard = useLoader(GLTFLoader, "/models/CVRTopStopGuard.gltf");

  return (
    <group position={position}>
      {/* Render the CVRTopCase */}
      <primitive
        object={CVRTopCase.scene}
        position={[0, 0, -.25]}
        scale={[30, 30, 30]}
        rotation={[0, Math.PI, 0]}
      />
      <primitive
        object={CVRTopStopGuard.scene}
        position={[0, -1.395, -1.2525]}
        scale={[30, 30, 30]}
        rotation={[0, 0, 0]}
      />

      {/* Allow additional parts to be added */}
    </group>
  );
};

export default CVRTopCase;

import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ETTrim = ({ position }) => {
  // Load the GLTF model
  const TrimCase = useLoader(GLTFLoader, "/models/ETTrim.gltf");
  const TrimLeverBushing = useLoader(
    GLTFLoader,
    "/models/BushingInsertTrim.gltf"
  );
  const TrimCapNut = useLoader(GLTFLoader, "/models/CapnutTrim.gltf");
  const TrimSpindleLock = useLoader(
    GLTFLoader,
    "/models/LockingSpindlePieceTrim.gltf"
  );
  const TrimHubSpring = useLoader(GLTFLoader, "/models/HubSpringTrim.gltf");
  const TrimRetPlate = useLoader(GLTFLoader, "/models/TrimRetPlate.gltf");
  const TrimLockingSlide = useLoader(
    GLTFLoader,
    "/models/TrimLockingSlide.gltf"
  );
  const TrimLockingSlideSpring = useLoader(
    GLTFLoader,
    "/models/TrimLockSlideSpring.gltf"
  );
  const TrimHandingScrew = useLoader(
    GLTFLoader,
    "/models/TrimHandingScrew.gltf"
  );
  const TrimLLever = useLoader(GLTFLoader, "/models/TrimLLever.gltf");
  const TrimFusibleLink = useLoader(GLTFLoader, "/models/TrimFusibleLink.gltf");
  const TrimRetPlateScrew = useLoader(
    GLTFLoader,
    "/models/TrimRetPlateScrew.gltf"
  );

  return (
    <group position={position} scale={[30, 30, 30]}>
      {" "}
      {/* Adjust the scale as needed */}
      <primitive object={TrimCase.scene} />
      <primitive
        object={TrimLeverBushing.scene}
        rotation={[(3 * Math.PI) / 2, 0, 0]}
        position={[0, -0.033, -0.0175]}
      />
      <primitive
        object={TrimCapNut.scene}
        rotation={[(3 * Math.PI) / 2, 0, 0]}
        position={[0, -0.033, -0.00995275]}
      />
      <primitive
        object={TrimSpindleLock.scene}
        rotation={[0, 0, 0]}
        position={[0, -0.033, -0.0075]}
      />
      <primitive
        object={TrimHubSpring.scene}
        rotation={[0, 0, 0]}
        position={[0.01475, -0.09125, -0.004]}
      />
      <primitive
        object={TrimLLever.scene}
        rotation={[0, Math.PI, 0]}
        position={[0, -0.033, -0.0225]}
      />
      <primitive
        object={TrimHandingScrew.scene}
        rotation={[0, Math.PI / 2, 0]}
        position={[-0.0075, -0.0475, -0.00465]}
      />
      <primitive
        object={TrimLockingSlide.scene}
        rotation={[0, 0, 0]}
        position={[0, 0.01675, -0.00243]}
      />
      <primitive
        object={TrimLockingSlideSpring.scene}
        rotation={[0, Math.PI, 0]}
        position={[0, 0.0134, -0.00375]}
      />
      <primitive
        object={TrimRetPlate.scene}
        rotation={[-.05, 0, 0]}
        position={[0, -0.033, 0]}
      />
      <primitive
        object={TrimRetPlateScrew.scene}
        rotation={[0, 0, 0]}
        position={[0, 0.0135, 0.00265]}
      />
            <primitive
        object={TrimFusibleLink.scene}
        rotation={[0, 0, 0]}
        position={[0, 0.0135, 0.001]}
      />
    </group>
  );
};

export default ETTrim;

import React from "react";

const platePosition = [15.25, 49.3, 0];
const rodPosition = [15.25, 45, 0];
const rodLength = 8.46

const CVRInnerChassis = ({ position }) => {
  return (
    <group>
      <mesh className="chassis" position={position}>
        <boxGeometry args={[1, 5.155, 1.375]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <mesh className="Plate" position={platePosition}>
        <boxGeometry args={[1.38, 0.25, 1.362]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh className="Rod" position={rodPosition}>
        <cylinderGeometry args={[0.452, 0.452, rodLength, 32]} />{" "}
        {/* radiusTop, radiusBottom, length, radialSegments */}
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};

export default CVRInnerChassis;

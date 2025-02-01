import React from 'react';

const facePlatePosition = [18,41,0]

const MortiseCase = ({ position }) => {
  return (
    <group>
    <mesh position={position}>
      <boxGeometry args={[4,5.69,1.125]} />
      <meshStandardMaterial color="white" />
    </mesh>
    <mesh position={facePlatePosition}>
      <boxGeometry args={[.1,8,1.125]} />
      <meshStandardMaterial color="white" />
    </mesh>

    </group>
  );
};

export default MortiseCase;

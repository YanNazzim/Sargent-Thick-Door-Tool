import React from 'react';

const CVRBottomCase = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[4.375,1.3125,1.3125]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

export default CVRBottomCase;

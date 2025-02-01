import React from 'react';

const CVRRods = ({ position, length }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.2, 0.2, length, 32]} /> {/* radiusTop, radiusBottom, length, radialSegments */}
      <meshStandardMaterial color="black" />
    </mesh>
  );
};

export default CVRRods;

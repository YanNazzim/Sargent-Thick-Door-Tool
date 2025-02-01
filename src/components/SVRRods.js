import React from 'react';

const SVRRods = ({ position, length }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.3, 0.3, length, 32]} /> {/* radiusTop, radiusBottom, length, radialSegments */}
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export default SVRRods;

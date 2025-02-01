import React from 'react';
// eslint-disable-next-line no-unused-vars
import { CSG } from '@react-three/csg';

const Hole = ({ radius = 0.5, depth = 1, position = [0, 0, 0] }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[radius, radius, depth, 32]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

export default Hole;

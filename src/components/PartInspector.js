import React, { useMemo } from 'react';
import { useGLTF, OrbitControls, Bounds } from '@react-three/drei';
import * as THREE from 'three';

export default function PartInspector({ partName }) {
  const { nodes } = useGLTF('/models/AnimatedDoorAssembly.glb');
  
  // Find the exact piece the user clicked based on the Blender node name
  const node = nodes[partName];

  const clonedScene = useMemo(() => {
    if (!node) return null;
    
    // 1. Deep clone so we don't mess up the main background door
    const clone = node.clone();

    // 2. Wipe out any location/rotation data inherited from the table layout
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, 0, 0);
    clone.scale.set(1, 1, 1);

    // 3. Find the true, exact geometric center of the part's mass
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // 4. Force the actual geometry to shift back to dead-center (0,0,0)
    // We traverse and shift the vertices mathematically so it spins perfectly
    clone.traverse((child) => {
      if (child.isMesh) {
        child.geometry = child.geometry.clone(); // Protect the original file
        child.geometry.translate(-center.x, -center.y, -center.z);
      }
    });

    return clone;
  }, [node]);

  if (!clonedScene) return <mesh />;

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      
      {/* makeDefault ensures the controls only affect this modal canvas */}
      <OrbitControls autoRotate autoRotateSpeed={1.5} makeDefault />
      
      {/* Bounds handles the zoom perfectly now that the origin is fixed */}
      <Bounds fit clip observe margin={1.2}>
        <primitive object={clonedScene} />
      </Bounds>
    </>
  );
}
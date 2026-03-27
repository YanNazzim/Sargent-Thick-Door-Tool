import React, { useMemo, useRef } from 'react';
import { useGLTF, OrbitControls, Bounds, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { partGroups } from '../partData';

const cleanName = (str) => (str ? str.replace(/[\s_\-.]/g, '').toLowerCase() : '');

export default function PartInspector({ assemblyName, activeSubPart, onSubPartClick }) {
  const { nodes } = useGLTF('/models/AnimatedDoorAssembly.glb?inspector');
  const groupRef = useRef();

  const assembledGroup = useMemo(() => {
    const group = new THREE.Group();
    const expectedKeys = Object.keys(partGroups).filter(name => partGroups[name] === assemblyName);

    Object.keys(nodes).forEach((actualNodeName) => {
      const cleanActual = cleanName(actualNodeName);
      const isPartOfAssembly = expectedKeys.some(expected => cleanName(expected) === cleanActual);
      const isStandalonePart = cleanActual === cleanName(assemblyName);

      if (isPartOfAssembly || isStandalonePart) {
        const node = nodes[actualNodeName];
        if (node && (node.isMesh || node.type === 'Mesh' || node.type === 'Object3D')) {
          const clone = node.clone();
          
          clone.traverse((child) => {
            if (child.isMesh && child.material) {
              child.material = child.material.clone();
              child.material.transparent = true;
              child.userData.originalOpacity = child.material.opacity !== undefined ? child.material.opacity : 1;
            }
          });

          group.add(clone);
        }
      }
    });

    const box = new THREE.Box3().setFromObject(group);
    
    if (!box.isEmpty()) {
      const center = new THREE.Vector3();
      box.getCenter(center);
      
      group.children.forEach(child => {
          child.position.sub(center); 
          child.userData.originalPosition = child.position.clone();
      });
    }

    return group;
  }, [assemblyName, nodes]);

  useFrame(() => {
    if (!groupRef.current) return;
    
    groupRef.current.children.forEach((child) => {
      if (activeSubPart) {
        const isActive = cleanName(child.name) === cleanName(activeSubPart);
        
        if (isActive) {
          child.position.lerp(new THREE.Vector3(0, 0, 0), 0.1);
          child.traverse((c) => {
            if (c.isMesh && c.material) {
              c.material.opacity = THREE.MathUtils.lerp(c.material.opacity, c.userData.originalOpacity || 1, 0.1);
            }
          });
        } else {
          const pushedPos = child.userData.originalPosition.clone().multiplyScalar(1.5);
          child.position.lerp(pushedPos, 0.1);
          child.traverse((c) => {
            if (c.isMesh && c.material) {
              c.material.opacity = THREE.MathUtils.lerp(c.material.opacity, 0.15, 0.1);
            }
          });
        }
      } else {
        child.position.lerp(child.userData.originalPosition, 0.1);
        child.traverse((c) => {
          if (c.isMesh && c.material) {
            c.material.opacity = THREE.MathUtils.lerp(c.material.opacity, c.userData.originalOpacity || 1, 0.1);
          }
        });
      }
    });
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (onSubPartClick && e.object.name) {
      onSubPartClick(e.object.name);
    }
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
  };

  if (!assembledGroup || assembledGroup.children.length === 0) return <mesh />;

  return (
    <>
      <ambientLight intensity={0.9} /> 
      <directionalLight position={[10, 10, 10]} intensity={1.2} /> 
      
      <Environment preset="city" /> 
      
      <OrbitControls autoRotate={!activeSubPart} autoRotateSpeed={1.0} makeDefault />
      
      <Bounds fit clip observe margin={1.2}>
        <primitive 
          ref={groupRef}
          object={assembledGroup} 
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />
      </Bounds>
    </>
  );
}

useGLTF.preload('/models/AnimatedDoorAssembly.glb?inspector');
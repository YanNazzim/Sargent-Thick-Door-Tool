import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export default function AnimatedDoorModel({ isExplodedView, onPartClick, ...props }) {
  const group = useRef();
  
  const { scene, animations } = useGLTF('/models/AnimatedDoorAssembly.glb');
  
  // 'names' contains the list of every single animation track Blender exported
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // Loop through EVERY animation and play them all at the exact same time
    names.forEach((animName) => {
      const action = actions[animName];
      
      if (action) {
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true; // Stop at the last frame so they don't snap back
        
        if (isExplodedView) {
          // Play forward (explode)
          action.paused = false;
          action.timeScale = 1;
          action.play();
        } else {
          // Play backward (assemble)
          // Only play backward if it has already been moved forward
          if (action.time > 0) {
            action.paused = false;
            action.timeScale = -1;
            action.play();
          }
        }
      }
    });
  }, [isExplodedView, actions, names]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (onPartClick) {
      onPartClick(e.object.name || 'Unnamed Part');
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

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive 
        object={scene} 
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </group>
  );
}

useGLTF.preload('/models/AnimatedDoorAssembly.glb');
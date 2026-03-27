import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export default function AnimatedDoorModel({ isExplodedView, onPartClick, ...props }) {
  const group = useRef();
  
  const { scene, animations } = useGLTF('/models/AnimatedDoorAssembly.glb');
  
  // 'names' contains the list of every single animation track Blender exported
  const { actions, names } = useAnimations(animations, group);

  // --- NEW: Change Door & Frame Colors ---
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const lowerName = child.name.toLowerCase();
        
        // Target the door and frame meshes specifically
        if (lowerName.includes('door') || lowerName.includes('frame')) {
          // Clone the material so we don't accidentally colorize shared materials
          child.material = child.material.clone();
          
          // Change the color to a dark charcoal gray
          child.material.color = new THREE.Color('#2a2a2a');
          
          // Increase roughness so the door isn't shiny (prevents glare)
          child.material.roughness = 0.9;
          child.material.metalness = 0.1;
        }
      }
    });
  }, [scene]);
  // ---------------------------------------

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
import React from "react";

const Door = ({ hideDoor, hideFrame, ghostFrame, thickness = 1.75 }) => {
  const MAX_THICKNESS = 5;
  const doorThickness = Math.min(thickness, MAX_THICKNESS); // Limit thickness to 5"

  // Frame dimensions
  const frameThickness = 1.5; // Thickness of the frame
  const frameZExtension = 1.0; // Extra frame depth on each side of the door
  const outerWidth = 36 + frameThickness; // Total width of the frame
  const outerHeight = 84 + frameThickness; // Total height of the frame
  const frameDepth = doorThickness + 2 * frameZExtension; // Frame depth beyond the door

  // Calculate Y offset to align bottom of the door to y = 0
  const yOffset = outerHeight / 2;

  return (
    <group>
      {/* Full Door */}
      {!hideDoor && (
        <mesh position={[0, yOffset, 0]} castShadow>
          <boxGeometry args={[36, 84, doorThickness]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      )}

      {/* Door with Cutout */}
      {hideDoor && (
        <mesh position={[0, yOffset, 0]} castShadow>
          <boxGeometry args={[36, 84, doorThickness]} />
          <meshStandardMaterial
            color="black"
            transparent
            opacity={0.3} // Optional transparency for the door
          />
        </mesh>
      )}

      {/* Hollow Frame */}
      {!hideFrame && (
        <group>
          {/* Top Frame */}
          <mesh
            position={[0, outerHeight - frameThickness / 2, 0]}
            castShadow
          >
            <boxGeometry args={[outerWidth, frameThickness, frameDepth]} />
            <meshStandardMaterial
              color={ghostFrame ? "Gray" : "Black"}
              transparent={ghostFrame}
              opacity={ghostFrame ? 0.5 : 1.0}
            />
          </mesh>

          {/* Bottom Frame */}
          <mesh
            position={[0, frameThickness / 2, 0]}
            castShadow
          >
            <boxGeometry args={[outerWidth, frameThickness, frameDepth]} />
            <meshStandardMaterial
              color={ghostFrame ? "Gray" : "Black"}
              transparent={ghostFrame}
              opacity={ghostFrame ? 0.5 : 1.0}
            />
          </mesh>

          {/* Left Frame */}
          <mesh
            position={[-outerWidth / 2, yOffset, 0]}
            castShadow
          >
            <boxGeometry args={[frameThickness, outerHeight, frameDepth]} />
            <meshStandardMaterial
              color={ghostFrame ? "Gray" : "Black"}
              transparent={ghostFrame}
              opacity={ghostFrame ? 0.5 : 1.0}
            />
          </mesh>

          {/* Right Frame */}
          <mesh
            position={[outerWidth / 2, yOffset, 0]}
            castShadow
          >
            <boxGeometry args={[frameThickness, outerHeight, frameDepth]} />
            <meshStandardMaterial
              color={ghostFrame ? "Gray" : "Black"}
              transparent={ghostFrame}
              opacity={ghostFrame ? 0.5 : 1.0}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default Door;

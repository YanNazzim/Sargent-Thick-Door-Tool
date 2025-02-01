import React from "react";

const Spindle = ({ position, thickness }) => {
  // Base length for the spindle
  const baseLength = 2.78; // Example base length (adjust as needed)
  
  // Calculate the extra length based on the door thickness
  const extraLength = thickness - 1.75; // Additional length for thicker doors
  
  // Ensure that the Z position stays the same by adjusting the length only
  const spindleLength = baseLength + extraLength;

  // Ensure the position keeps the Z axis fixed (assuming you want it to stay centered on the door)
  const zPosition = position[2]; // Keep the Z position constant
  
  return (
    <mesh position={[position[0], position[1], zPosition]}>
      <boxGeometry args={[0.3, 0.3, spindleLength]} /> {/* Adjust spindle geometry */}
      <meshStandardMaterial color="white" />
    </mesh>
  );
};


export default Spindle;

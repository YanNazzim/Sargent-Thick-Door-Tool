import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import AnimatedDoorModel from "./components/AnimatedDoorModel";
import PartInspector from "./components/PartInspector";
import "./App.css";

// Updated Mock Database
const partDatabase = {
  "Chassis": { partNo: "88-CH", desc: "Central locking mechanism for the 8800 series exit device.", price: "$145.00" },
  "RailPush": { partNo: "88-PR", desc: "Main push bar for emergency egress.", price: "$85.00" },
  "ETTrim": { partNo: "ET-73", desc: "Outside trim with cylinder and lever control.", price: "$210.00" },
};

function App() {
  const [isExplodedView, setIsExplodedView] = useState(false);
  const [inspectedPart, setInspectedPart] = useState(null);

  const handlePartClick = (partName) => {
    const lowerName = partName.toLowerCase();
    const isTablePart = lowerName.includes('door') || lowerName.includes('frame');

    if (isExplodedView && !isTablePart) {
      setInspectedPart(partName);
    }
  };

  const toggleViewMode = () => {
    setIsExplodedView((prev) => !prev);
    setInspectedPart(null); 
  };

  const putDownPart = () => {
    setInspectedPart(null);
  };

  // Look up data for the clicked part, or provide a generic fallback without exposing the raw node name
  const currentPartData = inspectedPart ? (partDatabase[inspectedPart] || { 
    partNo: "N/A", 
    desc: "Technical data and dimensions unavailable for this component.",
    price: "Call for Pricing"
  }) : null;

  return (
    <div className="app-container">
      {/* Floating Controls */}
      <div className="ui-overlay">
        <h1>Sargent Interactive Visualizer</h1>
        <button className="view-toggle-button" onClick={toggleViewMode}>
          {isExplodedView ? "Assemble Door" : "Lay Out on Table"}
        </button>
        <p style={{ marginTop: '15px', color: '#aaa', fontSize: '0.9em' }}>
          {isExplodedView ? "Click any part to pick it up and inspect it." : "Switch to table layout to interact with parts."}
        </p>
      </div>

      {/* Main Background Canvas */}
      <Suspense fallback={<div className="loading-screen">Loading Assembly...</div>}>
        <Canvas className="viewer-canvas" camera={{ position: [50, 50, 50], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Environment preset="city" /> 
          <OrbitControls makeDefault />
          
          <AnimatedDoorModel 
            isExplodedView={isExplodedView} 
            onPartClick={handlePartClick} 
            position={[0, -20, 0]} 
            scale={30} 
          />
        </Canvas>
      </Suspense>

      {/* Inspection Modal Overlay */}
      {inspectedPart && (
        <div className="inspection-modal">
          <div className="inspection-content">
            
            <div className="inspection-canvas-container">
              {/* Accessibility Control Hints */}
              <div className="controls-hint">
                🖱️ Left Click to Rotate &nbsp;|&nbsp; 📜 Scroll to Zoom
              </div>
              
              <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
                <Suspense fallback={null}>
                  <PartInspector partName={inspectedPart} />
                </Suspense>
              </Canvas>
            </div>

            <div className="inspection-data">
              <div className="data-field">
                <span className="data-label">Part #</span>
                <span className="data-value">{currentPartData.partNo}</span>
              </div>
              
              <div className="data-field">
                <span className="data-label">Description</span>
                <span className="data-value">{currentPartData.desc}</span>
              </div>
              
              <div className="data-field">
                <span className="data-label">Price</span>
                <span className="data-value price-tag">{currentPartData.price}</span>
              </div>

              <button className="put-down-button" onClick={putDownPart}>
                Put Down
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
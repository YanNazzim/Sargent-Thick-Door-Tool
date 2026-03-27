import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import AnimatedDoorModel from "./components/AnimatedDoorModel";
import PartInspector from "./components/PartInspector";
import { partDatabase, partGroups } from "./partData";
import "./App.css";

const cleanName = (str) => (str ? str.replace(/[\s_\-.]/g, '').toLowerCase() : '');

function App() {
  const [isExplodedView, setIsExplodedView] = useState(false);
  const [inspectedAssembly, setInspectedAssembly] = useState(null);
  const [inspectedSubPart, setInspectedSubPart] = useState(null); 

  const handleMainPartClick = (meshName) => {
    const lowerName = meshName.toLowerCase();
    const isTablePart = lowerName.includes('door') || lowerName.includes('frame');

    if (isExplodedView && !isTablePart) {
      const cleanTarget = cleanName(meshName);
      let groupName = meshName; 
      
      for (const [key, group] of Object.entries(partGroups)) {
        if (cleanName(key) === cleanTarget) {
          groupName = group;
          break;
        }
      }
      
      setInspectedAssembly(groupName);
      setInspectedSubPart(null); 
    }
  };

  const handleSubPartClick = (partName) => {
    let resolvedKey = partName;
    const cleanTarget = cleanName(partName);
    
    for (const key of Object.keys(partGroups)) {
       if (cleanName(key) === cleanTarget) {
         resolvedKey = key;
         break;
       }
    }
    setInspectedSubPart(resolvedKey);
  };

  const toggleViewMode = () => {
    setIsExplodedView((prev) => !prev);
    setInspectedAssembly(null); 
    setInspectedSubPart(null);
  };

  const putDownPart = () => {
    setInspectedAssembly(null);
    setInspectedSubPart(null);
  };

  const displayedPartKey = inspectedSubPart || inspectedAssembly;
  const currentDisplayData = displayedPartKey ? (partDatabase[displayedPartKey] || { 
    name: displayedPartKey.replace(/^[0-9-]+\s/, ''),
    partNo: "N/A", 
    desc: "Technical data unavailable.",
    price: "Call for Pricing"
  }) : null;

  const includedParts = inspectedAssembly 
    ? Object.keys(partGroups).filter(key => partGroups[key] === inspectedAssembly)
    : [];

  return (
    <div className="app-container">
      <div className="ui-overlay">
        <h1>Sargent Interactive Visualizer</h1>
        <button className="view-toggle-button" onClick={toggleViewMode}>
          {isExplodedView ? "Assemble Door" : "Lay Out on Table"}
        </button>
        <p style={{ marginTop: '15px', color: '#aaa', fontSize: '0.9em' }}>
          {isExplodedView ? "Click any part to pick up the assembly." : "Switch to table layout to interact with parts."}
        </p>
      </div>

      <Suspense fallback={<div className="loading-screen">Loading Assembly...</div>}>
        <Canvas className="viewer-canvas" camera={{ position: [50, 50, 50], fov: 50 }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <Environment preset="city" /> 
          
          <OrbitControls makeDefault />
          <AnimatedDoorModel 
            isExplodedView={isExplodedView} 
            onPartClick={handleMainPartClick} 
            position={[0, -20, 0]} 
            scale={30} 
          />
        </Canvas>
      </Suspense>

      {inspectedAssembly && (
        <div className="inspection-modal">
          <div className="inspection-content">
            
            <div className="inspection-canvas-container">
              <div className="controls-hint">
                🖱️ Left Click Parts &nbsp;|&nbsp; 📜 Scroll to Zoom
              </div>
              <Canvas camera={{ position: [0, 0, 15], fov: 40 }}>
                <Suspense fallback={null}>
                  <PartInspector 
                    assemblyName={inspectedAssembly} 
                    activeSubPart={inspectedSubPart}
                    onSubPartClick={handleSubPartClick} 
                  />
                </Suspense>
              </Canvas>
            </div>

            <div className="inspection-data">
              <div className="assembly-header">
                {inspectedSubPart && (
                  <button 
                    onClick={() => setInspectedSubPart(null)} 
                    style={{ fontSize: '0.85rem', marginBottom: '12px', background: 'none', border: '1px solid #777', color: '#ccc', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    ← Back to Complete Assembly
                  </button>
                )}
                
                <h2>{currentDisplayData.name}</h2>
                <div className="assembly-top-data">
                  <span><strong>Part #:</strong> {currentDisplayData.partNo}</span>
                  <span className="price-tag">{currentDisplayData.price}</span>
                </div>
                <p className="assembly-desc">{currentDisplayData.desc}</p>
              </div>

              <div className="bom-section">
                <h3>Components Included</h3>
                <div className="bom-list">
                  {includedParts.map((partKey) => {
                    const pData = partDatabase[partKey] || { name: partKey.replace(/^[0-9-]+\s/, ''), partNo: "N/A", price: "N/A" };
                    if (partKey === inspectedAssembly) return null; 
                    
                    const isActive = cleanName(inspectedSubPart) === cleanName(partKey);

                    return (
                      <div 
                        className="bom-item" 
                        key={partKey}
                        onClick={() => handleSubPartClick(partKey)}
                        style={{ 
                          cursor: 'pointer', 
                          backgroundColor: isActive ? '#3a3a3a' : 'transparent',
                          padding: '12px 10px',
                          margin: '0 -10px',
                          borderRadius: '6px',
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        <div className="bom-item-details">
                          <span className="bom-item-name" style={{ color: isActive ? '#fff' : '#eee' }}>{pData.name}</span>
                          <span className="bom-item-partno">PN: {pData.partNo}</span>
                        </div>
                        <span className="bom-item-price">{pData.price}</span>
                      </div>
                    );
                  })}
                </div>
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
import React, { useState, Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PartNumbers from "./components/PartNumbers";
import "./App.css";
import { thicknessOptions, deviceLists, functionLists } from "./components/thickDoorData";

// Lazy-load heavy 3D components to improve initial load time
const Door = lazy(() => import("./components/Door"));
const Rail = lazy(() => import("./components/Rail"));
const ETTrim = lazy(() => import("./components/ETTrim"));
const Screws = lazy(() => import("./components/Screws"));
const SquareSpindle = lazy(() => import("./components/SquareSpindle"));
const CrossSpindle = lazy(() => import("./components/CrossSpindle"));
const Chassis = lazy(() => import("./components/Chassis"));
const Cover = lazy(() => import("./components/Cover"));
const CVRTopCase = lazy(() => import("./components/CVRTopCase"));
const CVRBottomCase = lazy(() => import("./components/CVRBottomCase"));
const SVRTopCase = lazy(() => import("./components/SVRTopCase"));
const SVRBottomCase = lazy(() => import("./components/SVRBottomCase"));
const CVRRods = lazy(() => import("./components/CVRRods"));
const SVRRods = lazy(() => import("./components/SVRRods"));
const CVRInnerChassis = lazy(() => import("./components/CVRInnerChassis"));
const MortiseCase = lazy(() => import("./components/MortiseCase"));


function App() {
  const [state, setState] = useState({
    thickness: '1.75"',
    lockType: "Rim",
    deviceType: "8800",
    functionType: "13",
    visibleObjects: {
      Rail: true,
      Trim: true,
      Screws: true,
      Spindle: true,
      Chassis: true,
      "Chassis Cover": true,
      "Mortise Case": true,
      "Inner Chassis": true,
      "Top Rod": true,
      "Bottom Rod": true,
      "Ghost Door": true,
      "Ghost Frame": true,
    },
    isDarkMode: false,
    isExpanded: false, // This now controls the modal's visibility
  });

  const { thickness, lockType, deviceType, functionType, visibleObjects, isDarkMode, isExpanded } = state;

  const updateState = (key, value) => setState((prev) => ({ ...prev, [key]: value }));

  const handleLockTypeChange = (e) => {
    const selectedLockType = e.target.value;
    const devices = deviceLists[selectedLockType] || [];
    const firstDevice = devices.length > 0 ? devices[0] : "";
    const availableFunctions = functionLists[firstDevice] || [];
    const firstFunction = availableFunctions.length > 0 ? availableFunctions[0] : "";

    updateState("lockType", selectedLockType);
    updateState("deviceType", firstDevice);
    updateState("functionType", firstFunction);
  };

  const handleDeviceTypeChange = (e) => {
    const selectedDevice = e.target.value;
    const availableFunctions = functionLists[selectedDevice] || [];
    const firstFunction = availableFunctions.length > 0 ? availableFunctions[0] : "";

    updateState("deviceType", selectedDevice);
    updateState("functionType", firstFunction);
  };

  const handleFunctionTypeChange = (e) => updateState("functionType", e.target.value);
  const handleThicknessChange = (e) => updateState("thickness", e.target.value);
  const handleVisibilityChange = (e) => {
    const { name, checked } = e.target;
    updateState("visibleObjects", { ...visibleObjects, [name]: checked });
  };

  const openModal = () => {
    updateState("isExpanded", true);
  };
  const closeModal = () => {
    updateState("isExpanded", false);
  };

  const zOffset = parseFloat(thickness) / 2;

  // Reusable 3D scene rendering function
  const renderScene = () => (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[54, 10, 5]} intensity={1.5} />
      <Door hideDoor={visibleObjects["Ghost Door"]} hideFrame={visibleObjects["Ghost Frame"]} thickness={parseFloat(thickness)} />
      {visibleObjects["Chassis"] && <Chassis position={[15.25, 0, 0.375 + zOffset]} />}
      {lockType === "Mortise" && visibleObjects["Mortise Case"] && <MortiseCase position={[15.975, 41, 0]} />}
      {lockType === "CVR" && visibleObjects["Inner Chassis"] && <CVRInnerChassis position={[15.25, 41, 0]} />}
      {lockType === "CVR" && <CVRTopCase position={[15.25, 83.5, 0 + zOffset]} />}
      {lockType === "CVR" && <CVRBottomCase position={[15.25, 2, -.875 + zOffset]} />}
      {lockType === "SVR" && <SVRTopCase position={[15.25, 82, 0.6 + zOffset]} />}
      {lockType === "SVR" && <SVRBottomCase position={[15.25, 2, 0.6 + zOffset]} />}
      {lockType === "CVR" && visibleObjects["Top Rod"] && <CVRRods position={[15.25, 61.5, 0]} length={41} />}
      {lockType === "CVR" && visibleObjects["Bottom Rod"] && <CVRRods position={[15.25, 21.5, 0]} length={39} />}
      {lockType === "SVR" && visibleObjects["Top Rod"] && <SVRRods position={[15.25, 61.5, 0.5 + zOffset]} length={41} />}
      {lockType === "SVR" && visibleObjects["Bottom Rod"] && <SVRRods position={[15.25, 21.5, 0.5 + zOffset]} length={39} />}
      {visibleObjects["Chassis Cover"] && <Cover position={[15.25, 41, 0 + zOffset]} />}
      {visibleObjects["Rail"] && <Rail position={[0, 0, -1 + zOffset]} scale={[40, 40, 40]} rotations={{ insert: [0, Math.PI / 2, Math.PI / 2], push: [Math.PI / 2, Math.PI / 2, 0], mounting: [0, Math.PI / 2, Math.PI / 2] }} />}
      {visibleObjects["Trim"] && <ETTrim position={[15.25, 40.7875, 0.03 - zOffset]} />}
      {visibleObjects["Screws"] && <Screws topPosition={[15.25, 43.5375, 0.025 + zOffset]} bottomPosition={[15.25, 38.45, 0.025 + zOffset]} thickness={parseFloat(thickness)} />}
      {visibleObjects["Spindle"] && (
        <group>
          <SquareSpindle position={[15.25, 39.7875, -0.125 - zOffset]} thickness={parseFloat(thickness)} />
          <CrossSpindle position={[15.25, 39.7875, -0.125 - zOffset]} thickness={parseFloat(thickness)} />
        </group>
      )}
    </>
  );

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      
      <h1 style={{ fontSize: "1.5em", marginBottom: "20px" }}>Sargent Thick Door Tool</h1>

      {/* Options Panel */}
      <div className="panel">
        <h2 style={{ fontSize: "1em", marginBottom: "15px" }}>Options</h2>
        <Dropdown
          label="Exit Device"
          value={lockType}
          options={Object.keys(deviceLists)}
          onChange={handleLockTypeChange}
        />
        <Dropdown
          label="Model:"
          value={deviceType}
          options={deviceLists[lockType] || []}
          onChange={handleDeviceTypeChange}
        />
        <Dropdown
          label="Function:"
          value={functionType}
          options={functionLists[deviceType] || []}
          onChange={handleFunctionTypeChange}
        />
        <Dropdown
          label="Door Thickness:"
          value={thickness}
          options={thicknessOptions.map((opt) => `${opt.value} (${opt.label})`)}
          onChange={handleThicknessChange}
        />
        <div style={{ margin: "20px 0", fontSize: "1em", fontWeight: "bold" }}>
          Device Shown: {lockType && deviceType && functionType ? `${deviceType.slice(0, -2)}${functionType}` : "Select all options"}
        </div>
        
        {/* New button to launch the modal */}
        <button onClick={openModal} className="view-config-button">
          View this config in 3D
        </button>
      </div>

      {/* Part Numbers Panel */}
      <div className="panel">
        <h2 style={{ fontSize: "1em", marginBottom: "15px" }}>Part Numbers</h2>
        <PartNumbers thickness={thickness} />
      </div>

      {/* Full-screen Modal Viewer */}
      {isExpanded && (
        <div className={`viewer-modal ${isExpanded ? 'expanded' : ''}`}>
          <button onClick={closeModal} className="icon-button viewer-modal-close-button">
            ✖
          </button>
          <div className="viewer-modal-content">
            <Suspense fallback={<div className="loading-modal">Loading...</div>}>
              {/* Main 3D Canvas in Modal */}
              <Canvas className="viewer-canvas" camera={{ position: [55, 55, 55] }}>
                <OrbitControls />
                {renderScene()}
              </Canvas>
            </Suspense>
            {/* Visibility Panel inside the modal */}
            <div className="panel modal-panel">
              <h2 style={{ fontSize: "1em", marginBottom: "15px" }}>Visibility</h2>
              <div className="checkbox-grid">
                {Object.keys(visibleObjects).map((key) => (
                  <Checkbox key={key} label={key} checked={visibleObjects[key]} onChange={handleVisibilityChange} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Dropdown Component
const Dropdown = ({ label, value, options, onChange }) => (
  <div className="dropdown-container">
    <label>
      {label}
      <select value={value} onChange={onChange} className="dropdown-select">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  </div>
);

// Reusable Checkbox Component
const Checkbox = ({ label, checked, onChange }) => (
  <div className="checkbox-container">
    <label>
      <input type="checkbox" name={label} checked={checked} onChange={onChange} />
      {label}
    </label>
  </div>
);

export default App;

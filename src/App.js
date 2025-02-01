import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import DarkModeToggle from "./components/DarkModeToggle";
import Door from "./components/Door";
import Rail from "./components/Rail";
import ETTrim from "./components/ETTrim";
import Screws from "./components/Screws";
import SquareSpindle from "./components/SquareSpindle";
import CrossSpindle from "./components/CrossSpindle";
import Chassis from "./components/Chassis";
import Cover from "./components/Cover";
import CVRTopCase from "./components/CVRTopCase";
import SVRTopCase from "./components/SVRTopCase";
import SVRBottomCase from "./components/SVRBottomCase";
import CVRRods from "./components/CVRRods";
import SVRRods from "./components/SVRRods";
import PartNumbers from "./components/PartNumbers";
import CVRInnerChassis from "./components/CVRInnerChassis";
import MortiseCase from "./components/MortiseCase";
import { thicknessOptions, deviceLists, functionLists } from "./components/thickDoorData";

// Constants for styles
const styles = {
  panel: (isPanelVisible, isDarkMode) => ({
    width: isPanelVisible ? "40vw" : "0", // Always 40% of the viewport width
    maxWidth: "400px", // Limit maximum width for very large screens
    minWidth: isPanelVisible ? "300px" : "0", // Minimum width for smaller screens
    overflow: "hidden", // Hide overflow when panel is closed
    padding: isPanelVisible ? "25px" : "0",
    transition: "all 0.3s ease-in-out", // Smooth transition
    backgroundColor: isDarkMode ? "#1e1e1e" : "#f4f4f4",
    color: isDarkMode ? "#f4f4f4" : "#333",
    borderRight: isPanelVisible ? "2px solid #444" : "none",
    boxShadow: isPanelVisible ? "4px 0 8px rgba(0, 0, 0, 0.5)" : "none",
    position: "relative",
  }),
  button: (isDarkMode) => ({
    background: isDarkMode ? "#333" : "#aaaaaa",
    color: isDarkMode ? "#fff" : "black",
    border: "none",
    borderRadius: "50%",
    padding: "15px",
    fontSize: "1.5em",
    cursor: "pointer",
  }),
  dropdown: (isDarkMode) => ({
    marginLeft: "10px",
    minWidth: "8vw",
    borderRadius: "25px",
    padding: "10px",
    fontSize: "1em",
    textAlign: "center",
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#333",
  }),
};

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
    isPanelVisible: true,
    isDarkMode: false,
  });

  const { thickness, lockType, deviceType, functionType, visibleObjects, isPanelVisible, isDarkMode } = state;

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

  const zOffset = parseFloat(thickness) / 2;

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      {/* Hamburger Menu */}
      {!isPanelVisible && (
        <button
          onClick={() => updateState("isPanelVisible", true)}
          style={{ ...styles.button(isDarkMode), position: "absolute", top: "20px", left: "20px", zIndex: 1000 }}
        >
          ☰
        </button>
      )}

      {/* Controls Panel */}
      <div style={styles.panel(isPanelVisible, isDarkMode)}>
        {isPanelVisible && (
          <>
            <button
              onClick={() => updateState("isPanelVisible", false)}
              style={{ ...styles.button(isDarkMode), position: "absolute", top: "20px", right: "20px", zIndex: 1000 }}
            >
              ✖
            </button>

            <h1 style={{ fontSize: "2.5em", marginBottom: "20px" }}>Sargent Thick Door Tool</h1>

            {/* Dropdowns */}
            <Dropdown
              label="Exit Device"
              value={lockType}
              options={Object.keys(deviceLists)}
              onChange={handleLockTypeChange}
              style={styles.dropdown(isDarkMode)}
            />
            <Dropdown
              label="Model:"
              value={deviceType}
              options={deviceLists[lockType] || []}
              onChange={handleDeviceTypeChange}
              style={styles.dropdown(isDarkMode)}
            />
            <Dropdown
              label="Function:"
              value={functionType}
              options={functionLists[deviceType] || []}
              onChange={handleFunctionTypeChange}
              style={styles.dropdown(isDarkMode)}
            />

            {/* Door Thickness */}
            <Dropdown
              label="Door Thickness:"
              value={thickness}
              options={thicknessOptions.map((opt) => `${opt.value} (${opt.label})`)}
              onChange={handleThicknessChange}
              style={styles.dropdown(isDarkMode)}
            />

            <div style={{ margin: "20px", fontSize: "1.5em" }}>
              Device Shown: {lockType && deviceType && functionType ? `${deviceType.slice(0, -2)}${functionType}` : "Select all options"}
            </div>

            {/* Visibility Checkboxes */}
            <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "15px" }}>
              {Object.keys(visibleObjects).map((key) => (
                <Checkbox key={key} label={key} checked={visibleObjects[key]} onChange={handleVisibilityChange} />
              ))}
            </div>
          </>
        )}
      </div>

      <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={(value) => updateState("isDarkMode", value)} />

      {/* 3D Canvas */}
      <div style={{ flex: "1", transition: "all 0.3s ease", paddingLeft: isPanelVisible ? "0" : "20px" }}>
        <Canvas camera={{ position: [55, 55, 55] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[54, 10, 5]} intensity={1.5} />
          <Door hideDoor={visibleObjects["Ghost Door"]} hideFrame={visibleObjects["Ghost Frame"]} thickness={parseFloat(thickness)} />
          {visibleObjects["Chassis"] && <Chassis position={[15.25, 0, 0.375 + zOffset]} />}
          {lockType === "Mortise" && visibleObjects["Mortise Case"] && <MortiseCase position={[15.975, 41, 0]} />}
          {lockType === "CVR" && visibleObjects["Inner Chassis"] && <CVRInnerChassis position={[15.25, 41, 0]} />}
          {lockType === "CVR" && <CVRTopCase position={[15.25, 82.05, 0 + zOffset]} />}
          {lockType === "SVR" && <SVRTopCase position={[15.25, 39.7, 0.6 + zOffset]} />}
          {lockType === "SVR" && <SVRBottomCase position={[15.25, -39, 0.6 + zOffset]} />}
          {lockType === "CVR" && visibleObjects["Top Rod"] && <CVRRods position={[15.25, 20, 0]} length={36.75} />}
          {lockType === "CVR" && visibleObjects["Bottom Rod"] && <CVRRods position={[15.25, -22, 0]} length={36} />}
          {lockType === "SVR" && visibleObjects["Top Rod"] && <SVRRods position={[15.25, 20, 0.5 + zOffset]} length={36.5} />}
          {lockType === "SVR" && visibleObjects["Bottom Rod"] && <SVRRods position={[15.25, -19, 0.5 + zOffset]} length={36} />}
          {visibleObjects["Chassis Cover"] && <Cover position={[15.25, 41, 0 + zOffset]} />}
          {visibleObjects["Rail"] && <Rail position={[0, 0, -1 + zOffset]} scale={[40, 40, 40]} rotations={{ insert: [0, Math.PI / 2, Math.PI / 2], push: [Math.PI / 2, Math.PI / 2, 0], mounting: [0, Math.PI / 2, Math.PI / 2] }} />}
          {visibleObjects["Trim"] && <ETTrim position={[15.25, 40.7875, 0.03 - zOffset]} />}
          {visibleObjects["Screws"] && <Screws topPosition={[15.25, 43.5375, 0.025 + zOffset]} bottomPosition={[15.25, 38.45, 0.025 + zOffset]} thickness={parseFloat(thickness)} />}
          {visibleObjects["Spindle"] && (
            <>
              <SquareSpindle position={[15.25, 39.7875, -0.125 - zOffset]} thickness={parseFloat(thickness)} />
              <CrossSpindle position={[15.25, 39.7875, -0.125 - zOffset]} thickness={parseFloat(thickness)} />
            </>
          )}
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

// Reusable Dropdown Component
const Dropdown = ({ label, value, options, onChange, style }) => (
  <div style={{ marginBottom: "20px" }}>
    <label style={{ fontSize: "1.5em", fontWeight: "bold" }}>
      {label}
      <select value={value} onChange={onChange} style={style}>
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
  <div>
    <label style={{ display: "flex", alignItems: "center", fontWeight: "bold", cursor: "pointer", border: "5px solid black", borderRadius: "25px", backgroundColor: "white", padding: "10px", fontSize: "1.5em" }}>
      <input type="checkbox" name={label} checked={checked} onChange={onChange} style={{ marginRight: "10px", width: "18px", height: "18px" }} />
      {label}
    </label>
  </div>
);

export default App;
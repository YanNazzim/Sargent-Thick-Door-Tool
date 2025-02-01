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

// Importing data from thickDoorData.js
import {
  thicknessOptions,
  deviceLists,
  functionLists,
} from "./components/thickDoorData";

function App() {
  const [thickness, setThickness] = useState('1.75"');
  const [lockType, setLockType] = useState("Rim");
  const [deviceType, setDeviceType] = useState("8800");
  const [functionType, setFunctionType] = useState("13"); // Added for function selection
  const [visibleObjects, setVisibleObjects] = useState({
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
  });
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLockTypeChange = (e) => {
    const selectedLockType = e.target.value;
    setLockType(selectedLockType);

    // Get the first available device for the selected lock type
    const devices = deviceLists[selectedLockType] || [];
    const firstDevice = devices.length > 0 ? devices[0] : "";

    setDeviceType(firstDevice);

    // Get the first available function for the first device
    const availableFunctions = functionLists[firstDevice] || [];
    const firstFunction =
      availableFunctions.length > 0 ? availableFunctions[0] : "";

    setFunctionType(firstFunction);
  };

  const handleDeviceTypeChange = (e) => {
    const selectedDevice = e.target.value;
    setDeviceType(selectedDevice);

    // Automatically set the first available function for the selected device
    const availableFunctions = functionLists[selectedDevice] || [];
    setFunctionType(availableFunctions.length > 0 ? availableFunctions[0] : "");
  };

  const handleFunctionTypeChange = (e) => setFunctionType(e.target.value);
  const handleThicknessChange = (e) => setThickness(e.target.value);
  const handleVisibilityChange = (e) => {
    const { name, checked } = e.target;
    setVisibleObjects((prev) => ({ ...prev, [name]: checked }));
  };

  const zOffset = parseFloat(thickness) / 2;

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      {/* Hamburger Menu */}
      {!isPanelVisible && (
        <button
          onClick={() => setIsPanelVisible(true)}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            zIndex: 1000,
            background: isDarkMode ? "#333" : "#aaaaaa",
            color: isDarkMode ? "#fff" : "black",
            border: "none",
            borderRadius: "50%",
            padding: "15px",
            fontSize: "1.5em",
            fontWeight: "bolder",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      )}

      {/* Controls Panel */}

      <div
        style={{
          width: isPanelVisible
            ? window.innerWidth >= 1024
              ? "30vw"
              : "60vw"
            : "0",
          overflow: isPanelVisible ? "auto" : "hidden",
          padding: isPanelVisible ? "25px" : "0",
          transition: "all 0.3s ease-in-out",
          backgroundColor: isDarkMode ? "#1e1e1e" : "#f4f4f4",
          color: isDarkMode ? "#f4f4f4" : "#333",
          borderRight: isPanelVisible ? "2px solid #444" : "none",
          boxSizing: "border-box",
          boxShadow: isPanelVisible ? "4px 0 8px rgba(0, 0, 0, 0.5)" : "none",
          position: "relative", // Ensure button is positioned relative to the panel
        }}
      >
        {isPanelVisible && (
          <>
            <button
              onClick={() => setIsPanelVisible(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 1000,
                background: isDarkMode ? "#333" : "#aaaaaa",
                color: isDarkMode ? "#fff" : "black",
                border: "none",
                borderRadius: "50%",
                padding: "15px",
                fontSize: "1.5em",
                cursor: "pointer",
              }}
            >
              ✖
            </button>

            <h1 style={{ fontSize: "2.5em", marginBottom: "20px" }}>
              Sargent Thick Door Tool
            </h1>

            {/* Dropdowns */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                Exit Device Type:
                <select
                  value={lockType}
                  onChange={handleLockTypeChange}
                  style={{
                    marginLeft: "10px",
                    minWidth: "8vw",
                    borderRadius: "25px",
                    padding: "10px",
                    fontSize: "1em",
                    textAlign: "Center",
                  }}
                >
                  {Object.keys(deviceLists).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                Model:
                <select
                  value={deviceType}
                  onChange={handleDeviceTypeChange}
                  style={{
                    marginLeft: "10px",
                    minWidth: "8vw",
                    padding: "10px",
                    borderRadius: "25px",
                    textAlign: "Center",
                    fontSize: "1em",
                  }}
                >
                  {(deviceLists[lockType] || []).map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                Function:
                <select
                  value={functionType}
                  onChange={handleFunctionTypeChange}
                  style={{
                    minWidth: "8vw",
                    textAlign: "Center",
                    marginLeft: "10px",
                    padding: "10px",
                    fontSize: "1em",
                    borderRadius: "25px",
                  }}
                >
                  {(functionLists[deviceType] || []).map((func) => (
                    <option key={func} value={func}>
                      {func}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Door Thickness */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                Door Thickness:
                <select
                  value={thickness}
                  onChange={handleThicknessChange}
                  style={{
                    marginLeft: "10px",
                    minWidth: "8vw",
                    textAlign: "Center",
                    padding: "10px",
                    fontSize: "1em",
                    borderRadius: "25px",
                    border: "1px solid #ccc",
                    backgroundColor: isDarkMode ? "#333" : "#fff",
                    color: isDarkMode ? "#fff" : "#333",
                  }}
                >
                  {thicknessOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value} ({option.label})
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div style={{ margin: "20px", fontSize: "1.5em" }}>
              Device Shown:{" "}
              {lockType && deviceType && functionType
                ? `${deviceType.slice(0, -2)}${functionType}` // Concatenate the device and function
                : "Select all options"}
              <PartNumbers thickness={thickness} />
            </div>
            {/* Checkboxes for visibility */}
            <div
              style={{
                marginTop: "20px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "15px",
                fontSize: "1em",
              }}
            >
              {Object.keys(visibleObjects).map((key) => (
                <div key={key}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                      color: "#333",
                      cursor: "pointer",
                      border: "5px solid black",
                      borderRadius: "25px",
                      backgroundColor: "white",
                      padding: "10px",
                      fontSize: "1.5em",
                    }}
                  >
                    <input
                      type="checkbox"
                      name={key}
                      checked={visibleObjects[key]}
                      onChange={handleVisibilityChange}
                      style={{
                        marginRight: "10px",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                    {key}
                  </label>
                </div>
              ))}

              {/* Templates Tool Button */}
              <div
                style={{
                  marginTop: "20px",
                  gridColumn: "1 / -1",
                  textAlign: "center",
                }}
              >
                <a
                  href="https://sargent-templates.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "15px 30px",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#007BFF",
                    borderRadius: "25px",
                    textDecoration: "none",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transition:
                      "background-color 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#0056b3";
                    e.target.style.transform = "scale(0.95)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#007BFF";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  Need Templates? <br />
                  Check out our Template Lookup Tool!
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* 3D Canvas */}
      <div
        style={{
          flex: "1",
          transition: "all 0.3s ease",
          paddingLeft: isPanelVisible ? "0" : "20px",
          width: isPanelVisible ? "30vw" : "100vw",
        }}
      >
        <Canvas camera={{ position: [55, 55, 55] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[54, 10, 5]} intensity={1.5} />
          <Door
            hideDoor={visibleObjects["Ghost Door"]}
            hideFrame={visibleObjects["Ghost Frame"]}
            thickness={parseFloat(thickness)}
          />
          {visibleObjects["Chassis"] && (
            <Chassis position={[15.25, 0, 0.375 + zOffset]} />
          )}
          {lockType === "Mortise" && visibleObjects["Mortise Case"] && (
            <MortiseCase position={[15.975, 41, 0]} />
          )}
          {lockType === "CVR" && visibleObjects["Inner Chassis"] && (
            <CVRInnerChassis position={[15.25, 41, 0]} />
          )}
          {lockType === "CVR" && <CVRTopCase position={[15.25, 82.05, 0 + zOffset]} />}
          {lockType === "SVR" && (
            <SVRTopCase position={[15.25, 39.7, 0.6 + zOffset]} />
          )}
          {lockType === "SVR" && (
            <SVRBottomCase position={[15.25, -39, 0.6 + zOffset]} />
          )}
          {lockType === "CVR" && visibleObjects["Top Rod"] && (
            <CVRRods position={[15.25, 20, 0]} length={36.75} />
          )}
          {lockType === "CVR" && visibleObjects["Bottom Rod"] && (
            <CVRRods position={[15.25, -22, 0]} length={36} />
          )}
          {lockType === "SVR" && visibleObjects["Top Rod"] && (
            <SVRRods position={[15.25, 20, 0.5 + zOffset]} length={36.5} />
          )}
          {lockType === "SVR" && visibleObjects["Bottom Rod"] && (
            <SVRRods position={[15.25, -19, 0.5 + zOffset]} length={36} />
          )}
          {visibleObjects["Chassis Cover"] && (
            <Cover position={[15.25, 41, 0 + zOffset]} />
          )}
          {visibleObjects["Rail"] && (
            <Rail
              position={[0, 0, 0]} // Base position of the rail
              scale={[40, 40, 40]} // Scale the rail uniformly
              rotations={{
                insert: [0, Math.PI / 2, Math.PI / 2], // Rotate the insert 45° on Y-axis
                push: [Math.PI / 2, Math.PI / 2, 0], // No rotation for the push
                mounting: [0, Math.PI / 2, Math.PI / 2], // Rotate the mounting part 30° on Z-axis
              }}
            />
          )}
          {visibleObjects["Trim"] && (
            <ETTrim position={[15.25, 40.7875, 0.03 - zOffset]} />
          )}
          {visibleObjects["Screws"] && (
            <Screws
              topPosition={[15.25, 43.5375, 0.025 + zOffset]} // Top screw position
              bottomPosition={[15.25, 38.45, 0.025 + zOffset]} // Bottom screw position
              thickness={parseFloat(thickness)}
            />
          )}
          {visibleObjects["Spindle"] && (
            <>
              <SquareSpindle
                position={[15.25, 39.7875, -.125 -zOffset]} 
                thickness={parseFloat(thickness)}
              />
              <CrossSpindle
                position={[15.25, 39.7875, -.125 -zOffset]} 
                thickness={parseFloat(thickness)}
              />
            </>
          )}

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

export default App;

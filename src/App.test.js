import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import App from "./App";

// Mock 3D libraries that require a real Canvas/WebGL context
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children }) => <div>{children}</div>,
}));

jest.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
}));

test("renders application title", () => {
  render(
    <Suspense fallback={null}>
      <App />
    </Suspense>
  );
  const titleElement = screen.getByText(/Sargent Thick Door Tool/i);
  expect(titleElement).toBeInTheDocument();
});

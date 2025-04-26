import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RootComponent from "./components/RootComponent";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>
);

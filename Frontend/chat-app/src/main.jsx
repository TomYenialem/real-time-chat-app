import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ContextApi from "./Components/Context/ContextApi.jsx";
import SoketApi from "./Components/Context/SoketApi.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextApi>
        <SoketApi>

          
        <App />
        </SoketApi>
      </ContextApi>
    </BrowserRouter>
  </StrictMode>
);

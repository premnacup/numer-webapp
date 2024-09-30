import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import Bisection from "./Bisection.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    {/* <App /> */}
    <Bisection />
  </StrictMode>
);

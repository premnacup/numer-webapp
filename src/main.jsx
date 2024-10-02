import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import Bisection from "./Bisection.jsx";
import FalsePosition from "./FalsePosition.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    {/* <App /> */}
    {/* <Bisection /> */}
    <FalsePosition />
  </BrowserRouter>
);

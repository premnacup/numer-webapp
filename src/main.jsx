import "./index.css";
import { createRoot } from "react-dom/client";
import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import Graphical from "./Graphical.jsx";
import Bisection from "./Bisection.jsx";
import FalsePosition from "./FalsePosition.jsx";
import OnePoint from "./OnePoint.jsx";
import NewtonRaphson from "./NewtonRaphson.jsx";
import Secant from "./Secant.jsx";
import Cramer from "./Cramer.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="graphical" element={<Graphical />} />
      <Route path="bisection" element={<Bisection />} />
      <Route path="false-position" element={<FalsePosition />} />
      <Route path="one-point" element={<OnePoint />} />
      <Route path="newton-raphson" element={<NewtonRaphson />} />
      <Route path="secant" element={<Secant />} />
      <Route path="cramer" element={<Cramer />} />
    </Routes>
  </Router>
);

import "./index.css";
import { createRoot } from "react-dom/client";
import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import History from "./components/History.jsx";
import Graphical from "./rootEquations/Graphical.jsx";
import Bisection from "./rootEquations/Bisection.jsx";
import FalsePosition from "./rootEquations/FalsePosition.jsx";
import OnePoint from "./rootEquations/OnePoint.jsx";
import NewtonRaphson from "./rootEquations/NewtonRaphson.jsx";
import Secant from "./rootEquations/Secant.jsx";
import Cramer from "./linear/Cramer.jsx";
import GaussElimination from "./linear/GaussElimination.jsx";
import GaussJordan from "./linear/GaussJordan.jsx";
import NewtonInterpolation from "./interpolation/newtonDivided.jsx";
import LagrangeInterpolation from "./interpolation/Lagrage.jsx";
import LinearRegression from "./regression/LinearRegression.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<App />} />
      <Route path="history" element={<History />} />
      <Route path="graphical" element={<Graphical />} />
      <Route path="bisection" element={<Bisection />} />
      <Route path="false-position" element={<FalsePosition />} />
      <Route path="one-point" element={<OnePoint />} />
      <Route path="newton-raphson" element={<NewtonRaphson />} />
      <Route path="secant" element={<Secant />} />
      <Route path="cramer" element={<Cramer />} />
      <Route path="gauss-elimination" element={<GaussElimination />} />
      <Route path="gauss-jordan" element={<GaussJordan />} />
      <Route path="newton-divided" element={<NewtonInterpolation />} />
      <Route path="lagrange" element={<LagrangeInterpolation />} />
      <Route path="linear-regression" element={<LinearRegression />} />
    </Routes>
  </Router>
);

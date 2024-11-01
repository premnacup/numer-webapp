import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const RootOfEquations = [
    { name: "Graphical", path: "/graphical" },
    { name: "Bisection", path: "/bisection" },
    { name: "False Position", path: "/false-position" },
    { name: "One Point Iteration", path: "/one-point" },
    { name: "Newton Raphson", path: "/newton-raphson" },
    { name: "Secant", path: "/secant" },
  ];

  const LinearAlgebra = [
    { name: "Cramer's Rule", path: "/cramer" },
    {
      name: "Gaussian Elimination",
      path: "/gauss-elimination",
    },
    { name: "Gauss-Jordan", path: "/gauss-jordan" },
    { name: "Matrix Inversion", path: "/matrix-inversion" },
    { name: "LU Decomposition", path: "/lu-decomposition" },
    { name: "Cholesky Decomposition", path: "/cholesky" },
    { name: "Jacobi Iteration", path: "/jacobi-iteration" },
    { name: "Gauss-Seidel Iteration", path: "/gauss-seidel-iteration" },
    { name: "Conjugate Gradient", path: "/conjugate-gradient" },
  ];

  const Interpolation = [
    { name: "Newton", path: "/newton-divided" },
    { name: "Lagrange", path: "/lagrange" },
    { name: "Spline", path: "/spline" },
  ];

  const Regression = [
    { name: "Linear Regression", path: "/linear-regression" },
    { name: "Polynomial Regression", path: "/polynomial-regression" },
    { name: "Multiple Linear Regression", path: "/multiple-linear-regression" },
  ];
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Root of Equations</h1>
      <hr className="border-2 border-white" />
      <div className="flex flex-wrap gap-4 p-6 justify-start">
        {RootOfEquations.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className="bg-custom-orange rounded-lg flex items-center justify-center w-48 h-20 transition-transform transform hover:scale-105 hover:bg-orange-500"
          >
            <p className="text-center">{name} Method</p>
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-4">Linear Algebra</h1>
      <hr className="border-2 border-white" />
      <div className="flex flex-wrap gap-4 p-6 justify-start">
        {LinearAlgebra.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className="bg-custom-orange rounded-lg flex items-center justify-center w-48 h-20 transition-transform transform hover:scale-105 hover:bg-orange-500"
          >
            <p className="text-center">{name} Method</p>
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-4">Interpolation</h1>
      <hr className="border-2 border-white" />
      <div className="flex flex-wrap gap-4 p-6 justify-start">
        {Interpolation.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className="bg-custom-orange rounded-lg flex items-center justify-center w-48 h-20 transition-transform transform hover:scale-105 hover:bg-orange-500"
          >
            <p className="text-center">{name} Method</p>
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-4">Regression</h1>
      <hr className="border-2 border-white" />
      <div className="flex flex-wrap gap-4 p-6 justify-start">
        {Regression.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className="bg-custom-orange rounded-lg flex items-center justify-center w-48 h-20 transition-transform transform hover:scale-105 hover:bg-orange-500"
          >
            <p className="text-center">{name} Method</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import MatrixInput from "../components/MatrixInput";

function GaussJordan() {
  const [answer, setAnswer] = useState("");
  const [n, setN] = useState(2);
  const [matrix, setMatrix] = useState(null);
  const [constants, setConstants] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleMatrixData = (matrixData, constantsData, n) => {
    setN(n);
    setMatrix(matrixData);
    setConstants(constantsData);
  };

  const handleReset = () => {
    setN(2);
    setMatrix(null);
    setConstants(null);
    setAnswer("");
    setResetTrigger((prev) => prev + 1);
  };

  const solveGaussJordan = () => {
    try {
      const mat = matrix.map((row, i) => [...row, constants[i]]);
      const n = mat.length;
      const m = mat[0].length;

      // Forward elimination
      for (let current = 0; current < n; current++) {
        const pivot = mat[current][current];

        // Add check for zero pivot
        if (pivot === 0) {
          throw new Error("Zero found in diagonal - cannot solve");
        }

        // First normalization
        for (let j = 0; j < m; j++) {
          mat[current][j] /= pivot;
        }

        // Eliminate below and above
        for (let i = 0; i < n; i++) {
          if (i !== current) {
            const temp = mat[i][current];
            for (let j = 0; j < m; j++) {
              mat[i][j] -= temp * mat[current][j];
            }
          }
        }
      }

      // Back substitution (though not strictly needed for Gauss-Jordan)
      for (let current = n - 1; current >= 0; current--) {
        const pivot = mat[current][current];

        // Add check for zero pivot
        if (pivot === 0) {
          throw new Error("Zero found in diagonal - cannot solve");
        }

        // Second normalization
        for (let j = 0; j < m; j++) {
          mat[current][j] /= pivot;
        }

        // Eliminate above
        for (let i = current - 1; i >= 0; i--) {
          if (i !== current) {
            const temp = mat[i][current];
            for (let j = 0; j < m; j++) {
              mat[i][j] -= temp * mat[current][j];
            }
          }
        }
      }

      const solution = mat.map((row) => row[row.length - 1]);
      setAnswer(solution.map((val, idx) => `x${idx + 1} = ${val}`).join("\n"));
    } catch (error) {
      setAnswer("Error solving system: " + error.message);
    }
  };

  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Gauss-Jordan Elimination</h1>
      <div className="flex flex-col gap-4 max-w-lg mx-auto">
        <label className="text-white flex items-center text-left w-full">
          <span className="w-1/4">Matrix Size:</span>
          <input
            type="number"
            min="2"
            value={n}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 2) setN(value);
            }}
            className="p-2 border-2 rounded-lg text-black w-2/3"
          />
        </label>
        <button
          onClick={handleReset}
          className="mx-auto px-4 py-2 w-1/2 text-center bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
        <MatrixInput
          method="Gauss-Jordan"
          rows={n}
          cols={n}
          onMatrixChange={handleMatrixData}
          resetTrigger={resetTrigger}
        />
        {matrix && constants && (
          <button
            onClick={solveGaussJordan}
            className="mx-auto px-4 py-2 w-1/2 text-center bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Solve
          </button>
        )}
        {answer && (
          <div className="mt-4 text-white">
            <h2 className="text-xl font-bold">Solution:</h2>
            <pre className="whitespace-pre-line text-left">{answer}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default GaussJordan;

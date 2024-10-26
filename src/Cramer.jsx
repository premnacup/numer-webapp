import { useState } from "react";
import MatrixInput from "./components/MatrixInput";

function Cramer() {
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

  const solveCramer = () => {
    try {
      const numericMatrix = matrix.map((row) =>
        row.map((val) => parseFloat(val))
      );
      const numericConstants = constants.map((val) => parseFloat(val));

      const detA = calculateDeterminant(numericMatrix);

      if (detA === 0) {
        setAnswer("System has no unique solution (determinant is 0)");
        return;
      }

      const solution = new Array(n).fill(0);

      for (let i = 0; i < n; i++) {
        const tempMatrix = numericMatrix.map((row) => [...row]);

        for (let j = 0; j < n; j++) {
          tempMatrix[j][i] = numericConstants[j];
        }

        const detTemp = calculateDeterminant(tempMatrix);
        solution[i] = Math.round(detTemp / detA);
      }

      setAnswer(solution.map((val, idx) => `x${idx + 1} = ${val}`).join("\n"));
    } catch (error) {
      setAnswer("Error solving system: " + error.message);
    }
  };

  const calculateDeterminant = (matrix) => {
    const n = matrix.length;

    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let i = 0; i < n; i++) {
      det += matrix[0][i] * getCofactor(matrix, 0, i);
    }
    return det;
  };

  const getCofactor = (matrix, p, q) => {
    const n = matrix.length;
    const temp = Array(n - 1)
      .fill()
      .map(() => Array(n - 1).fill(0));
    let i = 0,
      j = 0;

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (row !== p && col !== q) {
          temp[i][j++] = matrix[row][col];
          if (j === n - 1) {
            j = 0;
            i++;
          }
        }
      }
    }

    return Math.pow(-1, p + q) * calculateDeterminant(temp);
  };
  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Cramer's Rule</h1>
      <div className="flex flex-col gap-4 max-w-lg mx-auto">
        <label className="text-white flex items-center text-left w-full">
          <span className="w-1/4">Matrix size:</span>
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
          method="Cramer"
          rows={n}
          cols={n}
          onMatrixChange={handleMatrixData}
          resetTrigger={resetTrigger}
        />
        {matrix && constants && (
          <button
            onClick={solveCramer}
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

export default Cramer;

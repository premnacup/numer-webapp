import React, { useState, useEffect } from "react";

const MatrixInput = ({
  rows,
  cols,
  onMatrixChange,
  resetTrigger,
  onResetComplete,
}) => {
  const [matrix, setMatrix] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );
  const [constants, setConstants] = useState(Array(rows).fill(""));

  useEffect(() => {
    if (resetTrigger) {
      setMatrix(Array.from({ length: rows }, () => Array(cols).fill("")));
      setConstants(Array(rows).fill(""));
      onResetComplete?.();
    }
  }, [resetTrigger, rows, cols, onResetComplete]);

  useEffect(() => {
    setMatrix(Array.from({ length: rows }, () => Array(cols).fill("")));
    setConstants(Array(rows).fill(""));
  }, [rows, cols]);

  useEffect(() => {
    onMatrixChange?.(matrix, constants, rows, cols);
  }, [matrix, constants, rows, cols, onMatrixChange]);

  const handleMatrixChange = (e, row, col) => {
    const value = e.target.value === "" ? 0 : Number(e.target.value);
    setMatrix((prevMatrix) => {
      const newMatrix = prevMatrix.map((r) => [...r]);
      newMatrix[row][col] = value;
      return newMatrix;
    });
  };

  const handleConstantChange = (e, row) => {
    const value = e.target.value === "" ? 0 : Number(e.target.value);
    setConstants((prevConstants) => {
      const newConstants = [...prevConstants];
      newConstants[row] = value;
      return newConstants;
    });
  };

  return (
    <div className="flex flex-col items-center text-black pt-4 mx-auto">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 mb-2">
          {row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              value={value}
              placeholder={`a${rowIndex},${colIndex}`}
              onChange={(e) => handleMatrixChange(e, rowIndex, colIndex)}
              className="w-16 h-16 p-1 border rounded text-center"
            />
          ))}
          <input
            type="number"
            value={constants[rowIndex]}
            placeholder={"b" + rowIndex}
            onChange={(e) => handleConstantChange(e, rowIndex)}
            className="w-16 h-16 p-1 border rounded text-center ml-4"
          />
        </div>
      ))}
    </div>
  );
};

export default MatrixInput;

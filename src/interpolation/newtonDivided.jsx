import { useState } from "react";

const NewtonInterpolation = () => {
  const [numPoints, setNumPoints] = useState(2);
  const [points, setPoints] = useState([
    { x: 0, y: 0, isActive: true },
    { x: 1, y: 1, isActive: true },
  ]);
  const [interpolateAt, setInterpolateAt] = useState(0.5);
  const [result, setResult] = useState(null);
  const [dividedDifferences, setDividedDifferences] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const calculateDividedDifference = (points, i, j) => {
    if (j === 0) {
      return points[i].y;
    }

    const numerator =
      calculateDividedDifference(points, i + 1, j - 1) -
      calculateDividedDifference(points, i, j - 1);
    const denominator = points[i + j].x - points[i].x;

    return numerator / denominator;
  };

  const calculateAllDifferences = (activePoints) => {
    const n = activePoints.length;
    let differences = Array(n)
      .fill()
      .map(() => Array(n).fill(0));

    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        differences[i][j] = calculateDividedDifference(activePoints, i, j);
      }
    }

    return differences;
  };

  const calculateInterpolation = (
    x,
    points,
    currentOrder = 0,
    prevTerm = 1
  ) => {
    if (currentOrder >= points.length) {
      return 0;
    }

    const term =
      currentOrder === 0 ? 1 : prevTerm * (x - points[currentOrder - 1].x);
    const difference = calculateDividedDifference(points, 0, currentOrder);

    return (
      difference * term +
      calculateInterpolation(x, points, currentOrder + 1, term)
    );
  };

  const handleCalculate = () => {
    try {
      const activePoints = points.filter((point) => point.isActive);

      if (activePoints.length < 2) {
        alert("Please select at least 2 points for interpolation.");
        return;
      }

      const differences = calculateAllDifferences(activePoints);
      setDividedDifferences(differences);
      const interpolatedValue = calculateInterpolation(
        interpolateAt,
        activePoints
      );
      setResult(interpolatedValue);
      setShowTable(true);
    } catch (error) {
      alert("Error calculating interpolation: " + error.message);
    }
  };

  const handleIncrement = () => {
    if (numPoints < 10) {
      setNumPoints((prev) => prev + 1);
      setPoints([...points, { x: points.length, y: 0, isActive: true }]);
    }
  };

  const handleDecrement = () => {
    if (numPoints > 2) {
      setNumPoints((prev) => prev - 1);
      setPoints(points.slice(0, -1));
    }
  };

  const handlePointChange = (index, field, value) => {
    const newPoints = [...points];
    newPoints[index][field] = parseFloat(value);
    setPoints(newPoints);
  };

  const togglePoint = (index) => {
    const newPoints = [...points];
    newPoints[index].isActive = !newPoints[index].isActive;
    setPoints(newPoints);
    setShowTable(false);
    setResult(null);
  };

  const toggleAllPoints = () => {
    const areAllActive = points.every((point) => point.isActive);
    const newPoints = points.map((point) => ({
      ...point,
      isActive: !areAllActive,
    }));
    setPoints(newPoints);
    setShowTable(false);
    setResult(null);
  };

  const showTableComponent = () => {
    const activePoints = points.filter((point) => point.isActive);

    return (
      <div className="overflow-x-auto mb-20 w-full">
        <h3 className="text-center text-xl mt-10 mb-5 font-bold text-white">
          Newton Divided Differences Table
        </h3>
        <table className="relative overflow-x-auto sm:rounded-lg w-full border border-custom-blue">
          <thead className="bg-custom-blue">
            <tr>
              <th className="text-center text-white border border-custom-blue">
                Order
              </th>
              <th className="text-center text-white border border-custom-blue">
                Points Used
              </th>
              <th className="text-center text-white border border-custom-blue">
                Divided Difference
              </th>
            </tr>
          </thead>
          <tbody className="text-white text-center">
            {dividedDifferences[0].map((_, index) => (
              <tr
                key={index}
                style={{ height: "3rem" }}
                className={index % 2 === 0 ? "bg-slate-500" : "bg-custom-blue"}
              >
                <td className="border border-custom-blue">{index}</td>
                <td className="border border-custom-blue">
                  {activePoints
                    .slice(0, index + 1)
                    .map((p) => `(${p.x}, ${p.y})`)
                    .join(", ")}
                </td>
                <td className="border border-custom-blue">
                  {dividedDifferences[0][index].toFixed(6)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto text-black flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Newton Divided Interpolation
      </h1>

      <div className="p-6 mb-6 w-full">
        <div className="space-y-4 flex flex-col items-center">
          <div className="flex items-center justify-between mb-4 w-full">
            <button
              onClick={toggleAllPoints}
              className="px-3 py-2 bg-custom-orange text-white rounded transform transition-transform duration-300 hover:scale-105 h-10"
            >
              Toggle All
            </button>
            <h2 className="text-xl font-semibold text-white">
              Number of Points
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={handleDecrement}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                disabled={numPoints <= 2}
              >
                -
              </button>
              <span className="text-xl font-semibold text-white">
                {numPoints}
              </span>
              <button
                onClick={handleIncrement}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={numPoints >= 10}
              >
                +
              </button>
            </div>
          </div>

          {points.map((point, index) => (
            <div key={index} className="flex gap-4 items-center w-full">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={point.isActive}
                  onChange={() => togglePoint(index)}
                  className="mr-2"
                />
                <span className="text-white">{index + 1} </span>
              </div>
              <input
                type="number"
                value={point.x}
                onChange={(e) => handlePointChange(index, "x", e.target.value)}
                className={`p-2 border rounded w-1/2 ${
                  !point.isActive && "opacity-50"
                }`}
                placeholder="x"
                disabled={!point.isActive}
              />
              <input
                type="number"
                value={point.y}
                onChange={(e) => handlePointChange(index, "y", e.target.value)}
                className={`p-2 border rounded w-1/2 ${
                  !point.isActive && "opacity-50"
                }`}
                placeholder="y"
                disabled={!point.isActive}
              />
            </div>
          ))}

          <div className="mt-4 w-full">
            <label className="block mb-2 text-white">Interpolate at x:</label>
            <input
              type="number"
              value={interpolateAt}
              onChange={(e) => setInterpolateAt(parseFloat(e.target.value))}
              className="p-2 border rounded w-1/2"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="p-2 bg-custom-orange text-white rounded w-full h-10"
          >
            Calculate
          </button>

          {showTable && (
            <div className="p-6 mt-4 w-full text-xl text-white">
              Interpolated value at x = {interpolateAt}: {result?.toFixed(6)}
            </div>
          )}
        </div>
      </div>

      {showTable && showTableComponent()}
    </div>
  );
};

export default NewtonInterpolation;

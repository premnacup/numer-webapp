import { useState } from "react";

const LinearRegression = () => {
  const [numPoints, setNumPoints] = useState(2);
  const [points, setPoints] = useState([
    { x: 0, y: 0, isActive: true },
    { x: 1, y: 1, isActive: true },
  ]);
  const [result, setResult] = useState(null);
  const [regressionStats, setRegressionStats] = useState(null);
  const [showTable, setShowTable] = useState(false);

  // Calculate mean of an array
  const calculateMean = (arr) =>
    arr.reduce((sum, val) => sum + val, 0) / arr.length;

  // Calculate Linear Regression using Least Squares Method
  const calculateRegression = (points) => {
    const n = points.length;
    const x_values = points.map((p) => p.x);
    const y_values = points.map((p) => p.y);

    const x_mean = calculateMean(x_values);
    const y_mean = calculateMean(y_values);

    let numerator = 0;
    let denominator = 0;
    let sumSquaredResiduals = 0;
    let sumSquaredTotal = 0;
    let predictions = [];

    // Calculate slope (m)
    for (let i = 0; i < n; i++) {
      numerator += (x_values[i] - x_mean) * (y_values[i] - y_mean);
      denominator += Math.pow(x_values[i] - x_mean, 2);
    }

    const slope = numerator / denominator;
    const intercept = y_mean - slope * x_mean;

    // Calculate R-squared and predictions
    for (let i = 0; i < n; i++) {
      const prediction = slope * x_values[i] + intercept;
      predictions.push(prediction);

      sumSquaredResiduals += Math.pow(y_values[i] - prediction, 2);
      sumSquaredTotal += Math.pow(y_values[i] - y_mean, 2);
    }

    const rSquared = 1 - sumSquaredResiduals / sumSquaredTotal;

    return {
      slope,
      intercept,
      rSquared,
      predictions,
      stats: {
        x_mean,
        y_mean,
        sumSquaredResiduals,
        sumSquaredTotal,
      },
    };
  };

  const handleCalculate = () => {
    try {
      const activePoints = points.filter((point) => point.isActive);

      if (activePoints.length < 2) {
        alert("Please select at least 2 points for regression.");
        return;
      }

      const regression = calculateRegression(activePoints);
      setResult(regression);

      const stats = activePoints.map((point, index) => ({
        point: point,
        predicted: regression.predictions[index],
        error: Math.abs(point.y - regression.predictions[index]),
      }));

      setRegressionStats(stats);
      setShowTable(true);
    } catch (error) {
      alert("Error calculating regression: " + error.message);
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
    return (
      <div className="overflow-x-auto mb-20 w-full">
        <h3 className="text-center text-xl mt-10 mb-5 font-bold text-white">
          Linear Regression Analysis
        </h3>
        <table className="relative overflow-x-auto sm:rounded-lg w-full border border-custom-blue">
          <thead className="bg-custom-blue">
            <tr>
              <th className="text-center text-white border border-custom-blue">
                Point
              </th>
              <th className="text-center text-white border border-custom-blue">
                X Value
              </th>
              <th className="text-center text-white border border-custom-blue">
                Y Value
              </th>
              <th className="text-center text-white border border-custom-blue">
                Predicted Y
              </th>
              <th className="text-center text-white border border-custom-blue">
                Error
              </th>
            </tr>
          </thead>
          <tbody className="text-white text-center">
            {regressionStats.map((stat, index) => (
              <tr
                key={index}
                style={{ height: "3rem" }}
                className={index % 2 === 0 ? "bg-slate-500" : "bg-custom-blue"}
              >
                <td className="border border-custom-blue">{index + 1}</td>
                <td className="border border-custom-blue">
                  {stat.point.x.toFixed(6)}
                </td>
                <td className="border border-custom-blue">
                  {stat.point.y.toFixed(6)}
                </td>
                <td className="border border-custom-blue">
                  {stat.predicted.toFixed(6)}
                </td>
                <td className="border border-custom-blue">
                  {stat.error.toFixed(6)}
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
        Linear Regression Calculator
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

          <button
            onClick={handleCalculate}
            className="p-2 bg-custom-orange text-white rounded w-full h-10"
          >
            Calculate
          </button>

          {showTable && result && (
            <div className="p-6 mt-4 w-full text-xl text-white space-y-2">
              <div>
                Regression Line: y = {result.slope.toFixed(6)}x +{" "}
                {result.intercept.toFixed(6)}
              </div>
              <div>R² Value: {result.rSquared.toFixed(6)}</div>
            </div>
          )}
        </div>
      </div>

      {showTable && showTableComponent()}
    </div>
  );
};

export default LinearRegression;

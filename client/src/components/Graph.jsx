import React from "react";
import Plot from "react-plotly.js";
import { evaluate, mode } from "mathjs";

const Graph = ({ method, data, equation }) => {
  const generateFX = (X) => {
    try {
      if (!equation) return Array(X.length).fill(null);
      return X.map((x) => evaluate(equation, { x }));
    } catch (error) {
      return Array(X.length).fill(null);
    }
  };

  const generateActualFunction = (xMin, xMax) => {
    const points = method === "one-point" ? 30 : 100;
    const xValues = Array.from(
      { length: points },
      (_, i) => xMin + (i * (xMax - xMin)) / (points - 1)
    );
    return {
      x: xValues,
      y: generateFX(xValues),
    };
  };

  const getXRange = () => {
    const xValues = data
      .map((item) => {
        if (method === "bisection") return [item.Xl, item.Xm, item.Xr];
        if (method === "false-position") return [item.Xm];
        if (method === "graphical") return [item.x];
        if (method === "newton") return [item.x];
        if (method === "one-point") return [item.x];
        return [item.x];
      })
      .flat();

    const xMin = Math.min(...xValues) - 1;
    const xMax = Math.max(...xValues) + 1;
    return { xMin, xMax };
  };

  const generatePlotData = () => {
    const { xMin, xMax } = getXRange();
    const actualFunction = generateActualFunction(xMin, xMax);
    const functionCurve = equation
      ? {
          x: actualFunction.x,
          y: actualFunction.y,
          mode: "lines",
          name: `f(x) = ${equation}`,
          line: { color: "#2196F3" },
        }
      : null;

    const zeroLine = ["newton", "secant"].includes(method)
      ? {
          x: [xMin, xMax],
          y: [0, 0],
          mode: "lines",
          name: "y = 0",
          line: { color: "#333333", width: 1 },
          showlegend: false,
        }
      : null;

    let methodSpecificData = [];

    switch (method) {
      case "graphical":
        methodSpecificData = [
          {
            x: data.map((item) => item.x),
            y: data.map((item) => item.fx),
            mode: "lines+markers",
            name: "Graphical Method X values",
            line: { color: "cyan" },
            marker: { color: "red" },
          },
        ];
        break;

      case "bisection":
        methodSpecificData = [
          {
            x: data.map((item) => item.Xm),
            y: data.map((item) => item.fxm),
            mode: "lines+markers",
            name: "Xm values",
            line: { color: "cyan" },
            marker: {
              color: "red",
              size: 8,
            },
          },
        ];
        break;

      case "false-position":
        methodSpecificData = [
          {
            x: data.map((item) => item.Xm),
            y: data.map((item) => item.fxm),
            mode: "lines+markers",
            name: "Xc values",
            line: { color: "cyan" },
            marker: { color: "red" },
          },
        ];
        break;

      case "one-point":
        const yEqualsXLine = {
          x: actualFunction.x,
          y: actualFunction.x,
          mode: "lines",
          name: "y = x",
          line: { color: "black" },
        };

        const cobwebLines = data
          .slice(0, -1)
          .map((item, index) => {
            const nextItem = data[index + 1];
            return [
              {
                x: [item.x, item.x],
                y: [item.x, item.fx],
                name: "Iteration",
                mode: "lines+markers",
                line: { color: "red", dash: "solid", width: 0.9 },
                showlegend: index === 0,
                legendgroup: "One-Point",
              },
              {
                x: [item.x, nextItem.x],
                y: [item.fx, item.fx],
                mode: "lines",
                line: { color: "red", dash: "solid", width: 0.9 },
                showlegend: false,
                legendgroup: "One-Point",
              },
            ];
          })
          .flat();

        methodSpecificData = [yEqualsXLine, ...cobwebLines];
        break;

      case "newton":
        const iterationPoints = {
          x: data.map((item) => item.x),
          y: data.map((item) => item.fx),
          mode: "markers",
          name: "Iterations",
          marker: { color: "#212121", size: 5, symbol: "circle" },
          showlegend: true,
        };

        const tangentAndSteps = data
          .slice(0, -1)
          .map((item, index) => {
            const nextItem = data[index + 1];
            const slope = item.dfx;
            const x1 = item.x - 0.5;
            const x2 = item.x + 0.5;
            const y1 = item.fx - slope * 0.5;
            const y2 = item.fx + slope * 0.5;

            return [
              {
                x: [x1, x2],
                y: [y1, y2],
                mode: "lines",
                name: "Tangent",
                line: { color: "#FF4081", dash: "solid", width: 1 },
                showlegend: index === 0,
                legendgroup: "Newton",
              },
              {
                x: [item.x, nextItem.x],
                y: [item.fx, 0],
                mode: "lines",
                name: "Steps",
                line: { color: "#FF4081", dash: "solid", width: 1 },
                showlegend: false,
                legendgroup: "Newton",
              },
            ];
          })
          .flat();

        methodSpecificData = [iterationPoints, ...tangentAndSteps];
        break;

      case "secant":
        const secantPoints = {
          x: data.map((item) => item.x),
          y: data.map((item) => item.fx),
          mode: "markers",
          name: "Iterations",
          marker: { color: "#212121", size: 5, symbol: "circle" },
        };

        const secantLines = data
          .slice(0, -1)
          .map((item, index) => {
            const nextItem = data[index + 1];
            return [
              {
                x: [item.x, nextItem.x],
                y: [item.fx, 0],
                mode: "lines",
                name: "Secant",
                line: { color: "#FF4081", dash: "solid", width: 1 },
                showlegend: index === 0,
                legendgroup: "Secant",
              },
              {
                x: [nextItem.x, nextItem.x],
                y: [0, nextItem.fx],
                mode: "lines",
                name: "Steps",
                line: { color: "#FF4081", dash: "solid", width: 1 },
                showlegend: false,
                legendgroup: "Secant",
              },
            ];
          })
          .flat();

        methodSpecificData = [secantPoints, ...secantLines];
        break;
    }

    return [
      ...(functionCurve ? [functionCurve] : []),
      ...(zeroLine ? [zeroLine] : []),
      ...methodSpecificData,
    ].filter(Boolean);
  };

  const getTitle = () => {
    const titles = {
      bisection: "Bisection Method Graph",
      "false-position": "False-Position Method Graph",
      graphical: "Graphical Method Graph",
      newton: "Newton-Raphson Method Graph",
      "one-point": "One-Point Iteration Graph",
      secant: "Secant Method Graph",
    };
    return titles[method] || "Error : can't find title";
  };

  const layout = {
    title: "",
    xaxis: {
      title: "X values",
      gridcolor: "#E0E0E0",
      zerolinecolor: "#9E9E9E",
    },
    yaxis: {
      title: "f(x)",
      gridcolor: "#E0E0E0",
      zerolinecolor: "#9E9E9E",
    },
    dragmode: "pan",
    legend: {
      orientation: "h",
      x: 0.5,
      xanchor: "center",
      y: 1.1,
    },
    margin: {
      l: 50,
      r: 50,
      t: 50,
      b: 50,
    },
    modebar: {
      orientation: "v",
      bgcolor: "#FFFFFF",
      color: "#212121",
      activecolor: "#2196F3",
    },
    width: 500,
    height: 500,
    showlegend: true,
    plot_bgcolor: "#FFFFFF",
    paper_bgcolor: "#FFFFFF",
  };

  return (
    <div>
      <h3 className="text-center text-xl mt-10 mb-5 font-bold">{getTitle()}</h3>
      <Plot
        data={generatePlotData()}
        layout={layout}
        config={{
          scrollZoom: true,
          responsive: true,
        }}
      />
    </div>
  );
};

export default Graph;

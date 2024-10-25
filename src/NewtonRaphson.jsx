import { useState } from "react";
import { evaluate, derivative } from "mathjs";
import MathEquation from "./components/MathEquation";
import Graph from "./components/Graph";

function NewtonRaphson() {
  const [Equation, setEquation] = useState("(x^2) - 7");
  const [x, setX] = useState(1);
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const tolerance = 1e-6;

  const calculate = () => {
    const newData = [];
    let iter = 0;
    let currentX = x;
    let nextX;
    let fx = evaluate(Equation, { x: currentX });
    let dfx = derivative(Equation, "x").evaluate({ x: currentX });

    if (dfx === 0) {
      setAnswer("Derrivative is zero. No solution found.");
      return;
    }
    let error = Math.abs(currentX - fx / dfx);
    newData.push({
      iteration: iter,
      x: currentX,
      fx: fx,
      dfx: dfx,
      error: error,
    });
    iter++;

    do {
      nextX = currentX - fx / dfx;
      fx = evaluate(Equation, { x: nextX });
      dfx = derivative(Equation, "x").evaluate({ x: nextX });
      error = Math.abs(nextX - currentX);
      newData.push({
        iteration: iter,
        x: nextX,
        fx: fx,
        dfx: dfx,
        error: error,
      });
      currentX = nextX;
      iter++;
    } while (error > tolerance && iter < 100);

    setData(newData);
    setAnswer(`Answer: ${nextX.toFixed(6)}`);
    setShowTable(true);
  };

  const showTableComponent = () => {
    return (
      <div className="overflow-x-auto mb-20 w-full">
        <h3 className="text-center text-xl mt-10 mb-5 font-bold">
          Newton-Raphson Method Table
        </h3>
        <table className="relative overflow-x-auto sm:rounded-lg w-full border border-custom-blue">
          <thead className="bg-custom-blue">
            <tr>
              <th className="text-center text-white border border-custom-blue">
                Iteration
              </th>
              <th className="text-center text-white border border-custom-blue">
                X
              </th>
              <th className="text-center text-white border border-custom-blue">
                f(X)
              </th>
              <th className="text-center text-white border border-custom-blue">
                f'(X)
              </th>
              <th className="text-center text-white border border-custom-blue">
                Error
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => (
              <tr
                key={index}
                style={{ height: "3rem" }}
                className={index % 2 === 0 ? "bg-slate-500" : "bg-custom-blue"}
              >
                <td className="border border-custom-blue">
                  {element.iteration + 1}
                </td>
                <td className="border border-custom-blue">
                  {element.x.toFixed(6)}
                </td>
                <td className="border border-custom-blue">
                  {element.fx.toFixed(6)}
                </td>
                <td className="border border-custom-blue">
                  {element.dfx.toFixed(6)}
                </td>
                <td className="border border-custom-blue">
                  {element.error.toFixed(6)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Newton-Raphson Method</h1>
      <div className="flex flex-col gap-4 max-w-lg mx-auto ">
        <p className="text-lg">Input equation </p>
        <input
          id="equation"
          type="text"
          value={Equation}
          onChange={(e) => setEquation(e.target.value)}
          className="flex-1 p-2 border-2 rounded-lg text-black"
          placeholder="f(x)"
        />
        <div className="flex">
          Equation :{" "}
          {Equation ? (
            <MathEquation equation={`$${"f(x)"}=$ $${Equation}$`} />
          ) : (
            <MathEquation equation={`$${"f(x)"}=$`} />
          )}
        </div>
        <p className="text-lg">Input x</p>
        <input
          id="x"
          type="number"
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          onClick={(e) => e.target.select()}
          className="p-2 border-2 rounded-lg text-black"
          placeholder="x"
        />
        <button
          className="p-2 bg-custom-orange text-white rounded-lg"
          onClick={calculate}
        >
          Calculate
        </button>
        {answer && (
          <div className="text-center text-xl mt-10 mb-5">{answer}</div>
        )}
      </div>
      <div className="max-w-lg mx-auto">
        <div className="container flex flex-row justify-center overflow-x-auto">
          {data.length > 0 && (
            <Graph method="newton" data={data} equation={Equation} />
          )}
        </div>
        {showTable && showTableComponent()}
      </div>
    </div>
  );
}

export default NewtonRaphson;

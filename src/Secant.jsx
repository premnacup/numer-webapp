import { useState } from "react";
import { evaluate } from "mathjs";
import MathEquation from "./components/MathEquation";
import Graph from "./components/Graph";

function Secant() {
  const [Equation, setEquation] = useState("(x^2) - 7");
  const [x0, setX0] = useState(0);
  const [x1, setX1] = useState(1);
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const tolerance = 1e-6;

  const calculate = () => {
    const newData = [];
    let iter = 0;
    let currentX0 = x0;
    let currentX1 = x1;
    let nextX = x1;
    let error = Math.abs(nextX - currentX0);

    do {
      const fx0 = evaluate(Equation, { x: currentX0 });
      const fx1 = evaluate(Equation, { x: currentX1 });

      if (fx1 === fx0) {
        setAnswer("Division by zero. No solution found.");
        return;
      }

      nextX = currentX1 - (fx1 * (currentX1 - currentX0)) / (fx1 - fx0);
      error = Math.abs(nextX - currentX1);

      newData.push({
        iteration: iter,
        x: nextX,
        fx: evaluate(Equation, { x: nextX }),
        error: error,
      });

      currentX0 = currentX1;
      currentX1 = nextX;
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
          Secant Method Table
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
                  {element.error !== null ? element.error.toFixed(6) : "N/A"}
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
      <h1 className="text-3xl font-bold mb-4">Secant Method</h1>
      <div className="flex flex-col gap-4 max-w-lg mx-auto ">
        <p className="text-lg">Input equation</p>
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
        <p className="text-lg">Input x0 and x1</p>
        <input
          id="x0"
          type="number"
          value={x0}
          onChange={(e) => setX0(Number(e.target.value))}
          onClick={(e) => e.target.select()}
          className="p-2 border-2 rounded-lg text-black"
          placeholder="x0"
        />
        <input
          id="x1"
          type="number"
          value={x1}
          onChange={(e) => setX1(Number(e.target.value))}
          onClick={(e) => e.target.select()}
          className="p-2 border-2 rounded-lg text-black"
          placeholder="x1"
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
            <Graph method="secant" data={data} equation={Equation} />
          )}
        </div>
        {showTable && showTableComponent()}
      </div>
    </div>
  );
}

export default Secant;

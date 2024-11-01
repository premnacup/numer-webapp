import { useState } from "react";
import { cumsum, evaluate } from "mathjs";
import MathEquation from "../components/MathEquation";
import Graph from "../components/Graph";

function OnePoint() {
  const [Equation, setEquation] = useState("(1 / 2) * (x + 7 / x)");
  const [x, setX] = useState(1);
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const tolerance = 1e-6;

  const calculate = () => {
    const newData = [];
    let iter = 0;
    let currentX = x;
    let nextX = evaluate(Equation, { x: currentX });
    let error;

    newData.push({
      iteration: iter,
      x: currentX,
      fx: evaluate(Equation, { x: currentX }),
      error: Math.abs(nextX - currentX),
    });
    iter++;
    do {
      nextX = evaluate(Equation, { x: currentX });

      error = Math.abs(nextX - currentX);

      newData.push({
        iteration: iter,
        x: nextX,
        fx: evaluate(Equation, { x: nextX }),
        error,
      });

      currentX = nextX;
      iter++;
    } while (error > tolerance && iter < 100);

    setData(newData);
    setAnswer(`Answer : ${nextX.toFixed(6)}`);
    setShowTable(true);
  };

  const showTableComponent = () => {
    return (
      <div className="overflow-x-auto mb-20 w-full">
        <h3 className="text-center text-xl mt-10 mb-5 font-bold">
          One Point Iteration Method Table
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
      <h1 className="text-3xl font-bold mb-4">One Point Iteration Method</h1>
      <div className="flex flex-col gap-4 max-w-lg mx-auto ">
        <p className="text-lg">Input equation (g(x) = f(x))</p>
        <input
          id="equation"
          type="text"
          value={Equation}
          onChange={(e) => setEquation(e.target.value)}
          className="flex-1 p-2 border-2 rounded-lg text-black"
          placeholder="g(x)"
        />
        <div className="flex">
          Equation :{" "}
          {Equation ? (
            <MathEquation equation={`$${"g(x)"}=$ $${Equation}$`} />
          ) : (
            <MathEquation equation={`$${"g(x)"}=$`} />
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
            <Graph method="one-point" data={data} equation={Equation} />
          )}
        </div>
        {showTable && showTableComponent()}
      </div>
    </div>
  );
}

export default OnePoint;

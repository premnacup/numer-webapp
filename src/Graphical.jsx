import { useState } from "react";
import { evaluate } from "mathjs";
import MathEquation from "./components/MathEquation";
import Graph from "./components/Graph";

function Graphical() {
  const [Equation, setEquation] = useState("x^4 - 13");
  const [xStart, setxStart] = useState(1);
  const [xEnd, setxEnd] = useState(4);
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState("");
  const [showTable, setShowTable] = useState(false);

  const CalculateGraphical = (xs, xe) => {
    let xStartNum = parseFloat(xs);
    let xEndNum = parseFloat(xe);
    let newData = [];
    let iter = 0;
    let fxnum = evaluate(Equation, { x: xStartNum });
    newData.push({ iteration: iter, x: xStartNum, fx: fxnum });
    let ztemp = xStartNum;
    let toleranceArray = [
      1, 1e-1, 1e-2, 1e-3, 1e-4, 1e-5, 1e-6, 1e-7, 1e-8, 1e-9, 1e-10, 1e-11,
      1e-12, 1e-13,
    ];
    let count = 0;

    while (count < toleranceArray.length && ztemp < xEndNum) {
      let temp = ztemp;
      ztemp += toleranceArray[count];
      fxnum = evaluate(Equation, { x: ztemp });
      if (fxnum > 0 && ztemp > 0) {
        ztemp = temp;
        count++;
        continue;
      }

      iter++;
      newData.push({ iteration: iter, x: ztemp, fx: fxnum });

      if (count >= toleranceArray.length) {
        break;
      }
    }

    setData(newData);
    setAnswer(`Answer: ${ztemp.toFixed(6)}`);
    setShowTable(true);
  };

  const showTableComponent = () => {
    return (
      <div className="overflow-x-auto mb-20 w-full">
        <h3 className="text-center text-xl mt-10 mb-5 font-bold">
          Graphical Method Table
        </h3>
        <table className="relative overflow-x-auto sm:rounded-lg w-full border border-custom-blue">
          <thead className="bg-custom-blue">
            <tr>
              <th className="text-center text-white border border-custom-blue">
                Iteration
              </th>
              <th className="text-center text-white border border-custom-blue">
                x
              </th>
              <th className="text-center text-white border border-custom-blue">
                f(x)
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const calculate = () => {
    let fxStart = evaluate(Equation, { x: xStart });
    let fxEnd = evaluate(Equation, { x: xEnd });
    if (xStart >= xEnd) {
      alert("X-start must be less than X-end.");
      return;
    }
    if (fxStart * fxEnd > 0 && xStart >= 0 && xEnd >= 0) {
      alert("Can't find the answer.");
      return;
    }
    CalculateGraphical(xStart, xEnd);
  };

  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Graphical Method</h1>
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
        <p className="text-lg">Input xStart and xEnd</p>
        <input
          id="xStart"
          type="number"
          value={xStart}
          onChange={(e) => setxStart(Number(e.target.value))}
          onClick={(e) => e.target.select()}
          className="p-2 border-2 rounded-lg text-black"
          placeholder="xStart"
        />
        <input
          id="xEnd"
          type="number"
          value={xEnd}
          onChange={(e) => setxEnd(Number(e.target.value))}
          onClick={(e) => e.target.select()}
          className="p-2 border-2 rounded-lg text-black"
          placeholder="xEnd"
        />
        <button
          className="p-2 bg-custom-orange text-white rounded-lg"
          onClick={calculate}
        >
          Calculate
        </button>
        <div className="text-center text-xl mt-10 mb-5">{answer}</div>
      </div>
      <div className="max-w-lg mx-auto">
        <div className="container flex flex-row justify-center overflow-x-auto">
          {data.length > 0 && (
            <Graph method="graphical" data={data} equation={Equation} />
          )}
        </div>
        {showTable && showTableComponent()}
      </div>
    </div>
  );
}

export default Graphical;

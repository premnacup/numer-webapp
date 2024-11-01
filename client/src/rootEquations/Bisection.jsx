import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import MathEquation from "../components/MathEquation";
import Graph from "../components/Graph";
import axios from "axios";

function Bisection() {
  const [Equation, setEquation] = useState("x^4 - 13");
  const [xl, setXl] = useState(1);
  const [xr, setXr] = useState(2);
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState("");
  const [showTable, setShowTable] = useState(false);
  const tolerance = 1e-6;
  const API_URL = "YOUR_API_KEY";

  // useEffect(() => {
  //   const fetchBisections = async () => {
  //     try {
  //       const response = await axios.get(API_URL); // Update to your API endpoint
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchBisections();
  // }, []);

  const showAnswer = (xm) => (
    <div className="text-center text-xl mt-10 mb-5">
      Answer: {xm.toFixed(6)}
    </div>
  );

  // const saveBisectionRecord = async (record) => {
  //   try {
  //     const response = await axios.post(API_URL, record); // Update to your API endpoint
  //     setData((prevData) => [...prevData, response.data]); // Add new record to state
  //   } catch (error) {
  //     console.error("Error saving record:", error);
  //   }
  // };

  const CalculateBisection = (xl, xr) => {
    let fxrnum = evaluate(Equation, { x: xr });
    let currentError;
    let newData = [];
    let iter = 0;
    let xm, fxm;

    do {
      xm = (xl + xr) / 2;
      fxm = evaluate(Equation, { x: xm });
      currentError = Math.abs(xr - xl);
      newData.push({
        iteration: iter,
        Xl: xl,
        Xm: xm,
        Xr: xr,
        error: currentError,
        fxm: fxm,
      });
      if (fxm === 0.0) {
        break;
      } else if (fxm * fxrnum > 0) {
        xr = xm;
      } else {
        xl = xm;
      }
      iter++;
    } while (Math.abs(fxm) >= tolerance);

    setAnswer(showAnswer(xm));
    setData(newData);
    // saveBisectionRecord({ equation: Equation, xl, xr, answer: xm.toFixed(6) }); // Save record after calculation
  };

  const showTableComponent = () => {
    return (
      <div className="overflow-x-auto mb-20 w-full">
        <h3 className="text-center text-xl mt-10 mb-5 font-bold">
          Bisection Method Table
        </h3>
        <table className="relative overflow-x-auto sm:rounded-lg w-full border border-custom-blue">
          <thead className="bg-custom-blue">
            <tr>
              <th className="text-center text-white border border-custom-blue">
                Iteration
              </th>
              <th className="text-center text-white border border-custom-blue">
                XL
              </th>
              <th className="text-center text-white border border-custom-blue">
                XM
              </th>
              <th className="text-center text-white border border-custom-blue">
                XR
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
                  {element.Xl.toFixed(6)}
                </td>
                <td className="border border-custom-blue">
                  {element.Xm.toFixed(6)}
                </td>
                <td className="border border-custom-blue">
                  {element.Xr.toFixed(6)}
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

  const calculateRoot = () => {
    if (xl >= xr) {
      alert("XL must be less than XR.");
      return;
    }

    const fxl = evaluate(Equation, { x: xl });
    const fxr = evaluate(Equation, { x: xr });

    if (fxl * fxr >= 0 && xl >= 0 && xr >= 0) {
      alert("Can't find root. Please adjust XL and XR.");
      return;
    }

    try {
      CalculateBisection(xl, xr);
      setShowTable(true);
    } catch (error) {
      alert("Error evaluating the equation: " + error.message);
    }
  };

  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Bisection Method</h1>
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
        <p className="text-lg">Input XL and XR</p>
        <input
          id="xl"
          type="number"
          value={xl}
          onChange={(e) => setXl(Number(e.target.value))}
          onClick={(e) => e.target.select()}
          className="p-2 border-2 rounded-lg text-black"
          placeholder="XL"
        />
        <input
          id="xr"
          type="number"
          value={xr}
          onChange={(e) => setXr(Number(e.target.value))}
          onClick={(e) => e.target.select()}
          className="p-2 border-2 rounded-lg text-black"
          placeholder="XR"
        />
        <button
          className="p-2 bg-custom-orange text-white rounded-lg"
          onClick={calculateRoot}
        >
          Calculate
        </button>
        {answer}
      </div>
      <div className="max-w-lg mx-auto">
        <div className="container flex flex-row justify-center overflow-x-auto">
          {data.length > 0 && (
            <Graph method="bisection" data={data} equation={Equation} />
          )}
        </div>
        {showTable && showTableComponent()}
      </div>
    </div>
  );
}

export default Bisection;

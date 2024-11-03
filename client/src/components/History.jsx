import axios from "axios";
import { useEffect, useState } from "react";
function history() {
  const [data, setData] = useState([]);
  const API_URL = "https://numer-webapp-server.vercel.app/api";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/bisection`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="text-center mx-auto max-w-lg p-4">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <button
        onClick={fetchData}
        className="bg-custom-orange text-white font-bold py-2 px-4 rounded"
      >
        Refresh
      </button>
      <table className="table-fixed w-full mt-4">
        <thead>
          <tr>
            <th>Equation</th>
            <th>Xl</th>
            <th>Xr</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.equation}</td>
              <td>{item.xl}</td>
              <td>{item.xr}</td>
              <td>{item.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default history;

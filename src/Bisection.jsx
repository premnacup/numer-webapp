function Bisection() {
  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Bisection Method</h1>
      <div className="flex flex-col gap-4 max-w-lg mx-auto ">
        <p className="text-lg">Input equation</p>
        <div className="flex justify-center gap-4">
          <p className="text-lg my-auto">f(x)</p>
          <input
            type="text"
            className="flex-1 p-2 border-2 rounded-lg text-black"
            placeholder="f(x)"
          />
        </div>
        <p className="text-lg">Input XL and XR</p>
        <input
          type="number"
          className="p-2 border-2 rounded-lg text-black"
          placeholder="XL"
        />
        <input
          type="number"
          className="p-2 border-2 rounded-lg text-black"
          placeholder="XR"
        />
        <button className="p-2 bg-custom-orange text-white rounded-lg">
          Calculate
        </button>
      </div>
    </div>
  );
}
export default Bisection;

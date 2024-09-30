import "./App.css";

function App() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Root of Equations</h1>
      <hr className="border-2 border-white " />
      <div className="flex flex-wrap gap-4 pt-6 justify-between">
        <div className="bg-custom-orange rounded-lg flex items-center justify-center w-48 h-20">
          <p className="text-center">Graphical Method</p>
        </div>
        <div className="bg-custom-orange rounded-lg flex items-center justify-center w-48 h-20">
          <p className="text-center">Bisection Method</p>
        </div>
        <div className="bg-custom-orange rounded-lg flex items-center justify-center w-48 h-20">
          <p className="text-center">False Position Method</p>
        </div>
        <div className="bg-custom-orange rounded-lg flex items-center justify-center w-48 h-20">
          <p className="text-center">One Point Iteration Method</p>
        </div>
        <div className="bg-custom-orange rounded-lg flex items-center justify-center w-48 h-20">
          <p className="text-center">Newton Raphson Method</p>
        </div>
        <div className="bg-custom-orange rounded-lg flex items-center justify-center w-48 h-20">
          <p className="text-center">Secant Method</p>
        </div>
      </div>
    </div>
  );
}

export default App;

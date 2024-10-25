import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-custom-blue text-custom-orange font-bold h-16 px-4 text-lg">
      <div className="flex items-center">
        <Link to="/" className="ml-2 hover:underline">
          Home
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/" className="ml-2 hover:underline">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

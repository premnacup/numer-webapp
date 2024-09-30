function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-custom-blue text-custom-orange font-bold h-16 px-4 text-lg">
      <div className="flex items-center">
        <p className="mr-2">Logo</p>
        <p className="ml-2 hover:underline">Home</p>
      </div>
      <div className="flex items-center">
        <p className="mr-2 hover:underline">Login</p>
      </div>
    </nav>
  );
}

export default Navbar;

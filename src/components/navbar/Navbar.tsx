const Navbar = () => {
  return (
    <nav className="h-[7vh] w-full bg-blue-600 px-[20px]">
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-[20px] font-semibold text-white">
            Expense Tracker
          </h1>
        </div>
        <div className="flex items-center">
          {/* <ul className="flex items-center">
            <li className="mx-[20px]">Home</li>
            <li className="mx-[20px]">About</li>
            <li className="mx-[20px]">Contact</li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

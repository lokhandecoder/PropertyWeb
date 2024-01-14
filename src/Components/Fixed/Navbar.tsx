import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate()
  const handleSignOut = () => {
    localStorage.removeItem("Token");
    navigate('/login')
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <span className="font-semibold text-xl tracking-tight">
            Amit%Broker
          </span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <HiMenuAlt4 />
        </button>
      </div>
      <div
        className={`${
          toggleMenu ? 'block' : 'hidden'
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Home
          </Link>
          <Link
            to="/buy"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
          Buy
          </Link>
          <Link
            to="/sell"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
           Sell
          </Link>
        </div>
        <div>
          <Link
            to="/account"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Account
          </Link>
        </div>
        <div>
          <div
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            onClick={handleSignOut}
          >
            Sign Out
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
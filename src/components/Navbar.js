// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-pink-100 h-screen w-64 flex flex-col p-5">
      <div className="text-center font-bold text-lg mb-10">
        Latha sri Vurukuti
      </div>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700">
            <span className="material-icons">home</span>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/insight" className="flex items-center space-x-2 text-gray-700">
            <span className="material-icons">bar_chart</span>
            <span>Insight</span>
          </Link>
        </li>
        <li>
          <Link to="/transactions" className="flex items-center space-x-2 text-gray-700">
            <span className="material-icons">receipt</span>
            <span>Transaction</span>
          </Link>
        </li>
        <li>
          <Link to="/visualize" className="flex items-center space-x-2 text-gray-700">
            <span className="material-icons">assessment</span>
            <span>VisualizeData</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

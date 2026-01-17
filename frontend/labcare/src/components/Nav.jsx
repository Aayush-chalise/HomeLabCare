import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserAlt,
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import AppContext from "../context/AppContext";

const navLinks = [
  { name: "Home", icon: <FaHome />, to: "/" },
  { name: "About", icon: <FaInfoCircle />, to: "/about" },
  { name: "Services", icon: <MdMiscellaneousServices />, to: "/services" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { token, setToken, setUser } = useContext(AppContext);

  const handleToggle = () => setMobileOpen((open) => !open);

  // Logout handler: clear token/user and redirect to home (landing)
  const handleLogout = () => {
    if (setToken) setToken(null);
    if (setUser) setUser(null);
    localStorage.removeItem("token"); // if you store in localStorage
    setMobileOpen(false);
    navigate("/");
  };

  return (
    <nav
      className="
    fixed top-4 left-1/2 z-50 -translate-x-1/2
    w-[95vw] max-w-3xl
    bg-gradient-to-br from-[#050917] via-[#050a1c] to-[#040d19] 
    backdrop-blur-[2px]
    border border-neutral-800/70
    shadow-lg
    rounded-xl
    px-6 py-2
    flex items-center justify-between
  "
    >
      <Link
        to="/"
        className="font-semibold tracking-wide text-lg text-white flex items-center gap-2"
      >
        <span className="inline-block bg-[#131c2b] p-2 rounded-lg">
          <FaSignInAlt className="text-indigo-300" />
        </span>
        HomeLabCare
      </Link>

      <div className="hidden md:flex gap-4 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className="
          flex items-center gap-2
          px-3 py-2
          rounded-md
          text-white hover:text-indigo-300
          hover:bg-[#101825]
          transition-colors duration-150
          text-base
        "
          >
            <span className="text-lg">{link.icon}</span>
            {link.name}
          </Link>
        ))}

        {!token ? (
          <Link
            to="/login"
            className="
          ml-3 px-4 py-2 rounded-lg
          bg-[#1c2241] text-indigo-100 font-medium
          flex items-center gap-2
          border border-neutral-800
          shadow-sm
          hover:bg-indigo-800 hover:text-white
          transition-colors duration-150
        "
          >
            <FaSignInAlt />
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            type="button"
            className="
          ml-3 px-4 py-2 rounded-lg
          bg-[#802b30] text-indigo-100 font-medium
          flex items-center gap-2
          border border-neutral-800
          shadow-sm
          hover:bg-red-700 hover:text-white
          transition-colors duration-150
        "
          >
            <FaSignOutAlt />
            Logout
          </button>
        )}
      </div>

      <button
        className="md:hidden text-white p-2 rounded focus:outline-none focus:ring"
        aria-label={
          mobileOpen ? "Close navigation menu" : "Open navigation menu"
        }
        onClick={handleToggle}
      >
        {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {mobileOpen && (
        <div
          className="
        absolute top-16 left-1/2 -translate-x-1/2
        w-[92vw] max-w-xs
        bg-gradient-to-br from-[#050917] via-[#050a1c] to-[#040d19]
        border border-neutral-800/80
        rounded-xl
        backdrop-blur-[3px]
        shadow-lg
        py-3
        flex flex-col gap-2
        items-stretch
        md:hidden
      "
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="
            flex items-center gap-2
            px-5 py-3
            rounded-lg
            text-white hover:text-indigo-300
            hover:bg-[#101825]
            text-base
            transition-colors duration-150
          "
              onClick={() => setMobileOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {!token ? (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="
            flex items-center gap-2
            px-5 py-3 mt-1
            text-white bg-indigo-800 rounded-lg
            hover:bg-indigo-900
            transition-colors duration-150
            font-semibold
          "
            >
              <FaSignInAlt />
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              type="button"
              className="
            flex items-center gap-2
            px-5 py-3 mt-1
            text-white bg-[#802b30] rounded-lg
            hover:bg-red-700
            transition-colors duration-150
            font-semibold
          "
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

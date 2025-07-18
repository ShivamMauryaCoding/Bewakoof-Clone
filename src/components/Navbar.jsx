import React, { useState, useEffect } from "react";
import { CiSearch, CiHeart } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const updateUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoggedInUser(user);
    };

    // Run initially
    updateUser();

    // Listen for login update (from Login/Signup)
    window.addEventListener("storage", updateUser);

    return () => window.removeEventListener("storage", updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
    navigate("/"); // Redirect to home
    window.location.reload(); // Force re-render
  };

  return (
    <nav className="bg-white shadow fixed w-full z-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 w-28">
            <Link to="/">
              <img
                src="https://images.bewakoof.com/web/ic-desktop-bwkf-trademark-logo.svg"
                alt="Logo"
                className="w-full"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-6 font-medium text-sm">
            <Link to="/men">
              <p className="hover:text-yellow-400 transition">MEN</p>
            </Link>
            <Link to="/women">
              <p className="hover:text-yellow-400 transition">WOMEN</p>
            </Link>
            <Link to="/mobilecovers">
              <p className="hover:text-yellow-400 transition">MOBILE COVERS</p>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 rounded px-2 w-36 sm:w-52 md:w-64 lg:w-72 h-10">
            <CiSearch size={20} />
            <input
              type="text"
              placeholder="Search by products"
              className="ml-2 bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* Right Icons */}
          <div className="relative flex items-center space-x-4 text-sm font-medium">
            {loggedInUser ? (
              <div
                className="relative cursor-pointer hidden sm:block"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <p className="text-green-600 font-semibold">
                  {loggedInUser.name} ⌄
                </p>

                {dropdownOpen && (
                  <div className="absolute top-6 right-0 bg-white border rounded shadow-md py-2 z-10 w-28">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <p className="text-black font-semibold">
                  {loggedInUser?.name || "Login"} ⌄
                </p>
              </Link>
            )}

            <CiHeart size={24} className="cursor-pointer" />
            <Link to="/addtocart">
              <MdOutlineShoppingBag size={22} className="cursor-pointer" />
            </Link>

            {/* Hamburger */}
            <div className="lg:hidden ml-2">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white px-4 py-3 border-t border-gray-200">
          <div className="flex flex-col gap-4 font-medium text-sm">
            {["men", "women", "mobilecovers"].map((item) => (
              <NavLink to={`/${item}`} key={item}>
                <p className="cursor-pointer border-b border-gray-100 pb-2 capitalize">
                  {item}
                </p>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

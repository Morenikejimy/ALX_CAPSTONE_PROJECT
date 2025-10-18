import React, { useState } from "react";
import logo from "../assets/logo.png";
import searchIcon from "../assets/searchicon.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ userSearch }) {
  const [searchBook, setSearchBook] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchBook.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchBook.trim())}`);
    }
    if (userSearch) {
      userSearch(searchBook);
    }
  };

  return (
    <div className="sticky top-0 z-50 shadow-md bg-white">
      <nav className="bg-white flex items-center gap-4 px-6 py-4 border-b border-gray-200">
        <Link
          to="/"
          className="flex-shrink-0 hover:scale-110 transition-transform duration-200"
        >
          <img
            src={logo}
            alt="Library Logo"
            className="w-12 h-12 rounded-full shadow-lg"
          />
        </Link>

        <div className="flex-1">
          <div className="border border-gray-300 items-center rounded-full w-full px-5 py-3 flex hover:border-gray-400 transition-colors duration-300">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchBook}
              onChange={(e) => setSearchBook(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="flex-1 text-gray-800 outline-none bg-transparent placeholder:text-gray-400 text-base"
            />
            <button
              onClick={handleSearch}
              className="ml-2 hover:scale-110 transition-transform duration-200"
              aria-label="Search"
            >
              <img src={searchIcon} alt="Search" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* user section */}
        <div className="flex-shrink-0 hidden md:block">
          <input
            type="file"
            accept="image/*"
            id="profileUpload"
            className="hidden"
            onChange={(e) => {
              console.log("file selected:", e.target.files[0]?.name);
            }}
          />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

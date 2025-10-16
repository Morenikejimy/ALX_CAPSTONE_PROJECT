import React, { useState } from 'react';
import logo from '../assets/logo.png';
import searchIcon from '../assets/searchicon.png';

function Navbar({ userSearch }) {
  const [searchBook, setSearchBook] = useState('');

  const handleSearch = () => {
    if (userSearch) {
      userSearch(searchBook);
    }
  };

  return (
    <div>
      <nav className="bg-gray flex items-centers gap-4">
        <img src={logo} alt="" className="w-10 h-10" />

        <div className="border border-pink-500 items-center rounded-full w-full px-4 py-2 max-w-md flex">
          <input
            type="text"
            placeholder="Search books..."
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className="text-black-500 outline-none bg-transparent placeholder:text-black-500"
          />
          <img src={searchIcon} alt="" className="w-6 h-6 mr-2" />
        </div>

        {/* user section */}
        <div>
          <input
            type="file"
            accept="image/*"
            id="profileUpload"
            onChange={(e) => {
              console.log('file selected:', e.target.files[0]?.name);
            }}
          />
          <label htmlFor="profileUpload" className="cursor-pointer">
            <span className="text-blue-500">Upload Profile Picture</span>
          </label>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

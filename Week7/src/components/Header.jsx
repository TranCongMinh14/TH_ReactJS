import React from 'react';
import IconSearch from '../assets/img/Search.png'; 
import IconNotification from '../assets/img/Bell.png'; // Thay bằng icon chuông
import IconQuestion from '../assets/img/Question.png'; // Thay bằng icon dấu hỏi
import IconAvatar from '../assets/img/Avatar313.png'; // Thay bằng icon dấu hỏi
const Header = () => {
  return (
    <header className="p-4 bg-white shadow-sm flex justify-between items-center">
      <h2 className="text-2xl font-bold text-pink-600">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            className="px-3 py-1 pl-8 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 w-64"
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
          />
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"><img src={IconSearch} alt="" /></span>
        </div>
        <span>
          <img
            src={IconNotification}
            alt="notification"
            className="w-6 h-6"
          />
        </span>
        <span>
          <img
            src={IconQuestion}
            alt="question"
            className="w-6 h-6"
          />
        </span>
        <span>
          <img
            src={IconAvatar}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </span>
      </div>
    </header>
  );
};

export default Header;
// Card.js
import React from 'react';

const Card = ({ title, value, change, loading, icon, bgColor }) => {
  return (
    <div className={`p-4 rounded-lg shadow-sm ${bgColor}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-700">{title}</h3>
        <button
          type="button"
          className="p-1 rounded-md bg-white border border-gray-200 hover:bg-gray-100 transition-all"
        >
          <img src={icon} alt={`${title} Icon`} className="w-8 h-8" />
        </button>
      </div>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mt-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
      ) : (
        <>
          <p className="text-3xl font-bold text-gray-800 text-left">{value}</p>
          <p className="text-sm flex items-center mt-2">
            <span className="text-green-500 mr-1">▲</span>
            <span className="text-green-500 mr-1">{change}</span>
            <span className="text-gray-500">period of change</span>
          </p>
        </>
      )}
    </div>
  );
};

export default Card;
import React from 'react';

const Card = ({ title, value, change, loading }) => {
  return (
    <div className="card p-4 rounded-lg shadow-sm bg-gray-50">
      <h3 className="text-sm text-gray-600">{title}</h3>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mt-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500">{change}</p>
        </>
      )}
    </div>
  );
};

export default Card;
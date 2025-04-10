// Pagination.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalItems, currentPage, setCurrentPage, rowsPerPage }) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const maxPagesToShow = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = [];
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push("...");
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push("...");
    }
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-between mt-6 px-2">
      <p className="text-sm text-gray-500">{totalItems} results</p>
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink-500 rounded-full hover:bg-gray-100 transition"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
        </button>
        {pages.map((page, i) => (
          <button
            key={i}
            className={`w-8 h-8 flex items-center justify-center text-sm rounded-full transition ${
              page === currentPage
                ? "bg-pink-500 text-white"
                : page === "..."
                ? "text-gray-600 cursor-default"
                : "text-gray-600 hover:bg-gray-100 hover:text-pink-500"
            }`}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink-500 rounded-full hover:bg-gray-100 transition"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
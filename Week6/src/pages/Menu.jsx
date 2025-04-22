import React from "react";
import BookCard from "../components/BookCard"
import books from "../data/books";
function Menu() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Danh sách sách</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Menu;

import BookCard from "../components/BookCard";
import books from "../data/books";
import banner from "../assets/img/image1.png"; // Đảm bảo bạn đã thêm hình ảnh vào thư mục assets
const HomePage = () => {
  return (
    <div>
      {/* <div
        className="h-96 bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="text-left ml-20">
          <h1 className="text-5xl font-bold text-white mb-6">
            Enjoy Our Delicious Meal
          </h1>
          <p className="text-2xl text-white mb-6 max-w-4xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
            assumenda dicta maiores, id alias, quas illum vitae, dolorum
            repellendus sequi ipsam tempore voluptates nisi quam repellat
            ratione! Corporis, aliquam debitis!
          </p>

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Book Now
          </button>
        </div>
      </div> */}
      <h1 className="text-3xl font-bold mb-6">Danh sách sách</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

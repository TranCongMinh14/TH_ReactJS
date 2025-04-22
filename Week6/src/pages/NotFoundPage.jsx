import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Trang không tìm thấy</h2>
      <p className="text-xl text-gray-600 mb-8">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại.
      </p>
      <Link 
        to="/" 
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 inline-block"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
};

export default NotFoundPage;
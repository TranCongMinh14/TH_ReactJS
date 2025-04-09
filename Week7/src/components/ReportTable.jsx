import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt'; // Thêm import này để đảm bảo DataTable() được đăng ký
import 'datatables.net-select';
import axios from 'axios';
import { PencilIcon } from '@heroicons/react/24/outline';

const ReportTable = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // Gọi API để lấy dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/orders');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Khởi tạo DataTables
  useEffect(() => {
    if (!loading && data.length > 0) {
      const table = $(tableRef.current).DataTable({
        data: data,
        columns: [
          {
            title: '',
            data: null,
            orderable: false,
            className: 'select-checkbox',
            render: () => '',
          },
          {
            title: 'Customer Name',
            data: null,
            render: (data) =>
              `<div class="flex items-center space-x-2">
                <img src="${data.avatar}" alt="${data.customerName}" class="w-8 h-8 rounded-full" />
                <span>${data.customerName}</span>
              </div>`,
          },
          {
            title: 'Company',
            data: 'company',
          },
          {
            title: 'Order Value',
            data: 'orderValue',
          },
          {
            title: 'Order Date',
            data: 'orderDate',
          },
          {
            title: 'Status',
            data: 'status',
            render: (data) => {
              const colorClass =
                data === 'New'
                  ? 'bg-blue-100 text-blue-600'
                  : data === 'In-progress'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-green-100 text-green-600';
              return `<span class="px-2 py-1 rounded-full text-xs ${colorClass}">${data}</span>`;
            },
          },
          {
            title: 'Action',
            data: null,
            orderable: false,
            render: () =>
              `<button class="edit-btn text-gray-600 hover:text-gray-800">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </button>`,
          },
        ],
        select: {
          style: 'multi',
          selector: 'td:first-child',
        },
        order: [[1, 'asc']],
        pageLength: 5,
        lengthMenu: [5, 10, 25, 50],
        responsive: true,
        language: {
          search: 'Filter:',
          searchPlaceholder: 'Search orders...',
        },
      });

      // Thêm sự kiện cho nút Edit
      $(tableRef.current).on('click', '.edit-btn', function () {
        const rowData = table.row($(this).closest('tr')).data();
        alert(`Editing order for ${rowData.customerName}`);
      });

      // Cleanup DataTables khi component unmount
      return () => {
        table.destroy();
      };
    }
  }, [loading, data]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table ref={tableRef} className="w-full border-collapse"></table>
    </div>
  );
};

export default ReportTable;
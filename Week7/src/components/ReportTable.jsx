// ReportTable.js
import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-select";
import axios from "axios";
import ReportIcon from "../assets/img/ReportIcon.png";
import ImportIcon from "../assets/img/Import.png";
import ExportIcon from "../assets/img/Export.png";
import EditIcon from "../assets/img/Edit.png";

const ReportTable = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/orders");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && data.length > 0) {
      const table = $(tableRef.current).DataTable({
        data: data,
        columns: [
          {
            title:
              '<input type="checkbox" id="select-all" class="ml-2 w-5 h-5" />', // Thêm checkbox "Chọn tất cả" vào header
            data: null,
            orderable: false,
            className: "select-checkbox w-12 text-left", // Căn trái cột checkbox
            render: () =>
              '<input type="checkbox" class="ml-2 w-5 h-5 row-checkbox" />', // Checkbox cho từng hàng
          },
          {
            title: "CUSTOMER NAME",
            data: null,
            className: "py-3 px-4 text-gray-700 text-left", // Căn trái
            render: (data) =>
              `<div class="flex items-center space-x-2">
                <img src="${data.avatar}" alt="${data.customerName}" class="w-8 h-8 rounded-full" />
                <span>${data.customerName}</span>
              </div>`,
          },
          {
            title: "COMPANY",
            data: "company",
            className: "py-3 px-4 text-gray-700 text-left", // Căn trái
          },
          {
            title: "ORDER VALUE",
            data: "orderValue",
            className: "py-3 px-4 text-gray-700 text-left", // Căn trái
          },
          {
            title: "ORDER DATE",
            data: "orderDate",
            className: "py-3 px-4 text-gray-700 text-left", // Căn trái
          },
          {
            title: "STATUS",
            data: "status",
            className: "py-3 px-4 text-center", // Căn giữa cột Status
            render: (data) => {
              const colorClass =
                data === "New"
                  ? "bg-blue-100 text-blue-600"
                  : data === "In-progress"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600";
              return `<span class="px-2 py-1 rounded-full text-xs ${colorClass}">${data}</span>`;
            },
          },
          {
            title: "",
            data: null,
            orderable: false,
            className: "py-3 px-4 w-12 text-left", // Căn trái cột Edit
            render: () =>
              `<button class="edit-btn text-gray-600 hover:text-gray-800">
                 <img className="mr-1" src=${EditIcon} alt="EditIcon" />
              </button>`,
          },
        ],
        columnDefs: [
          { width: "5%", targets: 0 }, // Checkbox
          { width: "25%", targets: 1 }, // Customer Name
          { width: "25%", targets: 2 }, // Company
          { width: "15%", targets: 3 }, // Order Value
          { width: "15%", targets: 4 }, // Order Date
          { width: "15%", targets: 5 }, // Status
          { width: "5%", targets: 6 }, // Edit
        ],
        select: {
          style: "multi",
          selector: 'td:first-child input[type="checkbox"].row-checkbox',
        },
        order: [[4, "asc"]], // Sắp xếp theo Order Date tăng dần để khớp với hình ảnh mong muốn
        pageLength: 5,
        responsive: true,
        language: {
          search: "",
          searchPlaceholder: "Search orders...",
          paginate: {
            previous: '<span class="text-pink-500">←</span>',
            next: '<span class="text-pink-500">→</span>',
          },
          info: "_TOTAL_ results",
          infoEmpty: "0 results",
          infoFiltered: "",
        },
        dom: 'rt<"flex justify-between items-center mt-4"<"text-gray-600"i><"flex space-x-2"p>>',
        drawCallback: function (settings) {
          // Tùy chỉnh giao diện phân trang để hiển thị "← 1 2 3 4 ... 10 11 →"
          const api = this.api();
          const pageInfo = api.page.info();
          const totalPages = pageInfo.pages;
          let paginationHtml = "";

          // Nút Previous
          paginationHtml += `<span class="paginate_button previous ${
            pageInfo.page === 0 ? "disabled" : ""
          } px-2 py-1 text-gray-600 text-sm rounded-full transition-all"></span>`;

          // Các nút số trang
          const maxPagesToShow = 4;
          let startPage = Math.max(
            0,
            pageInfo.page - Math.floor(maxPagesToShow / 2)
          );
          let endPage = Math.min(
            totalPages - 1,
            startPage + maxPagesToShow - 1
          );

          if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(0, endPage - maxPagesToShow + 1);
          }

          for (let i = startPage; i <= endPage; i++) {
            paginationHtml += `<span class="paginate_button ${
              i === pageInfo.page ? "current" : ""
            } px-2 py-1 text-gray-600 text-sm rounded-full transition-all ${
              i === pageInfo.page ? "bg-pink-500 text-white" : ""
            }">${i + 1}</span>`;
          }

          // Dấu "..." nếu có nhiều trang hơn
          if (endPage < totalPages - 1) {
            paginationHtml += `<span class="paginate_button px-2 py-1 text-gray-600 text-sm rounded-full transition-all">...</span>`;
            paginationHtml += `<span class="paginate_button px-2 py-1 text-gray-600 text-sm rounded-full transition-all">${
              totalPages - 1
            }</span>`;
            paginationHtml += `<span class="paginate_button px-2 py-1 text-gray-600 text-sm rounded-full transition-all">${totalPages}</span>`;
          }

          // Nút Next
          paginationHtml += `<span class="paginate_button next ${
            pageInfo.page === totalPages - 1 ? "disabled" : " "
          } px-2 py-1 text-gray-600 text-sm rounded-full transition-all">→</span>`;

          $(tableRef.current)
            .closest(".dataTables_wrapper")
            .find(".dataTables_paginate")
            .html(paginationHtml);
        },
        initComplete: function () {
          // Xử lý sự kiện cho checkbox "Chọn tất cả"
          const table = this.api();
          $("#select-all").on("change", function () {
            const isChecked = $(this).is(":checked");
            table.rows().every(function () {
              const row = $(this.node());
              const checkbox = row.find("input.row-checkbox");
              checkbox.prop("checked", isChecked);
              if (isChecked) {
                row.addClass("selected bg-blue-200");
              } else {
                row.removeClass("selected bg-blue-200");
              }
            });
          });

          // Xử lý sự kiện cho checkbox từng hàng
          $(tableRef.current).on("change", "input.row-checkbox", function () {
            const row = $(this).closest("tr");
            if ($(this).is(":checked")) {
              row.addClass("selected bg-blue-200");
            } else {
              row.removeClass("selected bg-blue-200");
            }

            // Cập nhật trạng thái checkbox "Chọn tất cả"
            const allChecked = table.rows().every(function () {
              return $(this.node()).find("input.row-checkbox").is(":checked");
            });
            $("#select-all").prop(
              "checked",
              table.rows().nodes().to$().find("input.row-checkbox:checked")
                .length === table.rows().count()
            );
          });
        },
      });

      $(tableRef.current)
        .closest(".dataTables_wrapper")
        .find("thead th")
        .addClass(
          "bg-gray-100 text-gray-500 text-xs font-semibold uppercase py-3 px-4 border-b border-gray-200"
        );
      $(tableRef.current)
        .closest(".dataTables_wrapper")
        .find("tbody tr")
        .addClass("hover:bg-gray-50 border-b border-gray-200");
      $(tableRef.current)
        .closest(".dataTables_wrapper")
        .find(".dataTables_paginate .paginate_button")
        .addClass(
          "px-2 py-1 text-gray-600 text-sm rounded-full transition-all"
        );
      $(tableRef.current)
        .closest(".dataTables_wrapper")
        .find(".dataTables_paginate .paginate_button.current")
        .addClass("bg-pink-500 text-white");
      $(tableRef.current)
        .closest(".dataTables_wrapper")
        .find(".dataTables_paginate .paginate_button:hover")
        .addClass("bg-gray-100 text-pink-500");

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
    <div className="report">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <img src={ReportIcon} alt="Report Icon" className="w-5 h-5 mr-2" />
          <span className="text-pink-500">Detailed report</span>
        </h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition-all flex items-center">
            <img className="mr-1" src={ImportIcon} alt="ImportIcon" />
            Import
          </button>
          <button className="px-3 py-1 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition-all flex items-center">
            <img className="mr-1" src={ExportIcon} alt="ExportIcon" />
            Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table
          ref={tableRef}
          className="w-full border-collapse dataTable text-gray-700 text-sm"
        ></table>
      </div>
    </div>
  );
};

export default ReportTable;

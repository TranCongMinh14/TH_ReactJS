import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const Overview = () => {
  // State để lưu dữ liệu và trạng thái loading cho từng card
  const [turnover, setTurnover] = useState({ value: "", change: "" });
  const [profit, setProfit] = useState({ value: "", change: "" });
  const [newCustomer, setNewCustomer] = useState({ value: "", change: "" });

  const [turnoverLoading, setTurnoverLoading] = useState(true);
  const [profitLoading, setProfitLoading] = useState(true);
  const [newCustomerLoading, setNewCustomerLoading] = useState(true);

  // URL của json-server
  const BASE_URL = "http://localhost:3001";

  // Hàm gọi API cho Turnover
  const fetchTurnover = async () => {
    try {
      setTurnoverLoading(true);
      const response = await axios.get(`${BASE_URL}/turnover`);
      setTurnover({
        value: response.data.value,
        change: response.data.change,
      });
    } catch (error) {
      console.error("Error fetching turnover:", error);
      setTurnover({ value: "Error", change: "N/A" });
    } finally {
      setTurnoverLoading(false);
    }
  };

  // Hàm gọi API cho Profit
  const fetchProfit = async () => {
    try {
      setProfitLoading(true);
      const response = await axios.get(`${BASE_URL}/profit`);
      setProfit({
        value: response.data.value,
        change: response.data.change,
      });
    } catch (error) {
      console.error("Error fetching profit:", error);
      setProfit({ value: "Error", change: "N/A" });
    } finally {
      setProfitLoading(false);
    }
  };

  // Hàm gọi API cho New Customer
  const fetchNewCustomer = async () => {
    try {
      setNewCustomerLoading(true);
      const response = await axios.get(`${BASE_URL}/newCustomer`);
      setNewCustomer({
        value: response.data.value,
        change: response.data.change,
      });
    } catch (error) {
      console.error("Error fetching new customer:", error);
      setNewCustomer({ value: "Error", change: "N/A" });
    } finally {
      setNewCustomerLoading(false);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchTurnover();
    fetchProfit();
    fetchNewCustomer();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        title="Turnover"
        value={turnover.value}
        change={turnover.change}
        loading={turnoverLoading}
      />
      <Card
        title="Profit"
        value={profit.value}
        change={profit.change}
        loading={profitLoading}
      />
      <Card
        title="New Customer"
        value={newCustomer.value}
        change={newCustomer.change}
        loading={newCustomerLoading}
      />
    </div>
  );
};

export default Overview;

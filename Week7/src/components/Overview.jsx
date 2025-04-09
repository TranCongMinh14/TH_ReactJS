// Overview.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import IconTurnover from '../assets/img/ButtonTurnover.png';
import IconProfit from '../assets/img/ButtonProfit.png';
import IconNewCustomer from '../assets/img/ButtonNewCustomer.png';
import OverviewIcon from '../assets/img/SquaresFour1.png';

const Overview = () => {
  const [turnover, setTurnover] = useState({ value: '', change: '' });
  const [profit, setProfit] = useState({ value: '', change: '' });
  const [newCustomer, setNewCustomer] = useState({ value: '', change: '' });

  const [turnoverLoading, setTurnoverLoading] = useState(true);
  const [profitLoading, setProfitLoading] = useState(true);
  const [newCustomerLoading, setNewCustomerLoading] = useState(true);

  const BASE_URL = 'http://localhost:3001';

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setTurnoverLoading(true);
        setProfitLoading(true);
        setNewCustomerLoading(true);

        const [turnoverRes, profitRes, newCustomerRes] = await Promise.all([
          axios.get(`${BASE_URL}/turnover`),
          axios.get(`${BASE_URL}/profit`),
          axios.get(`${BASE_URL}/newCustomer`),
        ]);

        setTurnover({
          value: turnoverRes.data.value,
          change: turnoverRes.data.change,
        });
        setProfit({
          value: profitRes.data.value,
          change: profitRes.data.change,
        });
        setNewCustomer({
          value: newCustomerRes.data.value,
          change: newCustomerRes.data.change,
        });
      } catch (error) {
        console.error('Error fetching overview data:', error);
        setTurnover({ value: 'Error', change: 'N/A' });
        setProfit({ value: 'Error', change: 'N/A' });
        setNewCustomer({ value: 'Error', change: 'N/A' });
      } finally {
        setTurnoverLoading(false);
        setProfitLoading(false);
        setNewCustomerLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold flex items-center mb-4">
        <img src={OverviewIcon} alt="Overview Icon" className="w-5 h-5 mr-2" />
        Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="Turnover"
          value={turnover.value}
          change={turnover.change}
          loading={turnoverLoading}
          icon={IconTurnover}
          bgColor="bg-pink-50"
        />
        <Card
          title="Profit"
          value={profit.value}
          change={profit.change}
          loading={profitLoading}
          icon={IconProfit}
          bgColor="bg-blue-50"
        />
        <Card
          title="New Customer"
          value={newCustomer.value}
          change={newCustomer.change}
          loading={newCustomerLoading}
          icon={IconNewCustomer}
          bgColor="bg-blue-50"
        />
      </div>
    </div>
  );
};

export default Overview;
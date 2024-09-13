// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const Dashboard = ({ transactions, fetchTransactions }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Handle filtering transactions based on the selected year and month
  useEffect(() => {
    const formattedDate = format(selectedDate, 'yyyy-MM');
    const filtered = transactions.filter((transaction) =>
      transaction.date.startsWith(formattedDate)
    );
    setFilteredTransactions(filtered);
  }, [selectedDate, transactions]);

  const income = filteredTransactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  const expenses = filteredTransactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  const total = income - expenses;

  return (
    <div className="p-5">
      {/* Dropdown for selecting the year and month */}
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Select year and month</h2>
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="MMMM, yyyy"
          showMonthYearPicker
          className="p-2 border rounded datepicker-custom"
        />
      </div>

      {/* Income & Spending Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-100 p-5 rounded shadow text-center">
          <h2 className="text-lg font-bold">Income</h2>
          <p className="text-2xl font-bold text-green-500">
            CAD {income.toFixed(2)}
          </p>
          <p className="text-sm">Monthly</p>
        </div>
        <div className="bg-gray-100 p-5 rounded shadow text-center">
          <h2 className="text-lg font-bold">Expenses</h2>
          <p className="text-2xl font-bold text-red-500">
            CAD {expenses.toFixed(2)}
          </p>
          <p className="text-sm">Monthly</p>
        </div>
        <div className="bg-gray-100 p-5 rounded shadow text-center">
          <h2 className="text-lg font-bold">Total</h2>
          <p className="text-2xl font-bold">
            CAD {total.toFixed(2)}
          </p>
          <p className="text-sm">Monthly</p>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white shadow-md rounded p-5">
        <h2 className="text-xl font-bold mb-4">Transactions</h2>
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                <td className="px-4 py-2">{transaction.date}</td>
                <td className="px-4 py-2">{transaction.type === 'income' ? 'Income' : 'Expense'}</td>
                <td className="px-4 py-2">{transaction.category}</td>
                <td className="px-4 py-2">{transaction.description || '-'}</td>
                <td className={`px-4 py-2 font-bold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  CAD {transaction.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

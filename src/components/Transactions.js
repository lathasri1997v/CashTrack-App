// src/components/Transactions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = ({ fetchTransactions, transactions }) => {
  const [showModal, setShowModal] = useState(false);  // Modal to handle adding transactions
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    type: 'income', // Default transaction type
    description: '',
    category: '',
    amount: '',
  });

  useEffect(() => {
    fetchTransactions(); // Fetch transactions when the component loads
  }, [fetchTransactions]);

  // Handle input changes
  const handleChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  // Add a new transaction (POST request to the backend)
  const addTransaction = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/transactions', newTransaction);
      fetchTransactions();  // Refresh the transactions list
      setShowModal(false);  // Close modal after adding transaction
      setNewTransaction({ date: '', type: 'income', description: '', category: '', amount: '' });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Delete a transaction by ID
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/transactions/${id}`);
      fetchTransactions(); // Refresh the transactions list after deletion
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Check if the amount is a valid number
  const formatAmount = (amount) => {
    if (isNaN(amount) || amount === null || amount === undefined) {
      return '0.00'; // Default value if the amount is invalid
    }
    return parseFloat(amount).toFixed(2); // Ensures it's a valid float and formats it to 2 decimal places
  };

  const income = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount || 0), 0);

  const expenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount || 0), 0);

  const total = income - expenses;

  return (
    <div className="p-5">
      <div className="bg-white shadow-md rounded p-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Transactions</h2>
          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={() => setShowModal(true)}
          >
            +
          </button>
        </div>

        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                <td className="px-4 py-2">{transaction.date}</td>
                <td className="px-4 py-2">{transaction.type === 'income' ? 'Income' : 'Expense'}</td>
                <td className="px-4 py-2">{transaction.category}</td>
                <td className="px-4 py-2">{transaction.description || '-'}</td>
                <td className={`px-4 py-2 font-bold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  CAD {formatAmount(transaction.amount)}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Income & Spending Summary (Moved below the transactions) */}
      <div className="grid grid-cols-3 gap-4 mt-8 bg-white shadow-md rounded p-5">
        <div className="text-center">
          <h2 className="text-lg font-bold">Income</h2>
          <p className="text-2xl font-bold text-green-500">CAD {income.toFixed(2)}</p>
          <p className="text-sm">Monthly</p>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold">Expenses</h2>
          <p className="text-2xl font-bold text-red-500">CAD {expenses.toFixed(2)}</p>
          <p className="text-sm">Monthly</p>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold">Total</h2>
          <p className="text-2xl font-bold">CAD {total.toFixed(2)}</p>
          <p className="text-sm">Monthly</p>
        </div>
      </div>

      {/* Modal for Adding a New Transaction */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Add New Transaction</h2>
            <form onSubmit={addTransaction}>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newTransaction.date}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Type</label>
                <select
                  name="type"
                  value={newTransaction.type}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newTransaction.category}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={newTransaction.amount}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Transaction</button>
              <button
                type="button"
                className="ml-4 bg-gray-500 text-white p-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;

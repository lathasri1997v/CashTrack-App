// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Transactions from './components/Transactions';
import Dashboard from './components/Dashboard';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);

  // Define fetchTransactions as a function that gets the transactions from the backend
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/transactions');
      setTransactions(response.data); // Store the transactions in state
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, []);

  useEffect(() => {
    fetchTransactions(); // Fetch transactions when the app loads
  }, [fetchTransactions]);

  return (
    <Router>
      <div className="flex">
        <Navbar />
        <div className="flex-grow p-5">
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard transactions={transactions} fetchTransactions={fetchTransactions} />}
            />
            <Route
              path="/transactions"
              element={<Transactions transactions={transactions} fetchTransactions={fetchTransactions} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

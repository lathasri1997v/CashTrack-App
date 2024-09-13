const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs for transactions

const app = express();
app.use(cors());
app.use(bodyParser.json());

let transactions = []; // Empty array to start with, all data will come from the frontend

// GET all transactions
app.get('/transactions', (req, res) => {
  res.json(transactions); // Send the current list of transactions
});

// POST a new transaction
app.post('/transactions', (req, res) => {
  const newTransaction = { ...req.body, id: uuidv4() }; // Add a unique ID to the transaction
  transactions.push(newTransaction); // Push the new transaction into the transactions array
  res.status(201).json(newTransaction); // Return the newly added transaction
});

// DELETE a transaction by ID
app.delete('/transactions/:id', (req, res) => {
  const { id } = req.params;
  transactions = transactions.filter(transaction => transaction.id !== id); // Filter out the transaction with the given ID
  res.status(200).json({ message: 'Transaction deleted' }); // Send a confirmation response
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

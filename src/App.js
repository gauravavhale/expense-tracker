// App.jsx
import React, { useState } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !category) {
      alert('Please fill all fields');
      return;
    }

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString()
    };

    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
    setCategory('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <div className="expense-list">
        <h2>Expenses</h2>
        {expenses.length === 0 ? (
          <p>No expenses recorded</p>
        ) : (
          <>
            <ul>
              {expenses.map((expense) => (
                <li key={expense.id} className="expense-item">
                  <div>
                    <span>{expense.description}</span>
                    <span> {expense.amount.toFixed(2)} Rs</span>
                    <span>{expense.category}</span>
                    <span>{expense.date}</span>
                  </div>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <div className="total">
              <h3>Total: {totalAmount.toFixed(2)}  Rs</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
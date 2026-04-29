import { useState } from 'react'

const categories = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other'];
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('food');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!description.trim() || !parsed || parsed <= 0) return;

    onAdd({
      id: Date.now(),
      description: description.trim(),
      amount: parsed,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('food');
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field f-desc">
          <label htmlFor="tx-desc">Description</label>
          <input
            id="tx-desc"
            type="text"
            placeholder="e.g. Coffee, Paycheck…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-field f-amount">
          <label htmlFor="tx-amount">Amount</label>
          <input
            id="tx-amount"
            type="number"
            placeholder="0"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-field f-type">
          <label>Type</label>
          <div className="type-toggle" role="group" aria-label="Transaction type">
            <button
              type="button"
              className={type === 'income' ? 'active-income' : ''}
              onClick={() => setType('income')}
            >
              Income
            </button>
            <button
              type="button"
              className={type === 'expense' ? 'active-expense' : ''}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
          </div>
        </div>

        <div className="form-field f-category">
          <label htmlFor="tx-category">Category</label>
          <select id="tx-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{capitalize(cat)}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">Add →</button>
      </form>
    </div>
  );
}

export default TransactionForm

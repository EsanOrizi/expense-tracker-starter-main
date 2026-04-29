import { useState } from 'react'

const categories = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other'];
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const CATEGORY_COLORS = {
  food: '#f59e0b',
  housing: '#60a5fa',
  utilities: '#facc15',
  transport: '#2dd4bf',
  entertainment: '#c084fc',
  salary: '#4ece87',
  other: '#6b7280',
};

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  let filtered = transactions;
  if (filterType !== 'all') filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== 'all') filtered = filtered.filter(t => t.category === filterCategory);

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{capitalize(cat)}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No transactions match your filters.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td className="td-date">{t.date}</td>
                <td className="td-desc">{t.description}</td>
                <td>
                  <span className="category-badge">
                    <span
                      className="category-dot"
                      style={{ background: CATEGORY_COLORS[t.category] || '#6b7280' }}
                    />
                    {capitalize(t.category)}
                  </span>
                </td>
                <td>
                  <span className={`td-amount ${t.type}`}>
                    {t.type === 'income' ? '+' : '−'}${t.amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                  </span>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm('Delete this transaction?')) onDelete(t.id);
                    }}
                    title="Delete"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#f06274', '#f5a623', '#facc15', '#4ece87', '#60a5fa', '#c084fc', '#2dd4bf', '#fb923c'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1a1a2a',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 8,
      padding: '8px 14px',
      fontFamily: 'Outfit, sans-serif',
    }}>
      <p style={{ fontSize: '0.78rem', color: 'rgba(236,231,219,0.5)', textTransform: 'capitalize', marginBottom: 2 }}>{label}</p>
      <p style={{ fontSize: '0.95rem', fontFamily: 'DM Mono, monospace', color: '#ece7db', fontWeight: 500 }}>
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function SpendingChart({ transactions }) {
  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(categoryTotals).map(([name, value]) => ({ name: capitalize(name), value }));

  if (data.length === 0) {
    return null;
  }

  const axisStyle = { fontSize: 11, fill: 'rgba(236,231,219,0.3)', fontFamily: 'Outfit, sans-serif' };

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barCategoryGap="35%">
          <XAxis
            dataKey="name"
            tick={axisStyle}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={axisStyle}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="value" radius={[5, 5, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  AlertTriangle, TrendingDown, Lightbulb, GraduationCap, Target
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Syllo from '../components/Syllo';
import './Dashboard.css';

const chartData = [
  { name: 'Cloud Computing', demand: 92, coverage: 35 },
  { name: 'CI/CD', demand: 88, coverage: 15 },
  { name: 'AI/ML', demand: 95, coverage: 40 },
  { name: 'DevOps', demand: 85, coverage: 20 },
  { name: 'API Design', demand: 78, coverage: 45 },
  { name: 'Data Analytics', demand: 82, coverage: 50 },
  { name: 'Agile', demand: 70, coverage: 65 },
  { name: 'Testing', demand: 75, coverage: 55 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="dash-chart-tooltip">
        <p className="dash-chart-tooltip-label">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: {p.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => requestAnimationFrame(animate), 500);
    return () => clearTimeout(timer);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function Dashboard() {
  const navigate = useNavigate();

  const scoreCards = [
    {
      label: 'Curriculum Alignment Score',
      value: 62,
      suffix: '%',
      icon: Target,
      color: 'yellow',
      onClick: () => navigate('/diagnosis'),
    },
    {
      label: 'High-Risk Courses',
      value: 4,
      icon: AlertTriangle,
      color: 'red',
      onClick: () => navigate('/diagnosis'),
    },
    {
      label: 'Emerging Skills Missing',
      value: 11,
      icon: TrendingDown,
      color: 'orange',
      onClick: () => navigate('/diagnosis'),
    },
    {
      label: 'Recommended Updates',
      value: 18,
      icon: Lightbulb,
      color: 'yellow',
      onClick: () => navigate('/recommendations'),
    },
    {
      label: 'Graduate Readiness',
      value: 'Medium',
      icon: GraduationCap,
      color: 'orange',
      isText: true,
    },
  ];

  return (
    <DashboardLayout activeItem="Overview">
      <div className="dash-page">
        <div className="dash-page-header">
          <div>
            <h1 className="dash-page-title">Curriculum Overview</h1>
            <p className="dash-page-subtitle">
              School of Computing · Software Engineering Program
            </p>
          </div>
          <button className="dash-scan-btn" onClick={() => navigate('/upload')}>
            Start New Scan
          </button>
        </div>

        {/* Score Cards */}
        <div className="dash-cards">
          {scoreCards.map((card, i) => (
            <motion.div
              key={i}
              className={`dash-card dash-card-${card.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              onClick={card.onClick}
              whileHover={{ scale: 1.02, y: -2 }}
              style={{ cursor: card.onClick ? 'pointer' : 'default' }}
            >
              <div className="dash-card-icon">
                <card.icon size={20} />
              </div>
              <div className="dash-card-info">
                <span className="dash-card-label">{card.label}</span>
                <span className="dash-card-value">
                  {card.isText ? card.value : (
                    <>
                      <AnimatedCounter target={card.value} />
                      {card.suffix || ''}
                    </>
                  )}
                </span>
              </div>
              {card.onClick && (
                <div className="dash-card-arrow">→</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          className="dash-chart-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="dash-chart-header">
            <h2>Curriculum vs Market Demand</h2>
            <div className="dash-chart-legend">
              <span className="dash-legend-item">
                <span className="dash-legend-dot yellow" />
                Industry Demand
              </span>
              <span className="dash-legend-item">
                <span className="dash-legend-dot gray" />
                Current Coverage
              </span>
            </div>
          </div>
          <div className="dash-chart">
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={chartData} barGap={4} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#A8A8A0', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#A8A8A0', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={false}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="demand" name="Industry Demand" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill="#F5C518" fillOpacity={0.9} />
                  ))}
                </Bar>
                <Bar dataKey="coverage" name="Current Coverage" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill="#4A4A4A" fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick insight */}
        <motion.div
          className="dash-insight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="dash-insight-icon">💡</div>
          <div>
            <h3>Key Insight</h3>
            <p>
              The largest curriculum-market gap is in <strong>CI/CD and DevOps</strong>.
              Industry demand is at 88% while course coverage is only 15%. This represents
              the highest-priority area for curriculum updates.
            </p>
          </div>
        </motion.div>
      </div>

      <Syllo
        message="Your curriculum alignment is at 62%. Let's explore where the gaps are."
        pose="point"
        delay={1.5}
      />
    </DashboardLayout>
  );
}

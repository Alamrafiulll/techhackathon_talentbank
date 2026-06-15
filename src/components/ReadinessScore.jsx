import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ReadinessScore.css';

export default function ReadinessScore({ score = 0, size = 140, label, delay = 0.3 }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let c = 0;
      const interval = setInterval(() => {
        c += 1;
        setCurrent(c);
        if (c >= score) clearInterval(interval);
      }, 18);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [score, delay]);

  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (current / 100) * circumference;

  const getColor = () => {
    if (current >= 85) return 'var(--chalk-green)';
    if (current >= 70) return 'var(--yellow)';
    if (current >= 50) return 'var(--orange-soft)';
    return 'var(--red-soft)';
  };

  const getLabel = () => {
    if (current >= 85) return 'Future Ready';
    if (current >= 70) return 'Improving';
    if (current >= 50) return 'Needs Update';
    return 'Critical';
  };

  return (
    <motion.div
      className="readiness-score"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <div className="readiness-ring" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8"
          />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={getColor()} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dashoffset 0.3s ease, stroke 0.3s ease' }}
          />
        </svg>
        <div className="readiness-value">
          <span className="readiness-num">{current}</span>
          <span className="readiness-max">/ 100</span>
        </div>
      </div>
      {label && <span className="readiness-label">{label}</span>}
      <span className="readiness-status" style={{ color: getColor() }}>{getLabel()}</span>
    </motion.div>
  );
}

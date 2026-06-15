import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanSearch, AlertTriangle, Lightbulb, TrendingUp, ClipboardList, ArrowRight } from 'lucide-react';
import Syllo from '../components/Syllo';
import './FinalSuccess.css';

const impactCards = [
  { icon: ScanSearch, value: '1', label: 'Course Analyzed', color: 'yellow' },
  { icon: AlertTriangle, value: '11', label: 'Skill Gaps Detected', color: 'orange' },
  { icon: Lightbulb, value: '5', label: 'Updates Recommended', color: 'yellow' },
  { icon: TrendingUp, value: '64 → 87', label: 'Readiness Score', color: 'green' },
  { icon: ClipboardList, value: '1', label: 'Action Plan Generated', color: 'yellow' },
];

export default function FinalSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      {/* Animated background */}
      <div className="success-bg">
        <div className="success-bg-glow" />
        {/* University building lighting up */}
        <div className="success-university">
          <div className="success-uni-body" />
          <div className="success-uni-roof" />
          <div className="success-uni-windows">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="success-uni-window"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
        {/* Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="success-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${40 + Math.random() * 50}%`,
            }}
            animate={{
              y: [-10, -40, -10],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="success-content">
        {/* Badge */}
        <motion.div
          className="success-badge"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', damping: 10 }}
        >
          <div className="success-badge-ring">
            <motion.div
              className="success-badge-glow"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(245, 197, 24, 0.3)',
                  '0 0 40px rgba(245, 197, 24, 0.6)',
                  '0 0 20px rgba(245, 197, 24, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>🎓</span>
          </div>
        </motion.div>

        <motion.h1
          className="success-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          This course is now on track<br />
          <span className="success-title-accent">for the future.</span>
        </motion.h1>

        <motion.p
          className="success-subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          The university has moved from outdated curriculum review to
          evidence-based curriculum accountability.
        </motion.p>

        {/* Impact Cards */}
        <motion.div
          className="success-impact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {impactCards.map((card, i) => (
            <motion.div
              key={i}
              className={`success-impact-card ${card.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            >
              <div className="success-impact-icon">
                <card.icon size={18} />
              </div>
              <span className="success-impact-value">{card.value}</span>
              <span className="success-impact-label">{card.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Final message */}
        <motion.div
          className="success-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="success-message-bar" />
          <p>
            <strong>Future-State Curriculum Engine</strong> turns curriculum review
            into evidence-based institutional accountability.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.button
          className="success-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          onClick={() => navigate('/upload')}
        >
          Analyze Another Course
          <ArrowRight size={18} />
        </motion.button>

        {/* Mascot final message */}
        <motion.div
          className="success-mascot-msg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
        >
          <p>"Future-ready graduates start with future-ready courses."</p>
        </motion.div>
      </div>

      <Syllo
        message="Future-ready graduates start with future-ready courses."
        pose="celebrate"
        delay={2.5}
      />
    </div>
  );
}

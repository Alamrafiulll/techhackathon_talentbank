import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Briefcase, FileCheck, Shield, ArrowRight } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Syllo from '../components/Syllo';
import './ScoreImprovement.css';

const improvements = [
  { icon: TrendingUp, label: 'Market alignment', detail: 'Increased by 23%' },
  { icon: FileCheck, label: 'Practical evidence', detail: 'Significantly improved' },
  { icon: Briefcase, label: 'Employer relevance', detail: 'Improved' },
  { icon: Award, label: 'Student portfolio value', detail: 'Improved' },
  { icon: Shield, label: 'Curriculum risk', detail: 'Reduced' },
];

export default function ScoreImprovement() {
  const navigate = useNavigate();
  const [beforeScore, setBeforeScore] = useState(0);
  const [afterScore, setAfterScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Animate before score
    const timer1 = setTimeout(() => {
      let c = 0;
      const int = setInterval(() => {
        c += 1;
        setBeforeScore(c);
        if (c >= 64) clearInterval(int);
      }, 20);
    }, 500);

    // Animate after score
    const timer2 = setTimeout(() => {
      let c = 0;
      const int = setInterval(() => {
        c += 1;
        setAfterScore(c);
        if (c >= 87) {
          clearInterval(int);
          setTimeout(() => setShowConfetti(true), 300);
        }
      }, 18);
    }, 2000);

    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const beforeCircumference = 2 * Math.PI * 70;
  const afterCircumference = 2 * Math.PI * 70;

  return (
    <DashboardLayout activeItem="Outcome Forecast">
      <div className="score-page">
        <motion.h1
          className="score-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Score Improvement
        </motion.h1>
        <motion.p
          className="score-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          By adding 5 targeted updates, this course becomes significantly more aligned with 2027 graduate skill demand.
        </motion.p>

        {/* Score comparison */}
        <div className="score-comparison">
          <motion.div
            className="score-ring-card before"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Before</h3>
            <div className="score-ring">
              <svg viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <circle
                  cx="80" cy="80" r="70" fill="none"
                  stroke="var(--orange-soft)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={beforeCircumference}
                  strokeDashoffset={beforeCircumference - (beforeScore / 100) * beforeCircumference}
                  transform="rotate(-90 80 80)"
                  style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                />
              </svg>
              <div className="score-ring-value">
                <span className="score-ring-num">{beforeScore}</span>
                <span className="score-ring-max">/ 100</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="score-arrow"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            <ArrowRight size={32} />
          </motion.div>

          <motion.div
            className="score-ring-card after"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 }}
          >
            <h3>After Recommendations</h3>
            <div className="score-ring">
              <svg viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <circle
                  cx="80" cy="80" r="70" fill="none"
                  stroke="var(--yellow)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={afterCircumference}
                  strokeDashoffset={afterCircumference - (afterScore / 100) * afterCircumference}
                  transform="rotate(-90 80 80)"
                  style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                />
              </svg>
              <div className="score-ring-value">
                <span className="score-ring-num yellow">{afterScore}</span>
                <span className="score-ring-max">/ 100</span>
              </div>
            </div>
            {showConfetti && (
              <motion.div
                className="score-badge"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
              >
                🎓 Future Ready
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Confetti */}
        {showConfetti && (
          <div className="score-confetti">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  background: i % 3 === 0 ? 'var(--yellow)' : i % 3 === 1 ? 'var(--yellow-dim)' : 'var(--cream)',
                  width: `${4 + Math.random() * 6}px`,
                  height: `${4 + Math.random() * 6}px`,
                }}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{
                  y: 400,
                  opacity: 0,
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}

        {/* Improvements */}
        <motion.div
          className="score-improvements"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
        >
          <h2>Impact Summary</h2>
          <div className="score-improvement-grid">
            {improvements.map((imp, i) => (
              <motion.div
                key={i}
                className="score-improvement-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.2 + i * 0.1 }}
              >
                <div className="score-improvement-icon">
                  <imp.icon size={18} />
                </div>
                <div>
                  <span className="score-improvement-label">{imp.label}</span>
                  <span className="score-improvement-detail">{imp.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="score-cta-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <button
            className="score-cta"
            onClick={() => navigate('/action-plan')}
          >
            View Faculty Action Plan
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>

      <Syllo
        message="Score improved from 64 to 87! This course is now future-ready."
        pose="celebrate"
        delay={3}
      />
    </DashboardLayout>
  );
}

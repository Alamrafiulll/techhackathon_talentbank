import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Cpu, BarChart3, Users, ChevronRight, Sparkles } from 'lucide-react';
import Syllo from '../components/Syllo';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const trustBadges = [
    { icon: Building2, label: 'Built for universities' },
    { icon: Cpu, label: 'AI-powered curriculum intelligence' },
    { icon: BarChart3, label: 'Job-market aligned' },
    { icon: Users, label: 'Faculty-friendly' },
  ];

  return (
    <div className="landing">
      {/* Animated background */}
      <div className="landing-bg">
        <div className="landing-bg-grid" />
        <div className="landing-bg-glow" />
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`landing-particle particle-${i % 4}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 40, 0],
              x: [0, (Math.random() - 0.5) * 20, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
        {/* Floating paper sheets */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`paper-${i}`}
            className="landing-paper"
            style={{
              left: `${15 + i * 18}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [-5 + Math.random() * 10, 5 - Math.random() * 10, -5 + Math.random() * 10],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.2,
            }}
          >
            <div className="landing-paper-line" />
            <div className="landing-paper-line short" />
            <div className="landing-paper-line" />
            <div className="landing-paper-line short" />
          </motion.div>
        ))}
      </div>

      {/* Illustrated university scene */}
      <div className="landing-scene">
        {/* University building silhouette */}
        <div className="landing-university">
          <div className="landing-uni-tower">
            <div className="landing-uni-tower-top" />
            <div className="landing-uni-tower-body">
              <div className="landing-uni-window" />
              <div className="landing-uni-window" />
            </div>
          </div>
          <div className="landing-uni-main">
            <div className="landing-uni-pediment" />
            <div className="landing-uni-columns">
              <div className="landing-uni-column" />
              <div className="landing-uni-column" />
              <div className="landing-uni-column" />
              <div className="landing-uni-column" />
            </div>
            <div className="landing-uni-door" />
          </div>
        </div>

        {/* Floating dashboard */}
        <motion.div
          className="landing-dashboard-float"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <div className="landing-dash-glow" />
          <div className="landing-dash-mock">
            <div className="landing-dash-header">
              <div className="landing-dash-dot" />
              <div className="landing-dash-dot yellow" />
              <div className="landing-dash-dot" />
            </div>
            <div className="landing-dash-body">
              <div className="landing-dash-score">
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                  <motion.circle
                    cx="40" cy="40" r="32" fill="none"
                    stroke="var(--yellow)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="201"
                    initial={{ strokeDashoffset: 201 }}
                    animate={{ strokeDashoffset: 72 }}
                    transition={{ delay: 1.2, duration: 2, ease: 'easeOut' }}
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                <span className="landing-dash-score-num">64</span>
              </div>
              <div className="landing-dash-bars">
                {[75, 45, 90, 60, 30].map((w, i) => (
                  <motion.div
                    key={i}
                    className="landing-dash-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${w}%` }}
                    transition={{ delay: 1.5 + i * 0.15, duration: 0.6 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="landing-content">
        <motion.div
          className="landing-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles size={14} />
          <span>AI-Powered Curriculum Intelligence</span>
        </motion.div>

        <motion.h1
          className="landing-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Teach for the future,<br />
          <span className="landing-headline-accent">not the past.</span>
        </motion.h1>

        <motion.p
          className="landing-subheadline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Future-State Curriculum Engine helps universities detect outdated courses,
          predict future skills, and redesign programs before students graduate.
        </motion.p>

        <motion.div
          className="landing-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            className="landing-cta-primary"
            onClick={() => navigate('/dashboard')}
          >
            <span>Start Curriculum Scan</span>
            <ChevronRight size={18} />
          </button>
          <button
            className="landing-cta-secondary"
            onClick={() => navigate('/diagnosis')}
          >
            View Demo Report
          </button>
        </motion.div>

        <motion.div
          className="landing-trust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {trustBadges.map((badge, i) => (
            <div key={i} className="landing-trust-badge">
              <badge.icon size={14} />
              <span>{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <Syllo
        message="Let's see if this curriculum is future-ready."
        pose="wave"
        delay={2}
      />
    </div>
  );
}

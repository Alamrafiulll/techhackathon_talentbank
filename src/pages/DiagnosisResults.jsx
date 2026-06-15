import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, TrendingUp, X, ArrowRight } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Syllo from '../components/Syllo';
import './DiagnosisResults.css';

const currentSkills = [
  { name: 'SDLC', coverage: 'Covered' },
  { name: 'UML Diagrams', coverage: 'Covered' },
  { name: 'Agile Basics', coverage: 'Covered' },
  { name: 'Requirements Engineering', coverage: 'Covered' },
  { name: 'Software Testing', coverage: 'Partial' },
  { name: 'Documentation', coverage: 'Covered' },
];

const marketSkills = [
  { name: 'GitHub Workflow', demand: 88 },
  { name: 'CI/CD', demand: 92 },
  { name: 'Cloud Deployment', demand: 90 },
  { name: 'API Testing', demand: 85 },
  { name: 'Docker Basics', demand: 87 },
  { name: 'AI-Assisted Development', demand: 95 },
  { name: 'Product Analytics', demand: 78 },
];

const missingSkills = [
  { name: 'CI/CD not covered', severity: 'high', why: 'CI/CD is the standard for modern software delivery. 92% of job postings mention it.', suggestion: 'Add a 2-week CI/CD module using GitHub Actions.' },
  { name: 'Docker not covered', severity: 'high', why: 'Container deployment is now standard in enterprise. 87% of DevOps roles require it.', suggestion: 'Introduce Docker basics in Week 7 lab.' },
  { name: 'Cloud deployment not covered', severity: 'high', why: 'Cloud-native development is the new default. AWS/GCP/Azure skills are expected.', suggestion: 'Add cloud deployment assessment in Week 9.' },
  { name: 'AI-assisted coding not covered', severity: 'medium', why: 'AI coding tools are rapidly becoming standard. 70% of developers use AI assistants.', suggestion: 'Add AI ethics & tools discussion in Week 10.' },
  { name: 'Industry collaboration missing', severity: 'medium', why: 'Employer-reviewed projects significantly improve graduate employability.', suggestion: 'Partner with local companies for capstone review.' },
];

export default function DiagnosisResults() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setScore(current);
        if (current >= 64) clearInterval(interval);
      }, 25);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <DashboardLayout activeItem="Course Gap Analysis">
      <div className="diagnosis-page">
        <div className="diagnosis-header">
          <div>
            <h1>Curriculum Diagnosis: Software Engineering</h1>
            <p className="diagnosis-subtitle">Northbridge University · School of Computing</p>
          </div>
        </div>

        {/* Score + Status */}
        <div className="diagnosis-top">
          <motion.div
            className="diagnosis-score-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="diagnosis-score-ring">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke={score >= 80 ? 'var(--chalk-green)' : score >= 50 ? 'var(--yellow)' : 'var(--red-soft)'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 60 60)"
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>
              <div className="diagnosis-score-text">
                <span className="diagnosis-score-num">{score}</span>
                <span className="diagnosis-score-max">/ 100</span>
              </div>
            </div>
            <div className="diagnosis-score-info">
              <h2>Future Readiness Score</h2>
              <div className="diagnosis-status">
                <AlertTriangle size={14} />
                <span>Needs Update Before 2027</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Three Sections */}
        <div className="diagnosis-sections">
          {/* A: Current Skills */}
          <motion.div
            className="diagnosis-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3>
              <CheckCircle2 size={16} />
              What the course currently teaches
            </h3>
            <div className="diagnosis-skill-list">
              {currentSkills.map((skill, i) => (
                <div key={i} className={`diagnosis-skill current ${skill.coverage.toLowerCase()}`}>
                  <span className="diagnosis-skill-name">{skill.name}</span>
                  <span className={`diagnosis-skill-badge ${skill.coverage.toLowerCase()}`}>
                    {skill.coverage}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* B: Market Demand */}
          <motion.div
            className="diagnosis-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3>
              <TrendingUp size={16} />
              What the market is demanding
            </h3>
            <div className="diagnosis-skill-list">
              {marketSkills.map((skill, i) => (
                <div key={i} className="diagnosis-skill market">
                  <span className="diagnosis-skill-name">{skill.name}</span>
                  <div className="diagnosis-demand-bar">
                    <motion.div
                      className="diagnosis-demand-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.demand}%` }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
                    />
                  </div>
                  <span className="diagnosis-demand-value">{skill.demand}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* C: Missing Skills */}
          <motion.div
            className="diagnosis-section missing-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3>
              <AlertTriangle size={16} />
              Missing Future Skills
            </h3>
            <div className="diagnosis-missing-grid">
              {missingSkills.map((skill, i) => (
                <motion.div
                  key={i}
                  className={`diagnosis-missing-card ${skill.severity}`}
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ delay: 1.2 + i * 0.15 }}
                  onClick={() => setSelectedSkill(skill)}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="diagnosis-missing-icon">
                    <AlertTriangle size={14} />
                  </div>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Insight Card */}
        <motion.div
          className="diagnosis-insight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <div className="diagnosis-insight-bar" />
          <p>
            <strong>Students may graduate with theory knowledge, but limited evidence of modern
            software delivery skills.</strong> The course teaches software engineering concepts, but does not
            provide enough evidence that students can deliver modern software products in real-world environments.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="diagnosis-cta-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <button
            className="diagnosis-cta"
            onClick={() => navigate('/recommendations')}
          >
            <span>Generate Future-State Curriculum</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Skill Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              className="diagnosis-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                className="diagnosis-modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="diagnosis-modal-close" onClick={() => setSelectedSkill(null)}>
                  <X size={18} />
                </button>
                <h3>{selectedSkill.name}</h3>
                <div className="diagnosis-modal-section">
                  <h4>Why this matters</h4>
                  <p>{selectedSkill.why}</p>
                </div>
                <div className="diagnosis-modal-section">
                  <h4>Suggested Curriculum Update</h4>
                  <p>{selectedSkill.suggestion}</p>
                </div>
                <div className={`diagnosis-modal-severity ${selectedSkill.severity}`}>
                  Severity: {selectedSkill.severity === 'high' ? 'High Priority' : 'Medium Priority'}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Syllo
        message="The biggest gap is in CI/CD and cloud deployment. Let's fix that!"
        pose="point"
        delay={2}
      />
    </DashboardLayout>
  );
}

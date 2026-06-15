import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, Zap, Clock, Users, FileCheck } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Syllo from '../components/Syllo';
import './RecommendationPage.css';

const currentCourse = [
  'Lecture-heavy delivery',
  'UML assignment',
  'Written documentation',
  'Final exam',
  'Basic group project',
];

const futureCourse = [
  'GitHub-based team workflow',
  'API testing lab',
  'CI/CD mini pipeline',
  'Docker deployment task',
  'AI-assisted development ethics discussion',
  'Employer-reviewed final project',
  'Portfolio-ready evidence',
];

const recommendations = [
  {
    title: 'Add Practical DevOps Lab',
    priority: 'High',
    effort: 'Medium',
    impact: 'High',
    evidence: 'Lab report + deployment screenshot',
    week: 'Week 7',
    details: 'Introduce students to Docker, containerization, and basic infrastructure concepts through a hands-on lab environment.',
  },
  {
    title: 'Replace Final Exam with Product Delivery Sprint',
    priority: 'High',
    effort: 'High',
    impact: 'Very High',
    evidence: 'Working product + team retrospective',
    week: 'Week 11-12',
    details: 'Transform the traditional exam into a 2-week product sprint where teams deliver working software to simulated stakeholders.',
  },
  {
    title: 'Add Industry Micro-Brief',
    priority: 'Medium',
    effort: 'Low',
    impact: 'High',
    evidence: 'Brief proposal + peer review',
    week: 'Week 4',
    details: 'Students receive a real-world problem brief from an industry partner and propose a solution architecture.',
  },
  {
    title: 'Introduce AI Coding Policy',
    priority: 'Medium',
    effort: 'Low',
    impact: 'Medium',
    evidence: 'Policy discussion + reflection essay',
    week: 'Week 10',
    details: 'Address ethical AI use in software development, including when and how to use AI coding assistants responsibly.',
  },
  {
    title: 'Add CI/CD Mini Pipeline',
    priority: 'High',
    effort: 'Medium',
    impact: 'High',
    evidence: 'GitHub Actions screenshot + deployment log',
    week: 'Week 8',
    details: 'Students build a complete CI/CD pipeline using GitHub Actions, including automated tests, build steps, and deployment.',
  },
];

export default function RecommendationPage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (i) => {
    setExpanded(expanded === i ? null : i);
  };

  const priorityColor = (p) => {
    if (p === 'High' || p === 'Very High') return 'high';
    return 'medium';
  };

  return (
    <DashboardLayout activeItem="AI Recommendations">
      <div className="rec-page">
        <h1 className="rec-title">Recommended Future-State Curriculum</h1>
        <p className="rec-subtitle">Software Engineering · School of Computing</p>

        {/* Before / After */}
        <div className="rec-comparison">
          <motion.div
            className="rec-side rec-current"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>📋 Current Course</h3>
            <ul>
              {currentCourse.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <div className="rec-arrow">
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={24} />
            </motion.div>
          </div>

          <motion.div
            className="rec-side rec-future"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3>🚀 Future-State Course</h3>
            <ul>
              {futureCourse.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Recommendation Cards */}
        <div className="rec-cards-header">
          <h2>Targeted Recommendations</h2>
          <span className="rec-count">{recommendations.length} updates</span>
        </div>

        <div className="rec-cards">
          {recommendations.map((rec, i) => (
            <motion.div
              key={i}
              className="rec-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.12 }}
            >
              <div
                className="rec-card-header"
                onClick={() => toggleExpand(i)}
              >
                <div className="rec-card-left">
                  <span className={`rec-priority ${priorityColor(rec.priority)}`}>
                    {rec.priority}
                  </span>
                  <h4>{rec.title}</h4>
                </div>
                <button className="rec-expand-btn">
                  {expanded === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              <div className="rec-card-meta">
                <div className="rec-meta-item">
                  <Zap size={12} />
                  <span>Impact: {rec.impact}</span>
                </div>
                <div className="rec-meta-item">
                  <Clock size={12} />
                  <span>Effort: {rec.effort}</span>
                </div>
                <div className="rec-meta-item">
                  <Users size={12} />
                  <span>{rec.week}</span>
                </div>
                <div className="rec-meta-item">
                  <FileCheck size={12} />
                  <span>{rec.evidence}</span>
                </div>
              </div>

              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    className="rec-card-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p>{rec.details}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stamp animation */}
              <motion.div
                className="rec-stamp"
                initial={{ opacity: 0, scale: 1.5, rotate: -15 }}
                animate={{ opacity: 0.15, scale: 1, rotate: -12 }}
                transition={{ delay: 1.5 + i * 0.2 }}
              >
                FUTURE READY
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <div className="rec-ctas">
          <button
            className="rec-cta-primary"
            onClick={() => navigate('/score-improvement')}
          >
            Apply Recommendations
          </button>
          <button
            className="rec-cta-secondary"
            onClick={() => navigate('/action-plan')}
          >
            View Faculty Action Plan
          </button>
        </div>
      </div>

      <Syllo
        message="These 5 targeted updates can transform this course. Let's apply them!"
        pose="stamp"
        delay={2}
      />
    </DashboardLayout>
  );
}

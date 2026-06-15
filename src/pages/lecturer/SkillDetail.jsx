import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp, Target, Users, Clock, Plus, FileText, Download, Bookmark, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Syllo from '../../components/Syllo';
import './SkillDetail.css';

const rubric = [
  { criteria: 'Workflow setup', weight: 30 },
  { criteria: 'Test execution', weight: 25 },
  { criteria: 'Documentation', weight: 20 },
  { criteria: 'Reflection', weight: 15 },
  { criteria: 'Team collaboration', weight: 10 },
];

export default function SkillDetail() {
  const navigate = useNavigate();
  const [rubricOpen, setRubricOpen] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [toast, setToast] = useState(false);

  const handleAdd = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <DashboardLayout activeItem="Course Dashboard" role="lecturer">
      <div className="sd-page">
        <button className="sd-back" onClick={() => navigate('/lecturer')}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <motion.h1 className="sd-title" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          Add CI/CD to Software Engineering
        </motion.h1>
        <p className="sd-subtitle">SWE301 · Recommended skill addition</p>

        <div className="sd-panels">
          {/* Why */}
          <motion.div className="sd-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3>1. Why This Skill Matters</h3>
            <p className="sd-desc">
              CI/CD is increasingly expected in software engineering roles because employers want graduates who can test,
              integrate, and deploy software using real development workflows. Malaysian tech companies like Grab, AirAsia MOVE,
              and Petronas Digital increasingly require CI/CD proficiency.
            </p>
            <div className="sd-metrics">
              <div className="sd-metric"><TrendingUp size={16} /><span>Market Demand</span><strong>High (92%)</strong></div>
              <div className="sd-metric"><Target size={16} /><span>Coverage</span><strong className="red">Not Covered</strong></div>
              <div className="sd-metric"><Users size={16} /><span>Student Impact</span><strong>High</strong></div>
              <div className="sd-metric"><Clock size={16} /><span>Faculty Effort</span><strong className="yellow">Medium</strong></div>
            </div>
          </motion.div>

          {/* Where */}
          <motion.div className="sd-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h3>2. Where to Add It</h3>
            <div className="sd-week-badge">📅 Recommended: Week 8 — CI/CD Mini Pipeline</div>
            <div className="sd-outcome">
              <h4>Suggested Learning Outcome</h4>
              <p>Students will be able to configure a simple automated workflow that runs tests and prepares a software project for deployment.</p>
            </div>
          </motion.div>

          {/* Assessment */}
          <motion.div className="sd-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <h3>3. Assessment Design</h3>
            <div className="sd-assessment-title">📋 GitHub Actions Mini Lab</div>
            <div className="sd-submit-list">
              <h4>Students Submit:</h4>
              <ul>
                <li>GitHub repository link</li>
                <li>Workflow screenshot</li>
                <li>Test result log</li>
                <li>Short reflection on automation</li>
              </ul>
            </div>

            {/* Rubric Accordion */}
            <button className="sd-rubric-toggle" onClick={() => setRubricOpen(!rubricOpen)}>
              Assessment Rubric {rubricOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <AnimatePresence>
              {rubricOpen && (
                <motion.div
                  className="sd-rubric"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <table>
                    <thead><tr><th>Criteria</th><th>Weight</th></tr></thead>
                    <tbody>
                      {rubric.map((r, i) => (
                        <tr key={i}><td>{r.criteria}</td><td>{r.weight}%</td></tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div className="sd-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <button className="sd-btn primary" onClick={handleAdd}>
            <Plus size={16} /> Add to 14-Week Plan
          </button>
          <button className="sd-btn secondary" onClick={() => setShowActivity(true)}>
            <FileText size={14} /> Generate Lesson Activity
          </button>
          <button className="sd-btn secondary">
            <Download size={14} /> Generate Assessment Rubric
          </button>
          <button className="sd-btn outline">
            <Bookmark size={14} /> Save for Later
          </button>
        </motion.div>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              className="sd-toast"
              initial={{ opacity: 0, y: 30, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 30, x: '-50%' }}
            >
              <CheckCircle2 size={16} />
              <span>CI/CD has been added to Week 8 of your course plan.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Activity Modal */}
        <AnimatePresence>
          {showActivity && (
            <motion.div className="sd-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowActivity(false)}>
              <motion.div className="sd-modal" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
                <h2>🤖 AI-Generated Lesson Activity</h2>
                <div className="sd-modal-content">
                  <h4>CI/CD Mini Pipeline Lab (90 minutes)</h4>
                  <ol>
                    <li><strong>Introduction (15 min):</strong> Explain CI/CD concepts and why automation matters in modern software delivery.</li>
                    <li><strong>Demo (15 min):</strong> Walk through setting up a GitHub Actions workflow file (.yml) with test and build stages.</li>
                    <li><strong>Hands-on Lab (45 min):</strong> Students fork a starter repo, write a workflow that runs tests on push, and trigger their first automated build.</li>
                    <li><strong>Reflection & Discussion (15 min):</strong> Students write a short reflection on how CI/CD changes the development workflow.</li>
                  </ol>
                  <p className="sd-modal-note">💡 This activity aligns with MQA Programme Standards for practical evidence in computing programmes.</p>
                </div>
                <button className="sd-btn primary" onClick={() => setShowActivity(false)}>Close</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Syllo
        message="This is a high-impact, medium-effort update. Perfect starting point!"
        pose="wave"
        delay={1.5}
      />
    </DashboardLayout>
  );
}

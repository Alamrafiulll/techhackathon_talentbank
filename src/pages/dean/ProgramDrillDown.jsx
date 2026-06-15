import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, ArrowRight } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import ReadinessScore from '../../components/ReadinessScore';
import Syllo from '../../components/Syllo';
import './ProgramDrillDown.css';

const courses = [
  { code: 'SWE301', name: 'Software Engineering', score: 64, missing: 'CI/CD, Docker, Cloud', risk: 'High', action: 'Committee Review' },
  { code: 'SWE405', name: 'Software Project Management', score: 70, missing: 'Product Analytics, Jira', risk: 'Medium', action: 'Lecturer Update' },
  { code: 'SWE410', name: 'Cloud Application Development', score: 59, missing: 'Security, DevOps', risk: 'Critical', action: 'Urgent Review' },
  { code: 'SWE202', name: 'Data Structures & Algorithms', score: 82, missing: 'Competitive Programming', risk: 'Low', action: 'Minor Update' },
  { code: 'SWE350', name: 'Mobile Application Development', score: 71, missing: 'Flutter, CI/CD', risk: 'Medium', action: 'Lecturer Update' },
];

const strategicActions = [
  { title: 'Launch faculty training on DevOps and Cloud', impact: 'High', cost: 'RM 15,000', timeline: '1 month', responsible: 'FCSIT Training Unit', priority: 'Urgent' },
  { title: 'Update 3 high-risk courses before next semester', impact: 'Very High', cost: 'RM 5,000', timeline: '3 months', responsible: 'Department Heads', priority: 'Urgent' },
  { title: 'Add employer-reviewed final projects', impact: 'High', cost: 'RM 3,000', timeline: '2 months', responsible: 'Industry Liaison', priority: 'High' },
  { title: 'Create faculty-wide assessment evidence standard', impact: 'Medium', cost: 'RM 2,000', timeline: '2 months', responsible: 'Quality Assurance Unit', priority: 'High' },
  { title: 'Partner with industry mentors for project review', impact: 'High', cost: 'RM 8,000', timeline: '3 months', responsible: 'MDEC/PIKOM Liaison', priority: 'Medium' },
];

export default function ProgramDrillDown() {
  const navigate = useNavigate();

  const getRiskClass = (risk) => {
    if (risk === 'Critical') return 'risk-critical';
    if (risk === 'High') return 'risk-high';
    if (risk === 'Medium') return 'risk-medium';
    return 'risk-low';
  };

  return (
    <DashboardLayout activeItem="Programme Readiness" role="dean">
      <div className="pd-page">
        <button className="pd-back" onClick={() => navigate('/dean')}>
          <ArrowLeft size={16} /> Back to Faculty Overview
        </button>

        <div className="pd-header">
          <div>
            <h1>Programme Readiness: Software Engineering</h1>
            <p className="pd-subtitle">Bachelor of Computer Science (Software Engineering) · FCSIT</p>
          </div>
        </div>

        {/* Score + Summary */}
        <div className="pd-top-row">
          <motion.div className="pd-score-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <ReadinessScore score={68} size={140} label="Programme Readiness" delay={0.5} />
            <div className="pd-risk-tag">
              <AlertTriangle size={14} /> Moderate Risk
            </div>
          </motion.div>

          <motion.div className="pd-summary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3>Programme Summary</h3>
            <div className="pd-stats">
              <div><span>Total Courses</span><strong>18</strong></div>
              <div><span>Updated</span><strong className="green">6</strong></div>
              <div><span>Needing Review</span><strong className="yellow">7</strong></div>
              <div><span>Critical</span><strong className="red">3</strong></div>
              <div><span>Employer Alignment</span><strong>61%</strong></div>
            </div>
          </motion.div>
        </div>

        {/* Course Risk Table */}
        <motion.div className="pd-table-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2>Course Risk Assessment</h2>
          <div className="pd-table-scroll">
            <table className="pd-table">
              <thead>
                <tr><th>Code</th><th>Course Name</th><th>Score</th><th>Missing Skills</th><th>Risk</th><th>Action Required</th></tr>
              </thead>
              <tbody>
                {courses.map((c, i) => (
                  <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.08 }}>
                    <td className="pd-code">{c.code}</td>
                    <td className="pd-name">{c.name}</td>
                    <td><span className="pd-score">{c.score}/100</span></td>
                    <td className="pd-missing">{c.missing}</td>
                    <td><span className={`pd-risk ${getRiskClass(c.risk)}`}>{c.risk}</span></td>
                    <td className="pd-action">{c.action}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Strategic Actions */}
        <motion.div className="pd-strategic" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <h2>Recommended Faculty Actions</h2>
          <div className="pd-action-cards">
            {strategicActions.map((a, i) => (
              <motion.div
                key={i}
                className="pd-action-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <h4>{a.title}</h4>
                <div className="pd-action-meta">
                  <span>Impact: <strong>{a.impact}</strong></span>
                  <span>Cost: <strong>{a.cost}</strong></span>
                  <span>Timeline: <strong>{a.timeline}</strong></span>
                  <span>Owner: <strong>{a.responsible}</strong></span>
                  <span className={`pd-action-priority ${a.priority.toLowerCase()}`}>{a.priority}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Actions */}
        <motion.div className="pd-bottom-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <button className="pd-btn primary" onClick={() => navigate('/dean/roadmap')}>
            Create Faculty Action Roadmap <ArrowRight size={16} />
          </button>
          <button className="pd-btn secondary" onClick={() => navigate('/committee')}>
            Send Report to Committee
          </button>
          <button className="pd-btn outline">Download Executive Summary</button>
        </motion.div>
      </div>

      <Syllo message="3 courses in this programme need urgent updates. Let's create a roadmap." pose="point" delay={2} />
    </DashboardLayout>
  );
}

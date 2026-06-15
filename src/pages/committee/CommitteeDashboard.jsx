import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle2, TrendingUp, Users, Sparkles } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Syllo from '../../components/Syllo';
import './CommitteeDashboard.css';

function AnimCounter({ target, duration = 1800 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(typeof target === 'number' ? Math.floor(p * target) : target);
      if (p < 1) requestAnimationFrame(animate);
    };
    const t = setTimeout(() => requestAnimationFrame(animate), 400);
    return () => clearTimeout(t);
  }, [target, duration]);
  return <span>{count}</span>;
}

const summaryCards = [
  { label: 'Pending Reviews', value: 7, icon: FileText, color: 'yellow' },
  { label: 'High-Risk Courses', value: 3, icon: AlertTriangle, color: 'red' },
  { label: 'Approved Updates', value: 12, icon: CheckCircle2, color: 'green' },
  { label: 'Avg. Future Readiness', value: 71, suffix: '%', icon: TrendingUp, color: 'yellow' },
  { label: 'Employer Alignment', value: 18, prefix: '+', suffix: '%', icon: Users, color: 'green' },
];

const courses = [
  { code: 'SWE301', name: 'Software Engineering', dept: 'FCSIT', score: 64, risk: 'High', update: 'Add CI/CD, Docker, Cloud Deployment', submittedBy: 'Dr. Rahman', status: 'Pending Review' },
  { code: 'BUS220', name: 'Business Analytics', dept: 'Faculty of Business', score: 69, risk: 'Medium', update: 'Add Power BI and Predictive Analytics', submittedBy: 'Ms. Tan', status: 'Pending Review' },
  { code: 'CYB210', name: 'Cybersecurity Fundamentals', dept: 'FCSIT', score: 58, risk: 'Critical', update: 'Add Cloud Security and SIEM Lab', submittedBy: 'Dr. Lim', status: 'Pending Review' },
];

const aiInsights = [
  '3 courses need urgent review before next semester.',
  'Software Engineering has a high gap in modern software delivery skills.',
  'Cybersecurity Fundamentals shows a critical missing lab component.',
];

export default function CommitteeDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'approved', 'decisions'

  const getRiskClass = (risk) => {
    if (risk === 'Critical') return 'risk-critical';
    if (risk === 'High') return 'risk-high';
    return 'risk-medium';
  };

  return (
    <DashboardLayout activeItem="Review Dashboard" role="committee">
      <div className="cd-page">
        <div className="cd-header">
          <div>
            <h1 className="cd-title">Curriculum Committee Review Dashboard</h1>
            <p className="cd-subtitle">Faculty of Computer Science & IT (FCSIT) · ASA University</p>
          </div>
        </div>

        {/* In-Page Navigation Tabs */}
        <div className="cd-tabs-container">
          <button className={`cd-tab-btn ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
            <FileText size={16} /> Pending Reviews (3)
          </button>
          <button className={`cd-tab-btn ${activeTab === 'approved' ? 'active' : ''}`} onClick={() => setActiveTab('approved')}>
            <CheckCircle2 size={16} /> Approved Updates (12)
          </button>
          <button className={`cd-tab-btn ${activeTab === 'decisions' ? 'active' : ''}`} onClick={() => setActiveTab('decisions')}>
            <Users size={16} /> Committee Decisions
          </button>
        </div>

        {/* Summary Cards */}
        <div className="cd-cards">
          {summaryCards.map((card, i) => (
            <motion.div
              key={i}
              className={`cd-card cd-card-${card.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="cd-card-icon"><card.icon size={20} /></div>
              <div className="cd-card-info">
                <span className="cd-card-label">{card.label}</span>
                <span className="cd-card-value">
                  {card.prefix || ''}<AnimCounter target={card.value} />{card.suffix || ''}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="cd-main-grid">
          {/* Table / Tab Content */}
          <div className="cd-left-content">
            {activeTab === 'pending' && (
              <motion.div
                className="cd-table-wrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2>Courses Awaiting Review</h2>
                <div className="cd-table-scroll">
                  <table className="cd-table">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Course Name</th>
                        <th>Department</th>
                        <th>Score</th>
                        <th>Risk</th>
                        <th>Proposed Update</th>
                        <th>Submitted By</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((c, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <td className="cd-code">{c.code}</td>
                          <td className="cd-name">{c.name}</td>
                          <td>{c.dept}</td>
                          <td><span className="cd-score">{c.score}/100</span></td>
                          <td><span className={`cd-risk ${getRiskClass(c.risk)}`}>{c.risk}</span></td>
                          <td className="cd-update">{c.update}</td>
                          <td>{c.submittedBy}</td>
                          <td><span className="cd-status">{c.status}</span></td>
                          <td>
                            <button
                              className="cd-view-btn"
                              onClick={() => navigate('/committee/brief')}
                            >
                              View Brief
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'approved' && (
              <motion.div
                className="cd-table-wrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2>MQA Approved Updates</h2>
                <div className="cd-table-scroll">
                  <table className="cd-table">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Course Name</th>
                        <th>Accreditation Date</th>
                        <th>Readiness Score</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="cd-code">MAT101</td>
                        <td className="cd-name">Discrete Mathematics</td>
                        <td>10 Jun 2026</td>
                        <td><span className="cd-score" style={{ color: 'var(--chalk-green)' }}>89/100</span></td>
                        <td><span className="cd-risk" style={{ background: 'var(--status-approved-bg)', color: 'var(--chalk-green)' }}>Pilot Live</span></td>
                      </tr>
                      <tr>
                        <td className="cd-code">SAD204</td>
                        <td className="cd-name">Systems Analysis & Design</td>
                        <td>08 Jun 2026</td>
                        <td><span className="cd-score" style={{ color: 'var(--chalk-green)' }}>85/100</span></td>
                        <td><span className="cd-risk" style={{ background: 'var(--status-approved-bg)', color: 'var(--chalk-green)' }}>Pilot Live</span></td>
                      </tr>
                      <tr>
                        <td className="cd-code">PHY102</td>
                        <td className="cd-name">Physics for Computing</td>
                        <td>05 Jun 2026</td>
                        <td><span className="cd-score" style={{ color: 'var(--chalk-green)' }}>82/100</span></td>
                        <td><span className="cd-risk" style={{ background: 'var(--status-approved-bg)', color: 'var(--chalk-green)' }}>Approved</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'decisions' && (
              <motion.div
                className="cd-table-wrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2>Jawatankuasa Decisions & Accreditation Archive</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                  Access the formal records of syllabus updates, curriculum board reports, and accreditation packages for quality assurance reviewers.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="cd-card cd-card-yellow" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--yellow)', fontWeight: 600 }}>MQA Alignment Package</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Generate alignment dossier compiling skill gaps, demand evidence, and syllabus mapping files.</p>
                    <button className="cd-view-btn" style={{ padding: '4px 12px', fontSize: '0.75rem', marginTop: '8px' }}>Generate Package</button>
                  </div>
                  <div className="cd-card cd-card-green" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--chalk-green)', fontWeight: 600 }}>Curriculum Board Minutes</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Export official log of decisions, reviewer feedback notes, and approved course pilot allocations.</p>
                    <button className="cd-view-btn" style={{ padding: '4px 12px', fontSize: '0.75rem', marginTop: '8px', borderColor: 'var(--chalk-green)', color: 'var(--chalk-green)' }}>Download Minutes</button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* AI Sidebar */}
          <motion.div
            className="cd-ai-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="cd-ai-header">
              <Sparkles size={16} />
              <h3>AI Review Assistant</h3>
            </div>
            <div className="cd-ai-insights">
              {aiInsights.map((insight, i) => (
                <motion.div
                  key={i}
                  className="cd-ai-insight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.2 }}
                >
                  <div className="cd-ai-dot" />
                  <p>{insight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Syllo
        message="3 courses are waiting for your review. Start with the highest-risk one."
        pose="point"
        delay={2}
      />
    </DashboardLayout>
  );
}

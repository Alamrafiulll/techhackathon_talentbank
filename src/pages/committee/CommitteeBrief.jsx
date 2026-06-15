import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { AlertTriangle, CheckCircle2, ArrowRight, Download, Send, X, ArrowLeft } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import ReadinessScore from '../../components/ReadinessScore';
import Syllo from '../../components/Syllo';
import './CommitteeBrief.css';

const chartData = [
  { name: 'GitHub Workflow', demand: 88, coverage: 30 },
  { name: 'CI/CD', demand: 92, coverage: 10 },
  { name: 'Docker', demand: 87, coverage: 5 },
  { name: 'Cloud Deploy', demand: 90, coverage: 12 },
  { name: 'API Testing', demand: 85, coverage: 35 },
  { name: 'AI-Assisted Dev', demand: 95, coverage: 15 },
  { name: 'Product Analytics', demand: 78, coverage: 40 },
];

const gaps = [
  'CI/CD pipeline not covered in any module',
  'Docker containerisation entirely absent',
  'Cloud deployment not addressed',
  'API testing weakly covered — theory only',
  'Final assessment is too theory-heavy — no practical evidence',
];

const recommendations = [
  { title: 'Add CI/CD Mini Lab', priority: 'High', effort: 'Medium', impact: 'High', evidence: 'GitHub Actions screenshot + test log', week: 'Week 8' },
  { title: 'Add Docker Deployment Task', priority: 'High', effort: 'Medium', impact: 'High', evidence: 'Working container + Dockerfile', week: 'Week 7' },
  { title: 'Add API Testing Assignment', priority: 'Medium', effort: 'Low', impact: 'High', evidence: 'Test report + API collection', week: 'Week 5' },
  { title: 'Add GitHub Team Workflow', priority: 'High', effort: 'Low', impact: 'High', evidence: 'PR review log + collaboration history', week: 'Week 2' },
  { title: 'Replace final exam with product sprint', priority: 'High', effort: 'High', impact: 'Very High', evidence: 'Working product + retrospective', week: 'Week 13-14' },
];

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="cb-tooltip">
        <p className="cb-tooltip-label">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value}%</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CommitteeBrief() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [approved, setApproved] = useState(false);
  const [afterScore, setAfterScore] = useState(0);
  const [notes, setNotes] = useState('');
  const [sylloMsg, setSylloMsg] = useState("Review the evidence carefully. The data supports this update.");

  useEffect(() => {
    const t = setTimeout(() => {
      let c = 0;
      const int = setInterval(() => { c++; setAfterScore(c); if (c >= 87) clearInterval(int); }, 20);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  const handleApprove = () => {
    setApproved(true);
    setSylloMsg("Decision recorded. This course is now moving toward future readiness.");
    setTimeout(() => setShowModal(false), 1800);
  };

  return (
    <DashboardLayout activeItem="Evidence Brief" role="committee">
      <div className="cb-page">
        <button className="cb-back" onClick={() => navigate('/committee')}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="cb-header">
          <div>
            <h1>Curriculum Change Brief: Software Engineering</h1>
            <p className="cb-subtitle">SWE301 · Faculty of Computer Science & IT (FCSIT) · ASA University</p>
          </div>
        </div>

        {/* Score + Summary */}
        <div className="cb-top-row">
          <motion.div className="cb-score-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <ReadinessScore score={64} size={130} label="Current Readiness" delay={0.5} />
            <div className="cb-status-tag">
              <AlertTriangle size={14} /> Needs Update Before Semester 1, 2027/2028
            </div>
          </motion.div>
          <motion.div className="cb-summary-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3>1. Course Summary</h3>
            <div className="cb-info-grid">
              <div><span>Course:</span> Software Engineering</div>
              <div><span>Department:</span> FCSIT</div>
              <div><span>Target:</span> Semester 1, 2027/2028</div>
              <div><span>Submitted By:</span> Dr. Amina Rahman (Lecturer)</div>
              <div><span>Review Type:</span> Major Course Update</div>
              <div><span>Status:</span> <em className="cb-pending">Pending Committee Decision</em></div>
            </div>
          </motion.div>
        </div>

        {/* Chart */}
        <motion.div className="cb-chart-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h3>2. Evidence from Job-Market Data</h3>
          <p className="cb-chart-desc">Current Curriculum Coverage vs Job-Market Demand</p>
          <div className="cb-chart">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} barGap={4} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: '#A8A8A0', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} />
                <YAxis tick={{ fill: '#A8A8A0', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} domain={[0, 100]} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="demand" name="Market Demand" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, i) => <Cell key={i} fill="#F5C518" fillOpacity={0.9} />)}
                </Bar>
                <Bar dataKey="coverage" name="Current Coverage" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, i) => <Cell key={i} fill="#4A4A4A" fillOpacity={0.8} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="cb-chart-legend">
            <span><span className="cb-legend-dot yellow" /> Market Demand</span>
            <span><span className="cb-legend-dot gray" /> Current Coverage</span>
          </div>
        </motion.div>

        {/* Gaps */}
        <motion.div className="cb-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <h3>3. Curriculum Gap Summary</h3>
          <div className="cb-gaps">
            {gaps.map((g, i) => (
              <div key={i} className="cb-gap-card">
                <AlertTriangle size={14} /> <span>{g}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div className="cb-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <h3>4. Proposed Curriculum Changes</h3>
          <div className="cb-rec-cards">
            {recommendations.map((r, i) => (
              <div key={i} className="cb-rec-card">
                <h4>{r.title}</h4>
                <div className="cb-rec-meta">
                  <span className={`cb-priority ${r.priority === 'High' ? 'high' : 'medium'}`}>{r.priority}</span>
                  <span>Effort: {r.effort}</span>
                  <span>Impact: {r.impact}</span>
                  <span>{r.week}</span>
                </div>
                <p className="cb-rec-evidence">📋 Evidence: {r.evidence}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Before / After */}
        <motion.div className="cb-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <h3>5. Expected Improvement</h3>
          <div className="cb-improvement">
            <div className="cb-improve-item">
              <span className="cb-improve-label">Current Score</span>
              <span className="cb-improve-val before">64/100</span>
            </div>
            <ArrowRight size={24} className="cb-improve-arrow" />
            <div className="cb-improve-item">
              <span className="cb-improve-label">Projected Score</span>
              <span className="cb-improve-val after">{afterScore}/100</span>
            </div>
            <div className="cb-improve-item">
              <span className="cb-improve-label">Readiness</span>
              <span className="cb-improve-val">Medium → <strong>High</strong></span>
            </div>
            <div className="cb-improve-item">
              <span className="cb-improve-label">Employer Alignment</span>
              <span className="cb-improve-val">58% → <strong>84%</strong></span>
            </div>
          </div>
        </motion.div>

        {/* Decision Panel */}
        <motion.div className="cb-decision" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <h3>6. Committee Decision</h3>
          <div className="cb-notes">
            <label>Committee Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add observations or conditions for approval..."
              rows={3}
            />
          </div>
          <div className="cb-decision-btns">
            <button className="cb-btn primary" onClick={() => setShowModal(true)}>
              <CheckCircle2 size={16} /> Approve for Pilot
            </button>
            <button className="cb-btn secondary">Request Faculty Revision</button>
            <button className="cb-btn danger">Reject Proposal</button>
            <button className="cb-btn secondary" onClick={() => navigate('/dean')}>
              <Send size={14} /> Send to Dean
            </button>
            <button className="cb-btn outline">
              <Download size={14} /> Download Brief
            </button>
          </div>
        </motion.div>
      </div>

      {/* Approval Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="cb-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !approved && setShowModal(false)}>
            <motion.div className="cb-modal" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
              {!approved ? (
                <>
                  <button className="cb-modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
                  <h2>Approve Curriculum Update Pilot?</h2>
                  <p>This will approve the proposed Software Engineering update for pilot implementation next semester (Semester 1, 2027/2028).</p>
                  <div className="cb-modal-btns">
                    <button className="cb-btn secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="cb-btn primary" onClick={handleApprove}><CheckCircle2 size={16} /> Confirm Approval</button>
                  </div>
                </>
              ) : (
                <motion.div className="cb-modal-success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="cb-success-icon">✓</div>
                  <h3>Curriculum update approved for pilot.</h3>
                  <p>Status updated · Notification sent to lecturer</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Syllo message={sylloMsg} pose={approved ? 'celebrate' : 'point'} delay={2} />
    </DashboardLayout>
  );
}

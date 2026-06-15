import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Target, AlertTriangle, TrendingUp, Sparkles, BookOpen, Users } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Syllo from '../../components/Syllo';
import './DeanDashboard.css';

function AnimCounter({ target, dur = 1800 }) {
  const [c, setC] = useState(0);
  useEffect(() => {
    let s; const a = (t) => { if (!s) s = t; const p = Math.min((t - s) / dur, 1); setC(typeof target === 'number' ? Math.floor(p * target) : target); if (p < 1) requestAnimationFrame(a); };
    const tm = setTimeout(() => requestAnimationFrame(a), 400); return () => clearTimeout(tm);
  }, [target, dur]);
  return <span>{c}</span>;
}

const summaryCards = [
  { label: 'Faculty Readiness', value: 72, suffix: '/100', icon: Target, color: 'yellow' },
  { label: 'Programmes at Risk', value: 2, icon: AlertTriangle, color: 'red' },
  { label: 'Courses Needing Update', value: 14, icon: BookOpen, color: 'orange' },
  { label: 'Critical Skill Gaps', value: 9, icon: TrendingUp, color: 'red' },
  { label: 'Employability Alignment', value: 76, suffix: '%', icon: Users, color: 'green' },
];

const heatmapData = [
  { prog: 'Software Engineering', market: 65, skills: 58, evidence: 55, tools: 60, employer: 50 },
  { prog: 'Cybersecurity', market: 55, skills: 50, evidence: 45, tools: 52, employer: 40 },
  { prog: 'Data Science', market: 78, skills: 72, evidence: 68, tools: 75, employer: 70 },
  { prog: 'Information Systems', market: 70, skills: 65, evidence: 60, tools: 62, employer: 58 },
  { prog: 'Game Development', market: 60, skills: 55, evidence: 50, tools: 58, employer: 48 },
];

const columns = ['Market Alignment', 'Future Skills', 'Assessment Evidence', 'Industry Tools', 'Employer Feedback'];
const colKeys = ['market', 'skills', 'evidence', 'tools', 'employer'];

const missingSkills = [
  { name: 'Cloud Deployment', gap: 88 },
  { name: 'Cybersecurity Monitoring', gap: 82 },
  { name: 'AI-Assisted Dev', gap: 80 },
  { name: 'Data Visualisation', gap: 75 },
  { name: 'API Testing', gap: 73 },
  { name: 'DevOps', gap: 85 },
  { name: 'Product Analytics', gap: 68 },
  { name: 'MLOps', gap: 65 },
];

const insights = [
  'Software Engineering and Cybersecurity need urgent updates before Semester 1, 2027/2028.',
  'Cloud and DevOps skills are missing across 4 programmes.',
  'Assessment evidence is weak in 11 courses.',
  'Faculty training should prioritise cloud deployment, CI/CD, and AI-assisted development.',
];

export default function DeanDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('heatmap'); // 'heatmap', 'gaps', 'reports'

  const getHeatColor = (val) => {
    if (val >= 70) return '#4A7C59';
    if (val >= 55) return '#F5C518';
    return '#E8453C';
  };

  const getHeatBg = (val) => {
    if (val >= 70) return 'rgba(74, 124, 89, 0.25)';
    if (val >= 55) return 'rgba(245, 197, 24, 0.2)';
    return 'rgba(232, 69, 60, 0.2)';
  };

  return (
    <DashboardLayout activeItem="Faculty Overview" role="dean">
      <div className="dd-page">
        <div className="dd-header">
          <div>
            <h1 className="dd-title">Faculty Curriculum Intelligence Dashboard</h1>
            <p className="dd-subtitle">Faculty of Computer Science & IT (FCSIT) · Sesi Akademik 2026/2027</p>
          </div>
        </div>

        {/* In-Page Navigation Tabs */}
        <div className="dd-tabs-container">
          <button className={`dd-tab-btn ${activeTab === 'heatmap' ? 'active' : ''}`} onClick={() => setActiveTab('heatmap')}>
            <Target size={16} /> Faculty Readiness Heatmap
          </button>
          <button className={`dd-tab-btn ${activeTab === 'gaps' ? 'active' : ''}`} onClick={() => setActiveTab('gaps')}>
            <TrendingUp size={16} /> Faculty Gaps Analysis
          </button>
          <button className={`dd-tab-btn ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            <BookOpen size={16} /> Executive Reports
          </button>
        </div>

        {/* Cards */}
        <div className="dd-cards">
          {summaryCards.map((card, i) => (
            <motion.div
              key={i}
              className={`dd-card dd-card-${card.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="dd-card-icon"><card.icon size={20} /></div>
              <div className="dd-card-info">
                <span className="dd-card-label">{card.label}</span>
                <span className="dd-card-value"><AnimCounter target={card.value} />{card.suffix || ''}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="dd-main-grid">
          <div className="dd-left">
            {/* Tab 1: Heatmap */}
            {activeTab === 'heatmap' && (
              <motion.div className="dd-heatmap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2>Faculty Readiness Heatmap</h2>
                <div className="dd-heatmap-scroll">
                  <table className="dd-heatmap-table">
                    <thead>
                      <tr>
                        <th>Programme</th>
                        {columns.map((c, i) => <th key={i}>{c}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {heatmapData.map((row, ri) => (
                        <tr
                          key={ri}
                          className="dd-heatmap-row"
                          onClick={() => navigate('/dean/program/swe')}
                          style={{ cursor: 'pointer' }}
                        >
                          <td className="dd-prog-name">{row.prog}</td>
                          {colKeys.map((key, ci) => (
                            <td key={ci}>
                              <motion.div
                                className="dd-heat-cell"
                                style={{ background: getHeatBg(row[key]), color: getHeatColor(row[key]) }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: ri * 0.05 + ci * 0.03 }}
                              >
                                {row[key]}%
                              </motion.div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="dd-heatmap-legend">
                  <span><span className="dd-legend-box" style={{ background: '#4A7C59' }} /> Strong (70+)</span>
                  <span><span className="dd-legend-box" style={{ background: '#F5C518' }} /> Needs Attention (55-69)</span>
                  <span><span className="dd-legend-box" style={{ background: '#E8453C' }} /> Critical (&lt;55)</span>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Missing Skills */}
            {activeTab === 'gaps' && (
              <motion.div className="dd-chart-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2>Top Missing Future Skills Across Faculty</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={missingSkills} layout="vertical" barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" tick={{ fill: '#A8A8A0', fontSize: 11 }} domain={[0, 100]} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} />
                    <YAxis dataKey="name" type="category" tick={{ fill: '#A8A8A0', fontSize: 11 }} axisLine={false} tickLine={false} width={140} />
                    <Tooltip contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, fontSize: '0.82rem' }} />
                    <Bar dataKey="gap" name="Gap Severity %" radius={[0, 4, 4, 0]}>
                      {missingSkills.map((_, i) => <Cell key={i} fill={i < 3 ? '#E8453C' : '#F5C518'} fillOpacity={0.85} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* Tab 3: Executive Reports */}
            {activeTab === 'reports' && (
              <motion.div className="dd-chart-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2>Quality Assurance & Board Reports</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                  Generate and download formal alignment reports for institutional review boards, university boards of studies, and the Ministry of Higher Education (MOHE).
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="dd-card dd-card-green" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                    <div>
                      <h4 style={{ color: 'var(--chalk-green)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>MQA Curriculum Compliance Review</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>MQA compliance report for FCSIT computing programmes, Semester 1, 2026/2027.</p>
                    </div>
                    <button className="dd-roadmap-btn" style={{ width: 'auto', padding: '6px 16px', fontSize: '0.75rem', background: 'transparent', border: '1px solid var(--chalk-green)', color: 'var(--chalk-green)', cursor: 'pointer' }}>Download PDF</button>
                  </div>
                  <div className="dd-card dd-card-yellow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                    <div>
                      <h4 style={{ color: 'var(--yellow)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>Board of Studies Advisory Minutes</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Minutes from external examiner and industry advisory panel meetings.</p>
                    </div>
                    <button className="dd-roadmap-btn" style={{ width: 'auto', padding: '6px 16px', fontSize: '0.75rem', background: 'transparent', border: '1px solid var(--yellow)', color: 'var(--yellow)', cursor: 'pointer' }}>Download DOCX</button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Strategic Insights */}
          <motion.div className="dd-insights-panel" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
            <div className="dd-insights-header">
              <Sparkles size={16} />
              <h3>Strategic AI Insights</h3>
            </div>
            <div className="dd-insights-list">
              {insights.map((insight, i) => (
                <motion.div
                  key={i}
                  className="dd-insight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.2 }}
                >
                  <div className="dd-insight-dot" />
                  <p>{insight}</p>
                </motion.div>
              ))}
            </div>
            <button className="dd-roadmap-btn" onClick={() => navigate('/dean/roadmap')}>
              View Action Roadmap
            </button>
          </motion.div>
        </div>
      </div>

      <Syllo
        message="2 programmes need immediate attention. Click any row for programme details."
        pose="point"
        delay={2}
      />
    </DashboardLayout>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, AlertTriangle, FileCheck, Lightbulb, Clock, TrendingUp, Plus, Sparkles, UploadCloud, Check, Loader2 } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import ReadinessScore from '../../components/ReadinessScore';
import Syllo from '../../components/Syllo';
import './LecturerDashboard.css';

function AnimCounter({ target, dur = 1800 }) {
  const [c, setC] = useState(0);
  useEffect(() => {
    let s; const a = (t) => { if (!s) s = t; const p = Math.min((t - s) / dur, 1); setC(typeof target === 'number' ? Math.floor(p * target) : target); if (p < 1) requestAnimationFrame(a); };
    const tm = setTimeout(() => requestAnimationFrame(a), 400); return () => clearTimeout(tm);
  }, [target, dur]);
  return <span>{c}</span>;
}

const summaryCards = [
  { label: 'Course Readiness', value: 64, suffix: '/100', icon: Target, color: 'yellow' },
  { label: 'Missing Future Skills', value: 5, icon: AlertTriangle, color: 'red' },
  { label: 'Evidence Strength', value: 'Medium', icon: FileCheck, color: 'orange', isText: true },
  { label: 'Teaching Updates', value: 8, icon: Lightbulb, color: 'yellow' },
  { label: 'Est. Update Effort', value: '12 hrs', icon: Clock, color: 'green', isText: true },
];

const skillGaps = [
  { id: 'cicd', name: 'CI/CD', demand: 92, coverage: 10, action: 'Add GitHub Actions mini lab in Week 8' },
  { id: 'docker', name: 'Docker', demand: 87, coverage: 5, action: 'Add Docker basics lab in Week 7' },
  { id: 'cloud', name: 'Cloud Deployment', demand: 90, coverage: 12, action: 'Add cloud deployment task in Week 9' },
  { id: 'api', name: 'API Testing', demand: 85, coverage: 35, action: 'Strengthen API testing assignment in Week 5' },
  { id: 'ai', name: 'AI-Assisted Dev', demand: 95, coverage: 15, action: 'Add responsible AI coding discussion in Week 10' },
];

const quickActions = [
  'Add GitHub workflow activity',
  'Add API testing lab',
  'Add Docker deployment mini-task',
  'Convert final exam into project sprint',
];

export default function LecturerDashboard() {
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(() => {
    return sessionStorage.getItem('syllabus_uploaded') === 'true';
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [activeTab, setActiveTab] = useState('health'); // 'health', 'gaps', 'assessments'

  const runAnalysis = (name) => {
    setFileName(name || 'Software_Engineering_Syllabus.pdf');
    setAnalyzing(true);
    setAnalysisStep(0);

    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          setTimeout(() => {
            setAnalyzing(false);
            setUploaded(true);
            sessionStorage.setItem('syllabus_uploaded', 'true');
          }, 800);
          return 4;
        }
        return prev + 1;
      });
    }, 800);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      runAnalysis(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      runAnalysis(e.target.files[0].name);
    }
  };

  const triggerReset = () => {
    setUploaded(false);
    setAnalyzing(false);
    setAnalysisStep(0);
    setFileName('');
    sessionStorage.removeItem('syllabus_uploaded');
  };

  const steps = [
    'Reading syllabus document...',
    'Extracting course topics, learning outcomes, and weekly structure...',
    'Comparing course content with live job-market trends in Malaysia (MQA standards)...',
    'Generating Future Readiness Score & identifying skill gaps...'
  ];

  if (analyzing) {
    return (
      <DashboardLayout activeItem="Course Dashboard" role="lecturer">
        <div className="ld-page">
          <div className="ld-analysis-card">
            <h2 className="ld-analysis-title">
              <Loader2 className="animate-spin spin-icon" size={22} style={{ color: 'var(--yellow)', marginRight: '10px' }} />
              <span>Analyzing {fileName}...</span>
            </h2>
            <div className="ld-analysis-steps">
              {steps.map((step, index) => {
                let status = 'pending';
                let icon = null;
                if (analysisStep > index) {
                  status = 'done';
                  icon = <Check size={12} />;
                } else if (analysisStep === index) {
                  status = 'loading';
                  icon = <Loader2 className="animate-spin spin-icon" size={12} />;
                }

                return (
                  <div key={index} className={`ld-analysis-step ${status}`}>
                    <div className={`ld-step-status ${status}`}>{icon}</div>
                    <div className={`ld-step-text ${status}`}>{step}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Syllo
          message="I am reading your syllabus now to compare it against the latest tech trends in Kuala Lumpur and across Malaysia."
          pose="think"
          delay={0.5}
        />
      </DashboardLayout>
    );
  }

  if (!uploaded) {
    return (
      <DashboardLayout activeItem="Course Dashboard" role="lecturer">
        <div className="ld-page">
          <div className="ld-upload-container">
            <div className="ld-upload-icon">
              <UploadCloud size={32} />
            </div>
            <h2 className="ld-upload-title">Analyze Course Syllabus</h2>
            <p className="ld-upload-subtitle">
              Upload your syllabus or module outline (PDF, DOCX) to check its alignment with the latest Malaysian job market skill needs.
            </p>

            <div
              className={`ld-dropzone ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('syllabus-file-input').click()}
            >
              <input
                type="file"
                id="syllabus-file-input"
                style={{ display: 'none' }}
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
              />
              <UploadCloud size={24} style={{ color: 'var(--text-muted)' }} />
              <p className="ld-dropzone-text">Drag and drop file here, or click to browse</p>
              <p className="ld-dropzone-subtext">Supports PDF, DOCX up to 10MB</p>
            </div>

            <div style={{ marginTop: '28px' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Or try the demo file:</p>
              <button
                className="ld-plan-btn"
                style={{ width: 'auto', padding: '10px 24px', margin: '0 auto', display: 'block' }}
                onClick={() => runAnalysis('Software_Engineering_Syllabus.pdf')}
              >
                Load Sample Software Engineering Syllabus
              </button>
            </div>
          </div>
        </div>

        <Syllo
          message="Hello! Upload your current course plan or syllabus, and I'll highlight the critical skills missing for your graduates."
          pose="wave"
          delay={0.5}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeItem="Course Dashboard" role="lecturer">
      <div className="ld-page">
        <div className="ld-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h1 className="ld-title">Lecturer Course Improvement Dashboard</h1>
            <p className="ld-subtitle">Dr. Amina Rahman · Faculty of Computer Science & IT · Software Engineering</p>
          </div>
          <button className="ld-add-btn" onClick={triggerReset} style={{ borderStyle: 'dashed', cursor: 'pointer' }}>
            🔄 Re-upload Syllabus
          </button>
        </div>

        {/* In-Page Navigation Tabs */}
        <div className="ld-tabs-container">
          <button className={`ld-tab-btn ${activeTab === 'health' ? 'active' : ''}`} onClick={() => setActiveTab('health')}>
            <Target size={16} /> Course Health
          </button>
          <button className={`ld-tab-btn ${activeTab === 'gaps' ? 'active' : ''}`} onClick={() => setActiveTab('gaps')}>
            <TrendingUp size={16} /> Future Skill Gaps
          </button>
          <button className={`ld-tab-btn ${activeTab === 'assessments' ? 'active' : ''}`} onClick={() => setActiveTab('assessments')}>
            <FileCheck size={16} /> Assessment Updates
          </button>
        </div>

        {/* Summary Cards */}
        <div className="ld-cards">
          {summaryCards.map((card, i) => (
            <motion.div
              key={i}
              className={`ld-card ld-card-${card.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className="ld-card-icon"><card.icon size={20} /></div>
              <div className="ld-card-info">
                <span className="ld-card-label">{card.label}</span>
                <span className="ld-card-value">
                  {card.isText ? card.value : <><AnimCounter target={card.value} />{card.suffix || ''}</>}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="ld-main-grid">
          <div className="ld-left">
            {/* Tab 1: Course Health */}
            {activeTab === 'health' && (
              <motion.div className="ld-health" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2>My Course Health Overview</h2>
                <div className="ld-health-content">
                  <ReadinessScore score={64} size={160} label="Software Engineering" delay={0.2} />
                  <div className="ld-health-text">
                    <p>Your course covers software engineering theory well, but lacks modern delivery evidence required by employers in the Malaysian tech industry.</p>
                    <div className="ld-health-tags">
                      <span className="ld-tag good">Theory: Strong</span>
                      <span className="ld-tag warn">Practical: Weak</span>
                      <span className="ld-tag warn">Evidence: Medium</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Skill Gaps */}
            {activeTab === 'gaps' && (
              <motion.div className="ld-skills" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2>Missing Future Skills</h2>
                <div className="ld-skill-list">
                  {skillGaps.map((skill, i) => (
                    <motion.div
                      key={skill.id}
                      className="ld-skill-card"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="ld-skill-header">
                        <h4>{skill.name}</h4>
                        <div className="ld-skill-metrics">
                          <span className="ld-metric demand">Demand: {skill.demand}%</span>
                          <span className="ld-metric coverage">Coverage: {skill.coverage}%</span>
                        </div>
                      </div>
                      <div className="ld-skill-bar-wrap">
                        <div className="ld-skill-bar-bg">
                          <motion.div
                            className="ld-skill-bar demand"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.demand}%` }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                        <div className="ld-skill-bar-bg">
                          <motion.div
                            className="ld-skill-bar coverage"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.coverage}%` }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                      </div>
                      <p className="ld-skill-action">{skill.action}</p>
                      <button
                        className="ld-add-btn"
                        onClick={() => navigate(`/lecturer/skill/${skill.id}`)}
                      >
                        <Plus size={14} /> Add to Course Plan
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 3: Assessments */}
            {activeTab === 'assessments' && (
              <motion.div className="ld-skills" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2>Course Assessment Redesign</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                  The AI has mapped your course assessments against MQA Programme Standards and recommended shifting from theoretical examinations to portfolio-based evidence.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="ld-skill-card" style={{ borderLeft: '3px solid var(--red-soft)' }}>
                    <h4 style={{ marginBottom: '6px' }}>Current Assessment Pattern</h4>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                      <li>Final Written Exam (30%) - Theory and descriptive questions</li>
                      <li>Mid-Term Written Test (30%) - Closed-book theoretical test</li>
                      <li>Lab Projects (40%) - Isolated programming assignments</li>
                    </ul>
                  </div>
                  <div className="ld-skill-card" style={{ borderLeft: '3px solid var(--yellow)', background: 'rgba(245, 197, 24, 0.02)' }}>
                    <h4 style={{ color: 'var(--yellow)', marginBottom: '6px' }}>AI Recommended Active-Learning Assessments</h4>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      <li>Final Product Sprint Viva (35%) - Deploy working app + group viva (evidence of team workflow)</li>
                      <li>Docker & CI/CD Lab Deliverables (35%) - GitHub Actions pipeline logs & Dockerfiles (Week 7-9)</li>
                      <li>Agile Project Backlog & PRs (30%) - Continuous assessment of pull requests & code review contributions</li>
                    </ul>
                  </div>
                  <button className="ld-plan-btn" style={{ width: 'fit-content', padding: '10px 20px', marginTop: '10px' }} onClick={() => navigate('/lecturer/plan')}>
                    Apply & View in 14-Week Plan
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Panel */}
          <motion.div className="ld-right" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <div className="ld-suggestions">
              <div className="ld-sug-header">
                <Sparkles size={16} />
                <h3>Syllo's Teaching Suggestions</h3>
              </div>
              <p className="ld-sug-quote">"Start small. Add one practical lab and one portfolio-based assessment first."</p>
              <div className="ld-quick-actions">
                <h4>Quick Actions</h4>
                {quickActions.map((action, i) => (
                  <button key={i} className="ld-quick-btn">
                    <TrendingUp size={14} /> {action}
                  </button>
                ))}
              </div>
              <button className="ld-plan-btn" onClick={() => navigate('/lecturer/plan')}>
                View 14-Week Teaching Plan
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <Syllo
        message="Your course has strong theory. Let's add practical evidence to make graduates more employable."
        pose="point"
        delay={2}
      />
    </DashboardLayout>
  );
}

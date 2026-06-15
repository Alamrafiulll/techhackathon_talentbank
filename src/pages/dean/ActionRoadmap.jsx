import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, Users, Download, Send, X } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Syllo from '../../components/Syllo';
import './ActionRoadmap.css';

const phases = [
  {
    phase: 1, title: 'Immediate Review', duration: '1 month', color: '#E8453C',
    actions: [
      'Review all critical courses (SWE301, SWE410, CYB210)',
      'Approve pilot curriculum updates from lecturers',
      'Identify faculty training needs for cloud and DevOps',
    ],
  },
  {
    phase: 2, title: 'Course Redesign', duration: '3 months', color: '#F5C518',
    actions: [
      'Update high-risk courses with future-skill labs',
      'Redesign assessments with practical evidence requirements',
      'Add Docker, CI/CD, and cloud deployment modules',
    ],
  },
  {
    phase: 3, title: 'Industry Validation', duration: '2 months', color: '#4A90D9',
    actions: [
      'Invite employer reviewers from Malaysian tech companies (Grab, AirAsia MOVE, Petronas Digital)',
      'Validate final projects against industry hiring criteria',
      'Compare course outcomes with TalentCorp and MDEC hiring data',
    ],
  },
  {
    phase: 4, title: 'Faculty Readiness Review', duration: 'End of semester', color: '#4A7C59',
    actions: [
      'Measure improved readiness scores across all programmes',
      'Track student project evidence and portfolio quality',
      'Prepare MQA accreditation-ready report',
    ],
  },
];

export default function ActionRoadmap() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [approved, setApproved] = useState(false);
  const [sylloMsg, setSylloMsg] = useState("This roadmap turns curriculum risk into structured action. Ready for approval.");

  const handleApprove = () => {
    setApproved(true);
    setSylloMsg("Your faculty now has a clear path from curriculum risk to future readiness.");
    setTimeout(() => setShowModal(false), 2000);
  };

  return (
    <DashboardLayout activeItem="Action Roadmap" role="dean">
      <div className="ar-page">
        <button className="ar-back" onClick={() => navigate('/dean')}>
          <ArrowLeft size={16} /> Back to Faculty Overview
        </button>

        <motion.h1 className="ar-title" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          Faculty-Wide Curriculum Action Roadmap
        </motion.h1>
        <p className="ar-subtitle">FCSIT · ASA University · Sesi Akademik 2026/2027</p>

        {/* Phases */}
        <div className="ar-phases">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              className="ar-phase"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              style={{ '--phase-color': phase.color }}
            >
              <div className="ar-phase-marker">
                <div className="ar-phase-number">{phase.phase}</div>
                {i < phases.length - 1 && <div className="ar-phase-connector" />}
              </div>

              <div className="ar-phase-card">
                <div className="ar-phase-header">
                  <div>
                    <h3>{phase.title}</h3>
                    <div className="ar-phase-meta">
                      <span className="ar-phase-duration"><Clock size={12} /> {phase.duration}</span>
                    </div>
                  </div>
                </div>

                <ul className="ar-phase-actions">
                  {phase.actions.map((action, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 + j * 0.08 }}
                    >
                      <CheckCircle2 size={14} />
                      <span>{action}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decision Panel */}
        <motion.div
          className="ar-decision"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2>Executive Decision</h2>
          <div className="ar-decision-btns">
            <button className="ar-btn primary" onClick={() => setShowModal(true)}>
              <CheckCircle2 size={16} /> Approve Roadmap
            </button>
            <button className="ar-btn secondary">
              <Users size={14} /> Assign to Department Heads
            </button>
            <button className="ar-btn outline">
              <Download size={14} /> Export Faculty Strategy Report
            </button>
          </div>
        </motion.div>
      </div>

      {/* Approval Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="ar-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !approved && setShowModal(false)}>
            <motion.div className="ar-modal" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
              {!approved ? (
                <>
                  <button className="ar-modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
                  <h2>Approve Faculty Action Roadmap?</h2>
                  <p>This will activate the 4-phase curriculum improvement plan for FCSIT, ASA University.</p>
                  <div className="ar-modal-btns">
                    <button className="ar-btn secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="ar-btn primary" onClick={handleApprove}><CheckCircle2 size={16} /> Confirm Approval</button>
                  </div>
                </>
              ) : (
                <motion.div className="ar-modal-success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="ar-success-icon">✓</div>
                  <h3>Faculty roadmap approved.</h3>
                  <p>Department heads will be notified · Implementation begins next month</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Syllo message={sylloMsg} pose={approved ? 'celebrate' : 'wave'} delay={1.5} />
    </DashboardLayout>
  );
}

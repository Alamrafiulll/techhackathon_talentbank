import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Edit3, CheckCircle2, Send, ArrowLeft, X } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Syllo from '../../components/Syllo';
import './TeachingPlan.css';

const weeks = [
  { week: 1, topic: 'Modern Software Engineering Workflow', outcome: 'Understand modern dev tools and workflows', activity: 'Tools overview + environment setup', evidence: 'GitHub profile + env screenshot', prep: '1 hr' },
  { week: 2, topic: 'GitHub Team Collaboration', outcome: 'Use branching, PRs, and code review', activity: 'Team repo setup + first PR', evidence: 'PR review log', prep: '1 hr' },
  { week: 3, topic: 'Requirements Sprint', outcome: 'Write user stories and acceptance criteria', activity: 'Real-world requirements brief', evidence: 'User story board + test plan', prep: '1.5 hrs' },
  { week: 4, topic: 'Agile Planning and User Stories', outcome: 'Plan sprints using agile methodology', activity: 'Sprint planning exercise', evidence: 'Sprint backlog + velocity chart', prep: '1 hr' },
  { week: 5, topic: 'API Testing Lab', outcome: 'Test APIs with modern tools', activity: 'Postman/Insomnia API testing lab', evidence: 'Test report + API collection', prep: '1.5 hrs' },
  { week: 6, topic: 'Mid-Project Review', outcome: 'Present progress and receive feedback', activity: 'Peer code review + feedback', evidence: 'Review feedback form', prep: '0.5 hr' },
  { week: 7, topic: 'Docker Basics', outcome: 'Containerise applications', activity: 'Docker workshop + Dockerfile lab', evidence: 'Working container + Dockerfile', prep: '2 hrs' },
  { week: 8, topic: 'CI/CD Mini Pipeline', outcome: 'Build automated test and deploy pipeline', activity: 'GitHub Actions workflow setup', evidence: 'Actions screenshot + deploy log', prep: '2 hrs' },
  { week: 9, topic: 'Cloud Deployment Task', outcome: 'Deploy app to cloud platform', activity: 'Cloud deployment exercise', evidence: 'Live URL + dashboard screenshot', prep: '1.5 hrs' },
  { week: 10, topic: 'Responsible AI-Assisted Development', outcome: 'Understand AI coding ethics and policy', activity: 'AI ethics discussion + policy writing', evidence: 'AI ethics reflection essay', prep: '0.5 hr' },
  { week: 11, topic: 'Employer Feedback Session', outcome: 'Present to industry reviewer', activity: 'Industry talk / company visit', evidence: 'Industry feedback form', prep: '1 hr' },
  { week: 12, topic: 'Product Sprint & Delivery', outcome: 'Deliver working software product', activity: 'Product sprint + team demo', evidence: 'Working product + retrospective', prep: '0.5 hr' },
  { week: 13, topic: 'Industry Engagement & Career Readiness', outcome: 'Prepare career portfolio and reflection', activity: 'Career readiness workshop (MDEC/PIKOM)', evidence: 'Career reflection essay', prep: '0.5 hr' },
  { week: 14, topic: 'Final Portfolio & Viva Presentation', outcome: 'Present complete portfolio with all evidence', activity: 'Portfolio submission + viva voce', evidence: 'Portfolio website + viva rubric', prep: '1 hr' },
];

const checklist = [
  { id: 'gap', label: 'Course gap analysis completed', done: true },
  { id: 'skills', label: 'Future skills added to plan', done: true },
  { id: 'assess', label: 'Assessments redesigned with practical evidence', done: true },
  { id: 'score', label: 'Readiness score improved (64 → 87)', done: true },
  { id: 'notes', label: 'Faculty notes added', done: false },
];

export default function TeachingPlan() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sylloMsg, setSylloMsg] = useState("Your 14-week plan covers all the identified skill gaps. Ready to submit!");

  const handleSubmit = () => {
    setSubmitted(true);
    setSylloMsg("Great. Your course plan is now ready for committee review.");
    setTimeout(() => setShowModal(false), 2000);
  };

  return (
    <DashboardLayout activeItem="14-Week Teaching Plan" role="lecturer">
      <div className="tp-page">
        <button className="tp-back" onClick={() => navigate('/lecturer')}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="tp-header">
          <div>
            <h1>Future-State 14-Week Teaching Plan</h1>
            <p className="tp-subtitle">Software Engineering · Semester 1, 2027/2028 · FCSIT, ASA University</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="tp-timeline">
          <div className="tp-timeline-line" />
          {weeks.map((w, i) => (
            <motion.div
              key={i}
              className={`tp-week ${expanded === i ? 'expanded' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + i * 0.04 }}
            >
              <div className="tp-dot"><div className="tp-dot-inner" /></div>
              <div className="tp-card" onClick={() => setExpanded(expanded === i ? null : i)}>
                <div className="tp-card-header">
                  <div className="tp-card-info">
                    <span className="tp-week-num">Week {w.week}</span>
                    <h4>{w.topic}</h4>
                  </div>
                  <div className="tp-card-right">
                    <span className="tp-prep">⏱ {w.prep}</span>
                    <button className="tp-toggle">
                      {expanded === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      className="tp-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="tp-detail"><span>🎯 Outcome:</span> {w.outcome}</div>
                      <div className="tp-detail"><span>📝 Activity:</span> {w.activity}</div>
                      <div className="tp-detail"><span>📋 Evidence:</span> {w.evidence}</div>
                      <button className="tp-edit-btn"><Edit3 size={12} /> Edit Week</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submit Section */}
        <motion.div
          className="tp-submit-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2>Submit to Curriculum Committee</h2>
          <div className="tp-checklist">
            {checklist.map((item) => (
              <div key={item.id} className={`tp-check-item ${item.done ? 'done' : ''}`}>
                <CheckCircle2 size={16} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <button className="tp-submit-btn" onClick={() => setShowModal(true)}>
            <Send size={16} /> Submit Course Update Proposal
          </button>
        </motion.div>
      </div>

      {/* Submit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="tp-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !submitted && setShowModal(false)}>
            <motion.div className="tp-modal" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
              {!submitted ? (
                <>
                  <button className="tp-modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
                  <h2>Submit this updated course plan to the Curriculum Committee?</h2>
                  <p>The plan will be submitted to Jawatankuasa Kurikulum Fakulti for review and approval.</p>
                  <div className="tp-modal-btns">
                    <button className="tp-btn secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="tp-btn primary" onClick={handleSubmit}><Send size={16} /> Submit</button>
                  </div>
                </>
              ) : (
                <motion.div className="tp-modal-success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="tp-success-icon">✓</div>
                  <h3>Course update proposal submitted successfully.</h3>
                  <p>Jawatankuasa Kurikulum will be notified.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Syllo message={sylloMsg} pose={submitted ? 'celebrate' : 'wave'} delay={1.5} />
    </DashboardLayout>
  );
}

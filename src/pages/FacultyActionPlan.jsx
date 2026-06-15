import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Download, Send, FileText, ArrowRight } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Syllo from '../components/Syllo';
import './FacultyActionPlan.css';

const weeks = [
  {
    week: 1, title: 'Introduce modern software workflow',
    faculty: 'Present modern development tools overview',
    student: 'Set up GitHub account and development environment',
    evidence: 'GitHub profile + environment screenshot',
    resource: 'AI-generated intro slides on modern dev workflows',
  },
  {
    week: 2, title: 'GitHub collaboration setup',
    faculty: 'Create team repositories with branch protection',
    student: 'Complete first pull request and code review',
    evidence: 'PR review log',
    resource: 'GitHub Classroom template repository',
  },
  {
    week: 3, title: 'Requirements sprint',
    faculty: 'Assign a real-world requirements brief',
    student: 'Write user stories and acceptance criteria',
    evidence: 'User story board + acceptance test plan',
    resource: 'AI-curated industry requirements templates',
  },
  {
    week: 4, title: 'API design task',
    faculty: 'Introduce RESTful API design principles',
    student: 'Design and document a REST API specification',
    evidence: 'OpenAPI/Swagger specification document',
    resource: 'API design best practices guide',
  },
  {
    week: 5, title: 'Testing lab',
    faculty: 'Set up testing frameworks and CI triggers',
    student: 'Write unit and integration tests',
    evidence: 'Test coverage report (>70%)',
    resource: 'Jest/Pytest testing cheat sheet',
  },
  {
    week: 6, title: 'Mid-project review',
    faculty: 'Conduct peer code reviews and feedback',
    student: 'Present project progress and receive feedback',
    evidence: 'Review feedback form + revised plan',
    resource: 'Code review rubric generator',
  },
  {
    week: 7, title: 'Docker basics',
    faculty: 'Docker workshop and container concepts',
    student: 'Containerize application with Dockerfile',
    evidence: 'Working Docker container + Dockerfile',
    resource: 'Docker starter templates for common stacks',
  },
  {
    week: 8, title: 'CI/CD mini pipeline',
    faculty: 'GitHub Actions workflow demonstration',
    student: 'Build CI/CD pipeline with automated tests',
    evidence: 'GitHub Actions screenshot + deployment log',
    resource: 'CI/CD pipeline template library',
  },
  {
    week: 9, title: 'Cloud deployment',
    faculty: 'Cloud platform overview and deployment demo',
    student: 'Deploy application to cloud platform',
    evidence: 'Live deployment URL + cloud dashboard screenshot',
    resource: 'Cloud deployment quickstart guides',
  },
  {
    week: 10, title: 'AI-assisted coding ethics',
    faculty: 'Lead ethics discussion on AI in development',
    student: 'Write AI coding policy for the project',
    evidence: 'AI ethics reflection essay',
    resource: 'AI ethics case studies in software engineering',
  },
  {
    week: 11, title: 'Employer feedback',
    faculty: 'Invite industry reviewer for feedback',
    student: 'Present project to industry reviewer',
    evidence: 'Industry feedback form + action items',
    resource: 'Industry partnership brief template',
  },
  {
    week: 12, title: 'Final portfolio presentation',
    faculty: 'Evaluate portfolio and team presentations',
    student: 'Submit complete portfolio with all evidence',
    evidence: 'Portfolio website + all deployment artifacts',
    resource: 'Portfolio presentation rubric',
  },
];

export default function FacultyActionPlan() {
  const navigate = useNavigate();
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  const handleSendToCommittee = () => {
    setShowModal(true);
  };

  const handleGenerateBrief = () => {
    setModalSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setModalSuccess(false);
      navigate('/brief-preview');
    }, 1500);
  };

  return (
    <DashboardLayout activeItem="Faculty Action Plan">
      <div className="fap-page">
        <div className="fap-header">
          <div>
            <h1>Faculty Action Plan</h1>
            <p>A practical 12-week update plan for the Software Engineering course.</p>
          </div>
          <div className="fap-export-btns">
            <button className="fap-export-btn">
              <Download size={14} />
              Export as PDF
            </button>
            <button className="fap-export-btn primary" onClick={handleSendToCommittee}>
              <Send size={14} />
              Send to Curriculum Committee
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="fap-timeline">
          <div className="fap-timeline-line" />
          {weeks.map((w, i) => (
            <motion.div
              key={i}
              className={`fap-week ${expandedWeek === i ? 'expanded' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <div className="fap-week-dot">
                <div className="fap-dot-inner" />
              </div>
              
              <div className="fap-week-card" onClick={() => setExpandedWeek(expandedWeek === i ? null : i)}>
                <div className="fap-week-header">
                  <div className="fap-week-info">
                    <span className="fap-week-num">Week {w.week}</span>
                    <h4>{w.title}</h4>
                  </div>
                  <button className="fap-week-toggle">
                    {expandedWeek === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedWeek === i && (
                    <motion.div
                      className="fap-week-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="fap-detail-row">
                        <span className="fap-detail-label">👨‍🏫 Faculty Task</span>
                        <p>{w.faculty}</p>
                      </div>
                      <div className="fap-detail-row">
                        <span className="fap-detail-label">👨‍🎓 Student Task</span>
                        <p>{w.student}</p>
                      </div>
                      <div className="fap-detail-row">
                        <span className="fap-detail-label">📋 Assessment Evidence</span>
                        <p>{w.evidence}</p>
                      </div>
                      <div className="fap-detail-row">
                        <span className="fap-detail-label">🤖 AI-Generated Resource</span>
                        <p>{w.resource}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Committee Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fap-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !modalSuccess && setShowModal(false)}
          >
            <motion.div
              className="fap-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {!modalSuccess ? (
                <>
                  <h2>Submit Recommendation to Curriculum Committee?</h2>
                  <p className="fap-modal-desc">
                    This will generate a formal curriculum update brief including:
                  </p>
                  <ul className="fap-modal-list">
                    <li>Current course gaps</li>
                    <li>Market evidence</li>
                    <li>Recommended changes</li>
                    <li>Assessment updates</li>
                    <li>Expected graduate-readiness improvement</li>
                  </ul>
                  <div className="fap-modal-actions">
                    <button className="fap-modal-cancel" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button className="fap-modal-generate" onClick={handleGenerateBrief}>
                      <FileText size={16} />
                      Generate Brief
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  className="fap-modal-success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="fap-success-stamp">
                    <motion.div
                      initial={{ scale: 2, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 8 }}
                    >
                      ✓
                    </motion.div>
                  </div>
                  <h3>Brief generated successfully.</h3>
                  <p>Ready for Review</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Syllo
        message="Small updates. Big employability impact."
        pose="wave"
        delay={1.5}
      />
    </DashboardLayout>
  );
}

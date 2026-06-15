import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp, Target, Users, Clock, Plus, FileText, Download, Bookmark, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Syllo from '../../components/Syllo';
import './SkillDetail.css';

const rubric = [
  { criteria: 'Technical execution', weight: 30 },
  { criteria: 'Testing & automation logs', weight: 25 },
  { criteria: 'Documentation & comments', weight: 20 },
  { criteria: 'Critical reflection essay', weight: 15 },
  { criteria: 'Team collab & PR review', weight: 10 },
];

const skillData = {
  cicd: {
    name: 'CI/CD',
    why: 'CI/CD is increasingly expected in software engineering roles because employers want graduates who can test, integrate, and deploy software using real development workflows. Malaysian tech companies like Grab, AirAsia MOVE, and Petronas Digital increasingly require CI/CD proficiency.',
    demand: 'High (92%)',
    coverage: 'Not Covered',
    effort: 'Medium',
    week: 'Week 8 — CI/CD Mini Pipeline',
    outcome: 'Students will be able to configure a simple automated workflow that runs tests and prepares a software project for deployment.',
    assessment: 'GitHub Actions Mini Lab',
    deliverables: ['GitHub repository link', 'Workflow screenshot', 'Test result log', 'Short reflection on automation'],
    activity: {
      title: 'CI/CD Mini Pipeline Lab (90 minutes)',
      steps: [
        'Introduction (15 min): Explain CI/CD concepts and why automation matters in modern software delivery.',
        'Demo (15 min): Walk through setting up a GitHub Actions workflow file (.yml) with test and build stages.',
        'Hands-on Lab (45 min): Students fork a starter repo, write a workflow that runs tests on push, and trigger their first automated build.',
        'Reflection & Discussion (15 min): Students write a short reflection on how CI/CD changes the development workflow.'
      ]
    }
  },
  docker: {
    name: 'Docker',
    why: 'Containerisation is a fundamental requirement in modern DevOps and cloud architectures. Employers seek graduates who can package applications with all dependencies to ensure consistency across local and cloud environments.',
    demand: 'High (87%)',
    coverage: 'Not Covered',
    effort: 'Medium',
    week: 'Week 7 — Docker Basics & Containerisation',
    outcome: 'Students will be able to build a Dockerfile, build a container image, and run it locally.',
    assessment: 'Containerisation Assignment',
    deliverables: ['Working container image link', 'Dockerfile upload', 'Application build log', 'Port mapping verification'],
    activity: {
      title: 'Dockerizing a Web App (90 minutes)',
      steps: [
        'Introduction (15 min): What is Docker and virtualisation? Explain container vs virtual machine.',
        'Demo (15 min): Walkthrough writing a Dockerfile for a Node.js/Python application.',
        'Hands-on Lab (45 min): Students package their web applications into containers and run them locally.',
        'Validation (15 min): Students test port forwarding and verify the app runs successfully in the container.'
      ]
    }
  },
  cloud: {
    name: 'Cloud Deployment',
    why: 'Modern software is delivered via the cloud. Graduates need practical experience deploying applications to cloud infrastructure (AWS, Azure, Vercel, or Heroku) to understand live delivery cycles.',
    demand: 'High (90%)',
    coverage: 'Weak Coverage',
    effort: 'Medium',
    week: 'Week 9 — Cloud Deployment Task',
    outcome: 'Students will be able to deploy a containerised application to a public cloud provider.',
    assessment: 'Cloud Deployment Lab',
    deliverables: ['Live URL of deployed app', 'Cloud platform dashboard screenshot', 'Deploy log export', 'SSL configuration verification'],
    activity: {
      title: 'Live Cloud Launch (90 minutes)',
      steps: [
        'Introduction (15 min): Cloud computing models (PaaS, IaaS) and static vs dynamic deployment.',
        'Demo (15 min): Deploying a simple app using cloud provider dashboards or CLI.',
        'Hands-on Lab (45 min): Students link their GitHub repos to a cloud service and set up automatic deployments.',
        'Verification (15 min): Testing the live URL and checking environment variables.'
      ]
    }
  },
  api: {
    name: 'API Testing',
    why: 'Backend services dominate modern application structures. Graduates must be proficient in testing API endpoints for reliability, data formats, and response codes to work effectively in engineering teams.',
    demand: 'High (85%)',
    coverage: 'Weak Coverage',
    effort: 'Low',
    week: 'Week 5 — API Testing Lab',
    outcome: 'Students will be able to write automated tests for REST API endpoints using Postman or similar tools.',
    assessment: 'API Integration Test Suite',
    deliverables: ['Postman API collection link', 'Test execution summary report', 'Valid JSON response verification', 'Error handling test scenarios'],
    activity: {
      title: 'Automating API Tests (90 minutes)',
      steps: [
        'Introduction (15 min): REST architecture, endpoints, HTTP methods, and status codes.',
        'Demo (15 min): Creating a simple test script in Postman/Insomnia.',
        'Hands-on Lab (45 min): Writing assertions for status codes, headers, and JSON body payloads.',
        'Refactoring (15 min): Running the test suite runner and checking code coverage.'
      ]
    }
  },
  ai: {
    name: 'AI-Assisted Dev',
    why: 'Generative AI is changing how software is built. Graduates need to understand how to write prompt structures, verify AI-generated output, and adhere to licensing and security policies ethically.',
    demand: 'Very High (95%)',
    coverage: 'Not Covered',
    effort: 'Low',
    week: 'Week 10 — Responsible AI Coding',
    outcome: 'Students will understand prompt engineering patterns and licensing/ethics of AI-assisted code generation.',
    assessment: 'AI Coding Case Study',
    deliverables: ['Prompt trace log and transcript', 'AI generated code snippets', 'Corrected bug documentation', 'Ethical and license reflection essay'],
    activity: {
      title: 'Prompt-Driven Debugging (90 minutes)',
      steps: [
        'Introduction (15 min): Prompt patterns, Copilot, and legal/security implications of generated code.',
        'Demo (15 min): Using AI assistants to debug an existing codebase step-by-step.',
        'Hands-on Lab (45 min): Solving complex logic bugs by instructing an AI assistant and testing output.',
        'Discussion (15 min): Ethical considerations, plagiarism, and technical debt of AI code.'
      ]
    }
  }
};

export default function SkillDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rubricOpen, setRubricOpen] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [toast, setToast] = useState(false);

  const skill = skillData[id] || skillData.cicd;

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
          Add {skill.name} to Software Engineering
        </motion.h1>
        <p className="sd-subtitle">SWE301 · Recommended skill addition</p>

        <div className="sd-panels">
          {/* Why */}
          <motion.div className="sd-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3>1. Why This Skill Matters</h3>
            <p className="sd-desc">
              {skill.why}
            </p>
            <div className="sd-metrics">
              <div className="sd-metric"><TrendingUp size={16} /><span>Market Demand</span><strong>{skill.demand}</strong></div>
              <div className="sd-metric"><Target size={16} /><span>Coverage</span><strong className={skill.coverage.includes('Not') ? 'red' : 'yellow'}>{skill.coverage}</strong></div>
              <div className="sd-metric"><Users size={16} /><span>Student Impact</span><strong>High</strong></div>
              <div className="sd-metric"><Clock size={16} /><span>Faculty Effort</span><strong className={skill.effort.includes('Low') ? 'green' : 'yellow'}>{skill.effort}</strong></div>
            </div>
          </motion.div>

          {/* Where */}
          <motion.div className="sd-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h3>2. Where to Add It</h3>
            <div className="sd-week-badge">📅 Recommended: {skill.week}</div>
            <div className="sd-outcome">
              <h4>Suggested Learning Outcome</h4>
              <p>{skill.outcome}</p>
            </div>
          </motion.div>

          {/* Assessment */}
          <motion.div className="sd-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <h3>3. Assessment Design</h3>
            <div className="sd-assessment-title">📋 {skill.assessment}</div>
            <div className="sd-submit-list">
              <h4>Students Submit:</h4>
              <ul>
                {skill.deliverables.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
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
              <span>{skill.name} has been added to your course plan.</span>
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
                  <h4>{skill.activity.title}</h4>
                  <ol>
                    {skill.activity.steps.map((step, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>
                        {step.split(': ')[0]}: {step.split(': ')[1]}
                      </li>
                    ))}
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
        message={`Adding ${skill.name} is a high-impact update. It helps students build a solid portfolio.`}
        pose="wave"
        delay={1.5}
      />
    </DashboardLayout>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import Syllo from '../components/Syllo';
import './AnalysisLoading.css';

const stages = [
  { label: 'Extracting course outcomes', duration: 1200 },
  { label: 'Mapping skills from syllabus', duration: 1400 },
  { label: 'Comparing with job-market demand', duration: 1800 },
  { label: 'Detecting emerging skill gaps', duration: 1500 },
  { label: 'Generating curriculum recommendations', duration: 1600 },
  { label: 'Building faculty action plan', duration: 1000 },
];

const syllabusTopics = ['SDLC', 'UML', 'Agile', 'Testing', 'Requirements', 'Documentation'];
const marketSkills = ['CI/CD', 'Docker', 'Cloud', 'AI Dev', 'API Testing', 'GitHub Flow'];

export default function AnalysisLoading() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    let timeout;
    if (currentStage < stages.length) {
      timeout = setTimeout(() => {
        setConnections((prev) => [...prev, currentStage % Math.max(syllabusTopics.length, marketSkills.length)]);
        setCurrentStage((prev) => prev + 1);
      }, stages[currentStage].duration);
    } else {
      timeout = setTimeout(() => setCompleted(true), 800);
    }
    return () => clearTimeout(timeout);
  }, [currentStage]);

  return (
    <div className="analysis-page">
      <div className="analysis-bg">
        {/* Scanning overlay */}
        <div className="analysis-scan-overlay" />
        {/* Pulse rings */}
        <div className="analysis-pulse-center">
          <div className="analysis-pulse-ring ring-1" />
          <div className="analysis-pulse-ring ring-2" />
          <div className="analysis-pulse-ring ring-3" />
        </div>
      </div>

      <div className="analysis-content">
        <motion.h1
          className="analysis-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Analyzing Curriculum
        </motion.h1>

        {/* Three columns visualization */}
        <div className="analysis-visualization">
          {/* Syllabus side */}
          <motion.div
            className="analysis-column"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="analysis-col-title">📄 Course Syllabus</h3>
            <div className="analysis-topics">
              {syllabusTopics.map((topic, i) => (
                <motion.div
                  key={i}
                  className={`analysis-topic ${connections.includes(i) ? 'connected' : ''}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                >
                  {topic}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Engine center */}
          <div className="analysis-engine">
            <motion.div
              className="analysis-engine-core"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(245, 197, 24, 0.2)',
                  '0 0 40px rgba(245, 197, 24, 0.4)',
                  '0 0 20px rgba(245, 197, 24, 0.2)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="analysis-engine-icon">🤖</div>
              <span>AI Engine</span>
            </motion.div>

            {/* Connection lines */}
            <svg className="analysis-lines" viewBox="0 0 200 300" preserveAspectRatio="none">
              {connections.map((ci, i) => (
                <motion.line
                  key={`left-${i}`}
                  x1="0" y1={30 + ci * 48}
                  x2="100" y2="150"
                  stroke="var(--yellow)"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
              {connections.map((ci, i) => (
                <motion.line
                  key={`right-${i}`}
                  x1="100" y1="150"
                  x2="200" y2={30 + ci * 48}
                  stroke="var(--yellow)"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              ))}
            </svg>
          </div>

          {/* Market side */}
          <motion.div
            className="analysis-column"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="analysis-col-title">📊 Job Market</h3>
            <div className="analysis-topics">
              {marketSkills.map((skill, i) => (
                <motion.div
                  key={i}
                  className={`analysis-topic market ${connections.includes(i) ? 'connected' : ''}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Progress checklist */}
        <div className="analysis-stages">
          {stages.map((stage, i) => (
            <motion.div
              key={i}
              className={`analysis-stage ${i < currentStage ? 'done' : i === currentStage ? 'active' : ''}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              {i < currentStage ? (
                <CheckCircle2 size={16} className="analysis-stage-icon done" />
              ) : i === currentStage ? (
                <Loader2 size={16} className="analysis-stage-icon spinning" />
              ) : (
                <Circle size={16} className="analysis-stage-icon" />
              )}
              <span>{stage.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <AnimatePresence>
          {completed && (
            <motion.button
              className="analysis-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate('/diagnosis')}
            >
              View Curriculum Diagnosis
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <Syllo
        message="I'm checking whether this course will still be useful when students graduate."
        pose="think"
        delay={1}
      />
    </div>
  );
}

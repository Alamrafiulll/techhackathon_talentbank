import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Building2, ChevronRight, Sparkles } from 'lucide-react';
import Syllo from '../components/Syllo';
import './RoleSelection.css';

const roles = [
  {
    id: 'committee',
    icon: Shield,
    title: 'Curriculum Committee',
    description: 'Review curriculum gaps, evaluate AI recommendations, approve or request changes.',
    responsibility: 'Governance & Approval',
    path: '/committee',
    color: '#F5C518',
  },
  {
    id: 'lecturer',
    icon: BookOpen,
    title: 'Lecturer',
    description: 'Improve course content, update weekly teaching plans, and redesign assessments based on future skills.',
    responsibility: 'Course Improvement',
    path: '/lecturer',
    color: '#4A90D9',
  },
  {
    id: 'dean',
    icon: Building2,
    title: 'Dean / Faculty Head',
    description: 'Monitor faculty-wide curriculum readiness, identify risky programmes, and plan strategic academic improvements.',
    responsibility: 'Strategic Oversight',
    path: '/dean',
    color: '#4A7C59',
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="role-page">
      {/* Background */}
      <div className="role-bg">
        <div className="role-bg-grid" />
        <div className="role-bg-glow" />
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="role-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 30, 0],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="role-content">
        <motion.div
          className="role-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles size={14} />
          <span>AI-Powered Curriculum Intelligence</span>
        </motion.div>

        <motion.h1
          className="role-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Future-State<br />
          <span className="role-title-accent">Curriculum Engine</span>
        </motion.h1>

        <motion.p
          className="role-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          AI-powered curriculum intelligence for universities preparing students for future careers.
        </motion.p>

        <motion.p
          className="role-instruction"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Select your role to begin
        </motion.p>

        {/* Role Cards */}
        <motion.div
          className="role-cards"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              className="role-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.15 }}
              whileHover={{ y: -6, boxShadow: `0 0 30px ${role.color}25, 0 0 60px ${role.color}10` }}
              onClick={() => navigate(role.path)}
              style={{ '--role-color': role.color }}
            >
              <div className="role-card-icon">
                <role.icon size={28} />
              </div>
              <div className="role-card-responsibility">{role.responsibility}</div>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
              <button className="role-card-btn">
                <span>Enter Dashboard</span>
                <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Syllo
        message="Choose your role. I'll show the right curriculum intelligence for your work."
        pose="wave"
        delay={2}
      />
    </div>
  );
}

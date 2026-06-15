import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, ScanSearch, TrendingUp, GitCompareArrows,
  Sparkles, ClipboardList, Target, Building2, GraduationCap,
  Calendar, User, ChevronRight
} from 'lucide-react';
import './DashboardLayout.css';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: ScanSearch, label: 'Curriculum Scan', path: '/upload' },
  { icon: TrendingUp, label: 'Skill Trends', path: '/diagnosis' },
  { icon: GitCompareArrows, label: 'Course Gap Analysis', path: '/diagnosis' },
  { icon: Sparkles, label: 'AI Recommendations', path: '/recommendations' },
  { icon: ClipboardList, label: 'Faculty Action Plan', path: '/action-plan' },
  { icon: Target, label: 'Outcome Forecast', path: '/score-improvement' },
];

export default function DashboardLayout({ children, activeItem = 'Overview' }) {
  const navigate = useNavigate();

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-brand" onClick={() => navigate('/')}>
          <div className="dash-logo">
            <div className="dash-logo-icon">
              <GraduationCap size={20} />
            </div>
            <div className="dash-logo-text">
              <span className="dash-logo-title">Future-State</span>
              <span className="dash-logo-subtitle">Curriculum Engine</span>
            </div>
          </div>
        </div>

        <nav className="dash-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={`dash-nav-item ${activeItem === item.label ? 'active' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {activeItem === item.label && (
                <motion.div
                  className="dash-nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
            </NavLink>
          ))}
        </nav>

        <div className="dash-sidebar-footer">
          <div className="dash-sidebar-version">v1.0 Beta</div>
        </div>
      </aside>

      {/* Main content */}
      <div className="dash-main">
        {/* Top bar */}
        <header className="dash-topbar">
          <div className="dash-topbar-left">
            <div className="dash-breadcrumb">
              <Building2 size={14} />
              <span>Northbridge University</span>
              <ChevronRight size={12} />
              <span>School of Computing</span>
            </div>
          </div>
          <div className="dash-topbar-right">
            <div className="dash-topbar-badge">
              <Calendar size={14} />
              <span>Fall 2026</span>
            </div>
            <div className="dash-topbar-badge">
              <User size={14} />
              <span>Dean / Program Chair</span>
            </div>
            <div className="dash-topbar-avatar">
              <GraduationCap size={16} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <motion.main
          className="dash-content"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

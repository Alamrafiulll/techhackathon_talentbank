import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, ScanSearch, TrendingUp, GitCompareArrows,
  Sparkles, ClipboardList, Target, Building2, GraduationCap,
  Calendar, User, ChevronRight, BookOpen, FileCheck, AlertTriangle,
  BarChart3, Map, FileText, Send, Shield, Users, Briefcase, PieChart
} from 'lucide-react';
import './DashboardLayout.css';

const navConfigs = {
  committee: [
    { icon: LayoutDashboard, label: 'Review Dashboard', path: '/committee' },
    { icon: ScanSearch, label: 'Evidence Brief', path: '/committee/brief' },
  ],
  lecturer: [
    { icon: LayoutDashboard, label: 'Course Dashboard', path: '/lecturer' },
    { icon: ClipboardList, label: '14-Week Teaching Plan', path: '/lecturer/plan' },
  ],
  dean: [
    { icon: LayoutDashboard, label: 'Faculty Overview', path: '/dean' },
    { icon: PieChart, label: 'Programme Readiness', path: '/dean/program/swe' },
    { icon: Map, label: 'Action Roadmap', path: '/dean/roadmap' },
  ],
};

const roleLabels = {
  committee: 'Curriculum Committee',
  lecturer: 'Lecturer',
  dean: 'Dean / Faculty Head',
};

const topbarInfo = {
  committee: { badge1: 'Semester 1, 2026/2027', badge2: 'Jawatankuasa Kurikulum', user: 'Committee Chair' },
  lecturer: { badge1: 'Semester 1, 2026/2027', badge2: 'FCSIT', user: 'Dr. Amina Rahman' },
  dean: { badge1: 'Sesi Akademik 2026/2027', badge2: 'FCSIT', user: 'Dekan / Ketua Fakulti' },
};

export default function DashboardLayout({ children, activeItem = '', role = 'committee' }) {
  const navigate = useNavigate();
  const navItems = navConfigs[role] || navConfigs.committee;
  const info = topbarInfo[role] || topbarInfo.committee;

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

        <div className="dash-role-badge">
          <Users size={12} />
          <span>{roleLabels[role]}</span>
        </div>

        <nav className="dash-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end
              className={({ isActive }) => `dash-nav-item ${isActive || activeItem === item.label ? 'active' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {(activeItem === item.label) && (
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
          <div className="dash-sidebar-version">v2.0 — ASA University</div>
        </div>
      </aside>

      {/* Main content */}
      <div className="dash-main">
        {/* Top bar */}
        <header className="dash-topbar">
          <div className="dash-topbar-left">
            <div className="dash-breadcrumb">
              <Building2 size={14} />
              <span>ASA University</span>
              <ChevronRight size={12} />
              <span>Faculty of Computer Science & IT</span>
            </div>
          </div>
          <div className="dash-topbar-right">
            <div className="dash-topbar-badge">
              <Calendar size={14} />
              <span>{info.badge1}</span>
            </div>
            <div className="dash-topbar-badge">
              <User size={14} />
              <span>{info.user}</span>
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

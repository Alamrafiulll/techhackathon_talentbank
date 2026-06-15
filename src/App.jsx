import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './pages/RoleSelection';
import CommitteeDashboard from './pages/committee/CommitteeDashboard';
import CommitteeBrief from './pages/committee/CommitteeBrief';
import LecturerDashboard from './pages/lecturer/LecturerDashboard';
import SkillDetail from './pages/lecturer/SkillDetail';
import TeachingPlan from './pages/lecturer/TeachingPlan';
import DeanDashboard from './pages/dean/DeanDashboard';
import ProgramDrillDown from './pages/dean/ProgramDrillDown';
import ActionRoadmap from './pages/dean/ActionRoadmap';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        {/* Committee */}
        <Route path="/committee" element={<CommitteeDashboard />} />
        <Route path="/committee/brief" element={<CommitteeBrief />} />
        {/* Lecturer */}
        <Route path="/lecturer" element={<LecturerDashboard />} />
        <Route path="/lecturer/skill/:id" element={<SkillDetail />} />
        <Route path="/lecturer/plan" element={<TeachingPlan />} />
        {/* Dean */}
        <Route path="/dean" element={<DeanDashboard />} />
        <Route path="/dean/program/:id" element={<ProgramDrillDown />} />
        <Route path="/dean/roadmap" element={<ActionRoadmap />} />
      </Routes>
    </Router>
  );
}

export default App;

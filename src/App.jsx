import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import AnalysisLoading from './pages/AnalysisLoading';
import DiagnosisResults from './pages/DiagnosisResults';
import RecommendationPage from './pages/RecommendationPage';
import ScoreImprovement from './pages/ScoreImprovement';
import FacultyActionPlan from './pages/FacultyActionPlan';
import BriefPreview from './pages/BriefPreview';
import FinalSuccess from './pages/FinalSuccess';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/analysis" element={<AnalysisLoading />} />
        <Route path="/diagnosis" element={<DiagnosisResults />} />
        <Route path="/recommendations" element={<RecommendationPage />} />
        <Route path="/score-improvement" element={<ScoreImprovement />} />
        <Route path="/action-plan" element={<FacultyActionPlan />} />
        <Route path="/brief-preview" element={<BriefPreview />} />
        <Route path="/success" element={<FinalSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;

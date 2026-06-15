import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, ChevronDown, Sparkles } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Syllo from '../components/Syllo';
import './UploadPage.css';

const sampleFiles = [
  { name: 'Software Engineering Syllabus.pdf', size: '2.4 MB', icon: '📄' },
  { name: 'Database Systems Course Outline.docx', size: '1.8 MB', icon: '📋' },
  { name: 'Business Analytics Module.pdf', size: '3.1 MB', icon: '📊' },
];

export default function UploadPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [formData, setFormData] = useState({
    faculty: 'School of Computing',
    department: 'Software Engineering',
    program: 'Bachelor of Science',
    yearLevel: 'Year 3',
    gradYear: '2027',
  });

  const handleSelectSample = (file) => {
    setSelectedFile(file);
  };

  return (
    <DashboardLayout activeItem="Curriculum Scan">
      <div className="upload-page">
        <div className="upload-header">
          <h1 className="upload-title">Upload Course Syllabus</h1>
          <p className="upload-subtitle">
            Drop a course outline, program handbook, or module descriptor.
            The engine will extract skills, topics, assessments, and future relevance.
          </p>
        </div>

        <div className="upload-grid">
          {/* Upload area */}
          <div className="upload-area-wrapper">
            <motion.div
              className={`upload-dropzone ${dragOver ? 'drag-over' : ''} ${selectedFile ? 'has-file' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); setSelectedFile(sampleFiles[0]); }}
              animate={dragOver ? { scale: 1.02 } : { scale: 1 }}
            >
              <div className="upload-scanner">
                <div className="upload-scanner-line" />
              </div>

              <AnimatePresence mode="wait">
                {selectedFile ? (
                  <motion.div
                    key="file"
                    className="upload-selected"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="upload-file-icon">📄</div>
                    <div className="upload-file-info">
                      <span className="upload-file-name">{selectedFile.name}</span>
                      <span className="upload-file-size">{selectedFile.size}</span>
                    </div>
                    <button
                      className="upload-file-change"
                      onClick={() => setSelectedFile(null)}
                    >
                      Change
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    className="upload-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="upload-icon-wrapper">
                      <Upload size={28} />
                    </div>
                    <p className="upload-text">Drag syllabus here or choose file</p>
                    <p className="upload-hint">PDF, DOCX, or TXT up to 10 MB</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Sample files */}
            <div className="upload-samples">
              <h3>
                <FileText size={14} />
                Sample Files
              </h3>
              <div className="upload-samples-list">
                {sampleFiles.map((file, i) => (
                  <motion.button
                    key={i}
                    className={`upload-sample ${selectedFile?.name === file.name ? 'active' : ''}`}
                    onClick={() => handleSelectSample(file)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="upload-sample-icon">{file.icon}</span>
                    <span className="upload-sample-name">{file.name}</span>
                    <span className="upload-sample-size">{file.size}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="upload-form">
            <h3>Course Details</h3>

            {Object.entries({
              faculty: { label: 'Faculty', options: ['School of Computing', 'School of Business', 'School of Engineering'] },
              department: { label: 'Department', options: ['Software Engineering', 'Computer Science', 'Information Systems'] },
              program: { label: 'Program', options: ['Bachelor of Science', 'Master of Science', 'Diploma'] },
              yearLevel: { label: 'Year Level', options: ['Year 1', 'Year 2', 'Year 3', 'Year 4'] },
              gradYear: { label: 'Target Graduation Year', options: ['2026', '2027', '2028', '2029'] },
            }).map(([key, config]) => (
              <div key={key} className="upload-field">
                <label>{config.label}</label>
                <div className="upload-select-wrapper">
                  <select
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  >
                    {config.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="upload-select-arrow" />
                </div>
              </div>
            ))}

            <motion.button
              className="upload-analyze-btn"
              onClick={() => navigate('/analysis')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!selectedFile}
              style={{ opacity: selectedFile ? 1 : 0.5 }}
            >
              <Sparkles size={18} />
              <span>Analyze Future Fit</span>
            </motion.button>
          </div>
        </div>
      </div>

      <Syllo
        message="Upload a syllabus. I'll compare it with future skills."
        pose="magnify"
        delay={1}
      />
    </DashboardLayout>
  );
}

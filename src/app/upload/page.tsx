'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  Download,
  Sparkles,
  Target,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { parseFile, validateFileType, formatFileSize } from '@/lib/file-parser';
import { analyzeResumeAPI, enhanceResumeAPI, type ResumeAnalysis, type EnhancedResume } from '@/lib/api-client';
import { generateResumePDF, downloadPDF } from '@/lib/pdf-generator';
import toast from 'react-hot-toast';

type UploadStage = 'upload' | 'analyzing' | 'analysis' | 'enhancing' | 'enhanced';

export default function UploadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState<UploadStage>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [resumeContent, setResumeContent] = useState('');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [enhancedResume, setEnhancedResume] = useState<EnhancedResume | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/');
    }
  }, [user, loading, router, mounted]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    
    if (!selectedFile) return;

    if (!validateFileType(selectedFile)) {
      setError('Please upload a PDF, DOCX, or TXT file');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    setError('');
    
    try {
      const content = await parseFile(selectedFile);
      setResumeContent(content);
    } catch (err) {
      setError('Failed to parse file. Please try a different format.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  const handleAnalyze = async () => {
    if (!resumeContent) {
      toast.error('Please upload a resume first');
      return;
    }

    setStage('analyzing');
    try {
      const analysisResult = await analyzeResumeAPI(resumeContent);
      setAnalysis(analysisResult);
      setStage('analysis');
      toast.success('Resume analyzed successfully!');
    } catch (error) {
      toast.error('Failed to analyze resume. Please try again.');
      setStage('upload');
    }
  };

  const handleEnhance = async () => {
    if (!analysis || !resumeContent) {
      toast.error('Please analyze your resume first');
      return;
    }

    setStage('enhancing');
    try {
      const enhanced = await enhanceResumeAPI(resumeContent, analysis);
      setEnhancedResume(enhanced);
      setStage('enhanced');
      toast.success('Resume enhanced successfully!');
    } catch (error) {
      toast.error('Failed to enhance resume. Please try again.');
      setStage('analysis');
    }
  };

  const handleDownload = () => {
    if (!enhancedResume) return;

    try {
      const doc = generateResumePDF({
        personalInfo: {
          fullName: 'Your Name',
          email: 'your.email@example.com',
          phone: 'Your Phone',
          location: 'Your Location'
        },
        summary: '',
        experience: [],
        education: [],
        skills: []
      }, enhancedResume.content);

      downloadPDF(doc, 'enhanced-resume.pdf');
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download resume');
    }
  };

  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mr-8"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Upload Resume
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[
              { key: 'upload', label: 'Upload', icon: Upload },
              { key: 'analysis', label: 'Analyze', icon: BarChart3 },
              { key: 'enhanced', label: 'Enhance', icon: Sparkles }
            ].map((step, index) => {
              const isActive = 
                (step.key === 'upload' && ['upload', 'analyzing'].includes(stage)) ||
                (step.key === 'analysis' && ['analysis', 'enhancing'].includes(stage)) ||
                (step.key === 'enhanced' && stage === 'enhanced');
              
              const isCompleted = 
                (step.key === 'upload' && ['analysis', 'enhancing', 'enhanced'].includes(stage)) ||
                (step.key === 'analysis' && ['enhanced'].includes(stage));

              return (
                <div key={step.key} className="flex items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted ? 'bg-green-500 text-white' : 
                      isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}
                  `}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                  </div>
                  <span className={`ml-3 font-medium ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                  {index < 2 && (
                    <div className={`w-16 h-1 mx-4 rounded-full transition-all duration-300 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upload Stage */}
        {stage === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Upload Your Resume
              </h1>
              <p className="text-lg text-gray-600">
                Upload your existing resume and let our AI analyze and enhance it
              </p>
            </div>

            {/* File Upload Area */}
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}
                ${error ? 'border-red-300 bg-red-50' : ''}
              `}
            >
              <input {...getInputProps()} />
              
              <div className="space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                  error ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {error ? (
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  ) : (
                    <Upload className="w-8 h-8 text-blue-500" />
                  )}
                </div>
                
                {file ? (
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span>File uploaded successfully</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-900">
                      {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
                    </p>
                    <p className="text-gray-500">or click to browse files</p>
                  </div>
                )}
                
                {error && (
                  <p className="text-red-600 font-medium">{error}</p>
                )}
                
                <p className="text-sm text-gray-400">
                  Supports PDF, DOCX, and TXT files (max 10MB)
                </p>
              </div>
            </div>

            {/* Analyze Button */}
            {file && resumeContent && !error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <button
                  onClick={handleAnalyze}
                  className="btn-primary text-lg px-8 py-4 flex items-center gap-2 mx-auto"
                >
                  <BarChart3 className="w-5 h-5" />
                  Analyze Resume
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Analyzing Stage */}
        {stage === 'analyzing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="loading-dots mx-auto">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Analyzing Your Resume
              </h2>
              <p className="text-gray-600">
                Our AI is examining your resume for optimization opportunities...
              </p>
            </div>
          </motion.div>
        )}

        {/* Analysis Results Stage */}
        {stage === 'analysis' && analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Resume Analysis Results
              </h1>
              <p className="text-lg text-gray-600">
                Here's what our AI found about your resume
              </p>
            </div>

            {/* Score Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {analysis.overallScore}/100
                </div>
                <div className="text-lg font-medium text-gray-900 mb-2">Overall Score</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${analysis.overallScore}%` }}
                  />
                </div>
              </div>

              <div className="card text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {analysis.atsCompatibility}/100
                </div>
                <div className="text-lg font-medium text-gray-900 mb-2">ATS Compatibility</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${analysis.atsCompatibility}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Analysis Details */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="text-gray-600 text-sm">
                      • {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                  Areas to Improve
                </h3>
                <ul className="space-y-2">
                  {analysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-gray-600 text-sm">
                      • {weakness}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 text-blue-500 mr-2" />
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {analysis.recommendations.slice(0, 3).map((rec, index) => (
                    <li key={index} className="text-gray-600 text-sm">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Keywords */}
            {analysis.keywordSuggestions.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Suggested Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywordSuggestions.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Enhance Button */}
            <div className="text-center">
              <button
                onClick={handleEnhance}
                className="btn-primary text-lg px-8 py-4 flex items-center gap-2 mx-auto"
              >
                <Sparkles className="w-5 h-5" />
                Enhance Resume
              </button>
            </div>
          </motion.div>
        )}

        {/* Enhancing Stage */}
        {stage === 'enhancing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="loading-dots mx-auto">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Enhancing Your Resume
              </h2>
              <p className="text-gray-600">
                Our AI is optimizing your resume for maximum impact...
              </p>
            </div>
          </motion.div>
        )}

        {/* Enhanced Results Stage */}
        {stage === 'enhanced' && enhancedResume && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Your Enhanced Resume is Ready! 🎉
              </h1>
              <p className="text-lg text-gray-600">
                Your resume has been optimized for ATS compatibility and impact
              </p>
            </div>

            {/* Enhancement Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {enhancedResume.atsScore}/100
                </div>
                <div className="text-lg font-medium text-gray-900">New ATS Score</div>
              </div>

              <div className="card text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {enhancedResume.improvements.length}
                </div>
                <div className="text-lg font-medium text-gray-900">Improvements Made</div>
              </div>

              <div className="card text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {analysis ? enhancedResume.atsScore - analysis.atsCompatibility : 0}+
                </div>
                <div className="text-lg font-medium text-gray-900">Score Increase</div>
              </div>
            </div>

            {/* Improvements */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Improvements Made
              </h3>
              <ul className="space-y-2">
                {enhancedResume.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Content Preview */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Enhanced Resume Preview
              </h3>
              <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {enhancedResume.content.substring(0, 1000)}
                  {enhancedResume.content.length > 1000 && '...'}
                </pre>
              </div>
            </div>

            {/* Download Button */}
            <div className="text-center">
              <button
                onClick={handleDownload}
                className="btn-primary text-lg px-8 py-4 flex items-center gap-2 mx-auto"
              >
                <Download className="w-5 h-5" />
                Download Enhanced Resume
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
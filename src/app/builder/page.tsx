'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  FileText, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderOpen,
  Sparkles,
  Download,
  Eye,
  ChevronRight,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { generateSectionAPI } from '@/lib/api-client';
import { generateResumePDF, downloadPDF, type ResumeData } from '@/lib/pdf-generator';
import toast from 'react-hot-toast';

interface FormSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
}

export default function ResumeBuilder() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>('personal');
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Form data
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const sections: FormSection[] = [
    { id: 'personal', title: 'Personal Information', icon: <User className="w-5 h-5" />, completed: false },
    { id: 'summary', title: 'Professional Summary', icon: <FileText className="w-5 h-5" />, completed: false },
    { id: 'experience', title: 'Work Experience', icon: <Briefcase className="w-5 h-5" />, completed: false },
    { id: 'education', title: 'Education', icon: <GraduationCap className="w-5 h-5" />, completed: false },
    { id: 'skills', title: 'Skills', icon: <Code className="w-5 h-5" />, completed: false },
    { id: 'projects', title: 'Projects', icon: <FolderOpen className="w-5 h-5" />, completed: false }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/');
    }
  }, [user, loading, router, mounted]);

  const generateAIContent = async (sectionType: string, userInput: string) => {
    if (!userInput.trim()) {
      toast.error('Please provide some information first');
      return;
    }

    setAiLoading(sectionType);
    try {
      const generatedContent = await generateSectionAPI(sectionType, userInput);
      
      switch (sectionType) {
        case 'summary':
          setResumeData(prev => ({ ...prev, summary: generatedContent }));
          break;
        case 'skills':
          const skillsArray = generatedContent.split(',').map(skill => skill.trim()).filter(Boolean);
          setResumeData(prev => ({ ...prev, skills: skillsArray }));
          break;
      }
      
      toast.success('AI content generated successfully!');
    } catch (error) {
      toast.error('Failed to generate AI content');
    } finally {
      setAiLoading(null);
    }
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: []
        }
      ]
    }));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: '',
          degree: '',
          graduationDate: '',
          gpa: ''
        }
      ]
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          name: '',
          description: '',
          technologies: []
        }
      ]
    }));
  };

  const updateProject = (index: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      projects: (prev.projects || []).map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const handleDownload = () => {
    try {
      const doc = generateResumePDF(resumeData);
      downloadPDF(doc, `${resumeData.personalInfo.fullName.replace(/\s+/g, '-').toLowerCase()}-resume.pdf`);
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
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Resume Builder
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn-secondary flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide Preview' : 'Preview'}
              </button>
              
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Resume Sections</h3>
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setExpandedSection(section.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      expandedSection === section.id 
                        ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {section.icon}
                      <span className="font-medium">{section.title}</span>
                    </div>
                    {expandedSection === section.id ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Personal Information */}
              {expandedSection === 'personal' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <User className="w-6 h-6 mr-2 text-blue-600" />
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                        }))}
                        className="input-field"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, email: e.target.value }
                        }))}
                        className="input-field"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, phone: e.target.value }
                        }))}
                        className="input-field"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, location: e.target.value }
                        }))}
                        className="input-field"
                        placeholder="City, State"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                        }))}
                        className="input-field"
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Portfolio Website
                      </label>
                      <input
                        type="url"
                        value={resumeData.personalInfo.portfolio}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, portfolio: e.target.value }
                        }))}
                        className="input-field"
                        placeholder="https://johndoe.com"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Professional Summary */}
              {expandedSection === 'summary' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    Professional Summary
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tell us about your background and career goals
                      </label>
                      <textarea
                        rows={3}
                        className="input-field"
                        placeholder="e.g., I'm a software engineer with 5 years of experience in web development, looking for a senior role in a tech startup..."
                      />
                    </div>
                    
                    <button
                      onClick={() => generateAIContent('summary', 'Generate professional summary based on my background')}
                      disabled={aiLoading === 'summary'}
                      className="btn-secondary flex items-center gap-2"
                    >
                      {aiLoading === 'summary' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      Generate with AI
                    </button>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Professional Summary *
                      </label>
                      <textarea
                        rows={4}
                        value={resumeData.summary}
                        onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                        className="input-field"
                        placeholder="Write a compelling summary of your professional background and career objectives..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Work Experience */}
              {expandedSection === 'experience' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Briefcase className="w-6 h-6 mr-2 text-blue-600" />
                      Work Experience
                    </h3>
                    <button
                      onClick={addExperience}
                      className="btn-secondary"
                    >
                      Add Experience
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Job Title *
                            </label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                              className="input-field"
                              placeholder="Software Engineer"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Company *
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              className="input-field"
                              placeholder="Tech Company Inc."
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Start Date *
                            </label>
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                              className="input-field"
                              placeholder="Jan 2020"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              End Date
                            </label>
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                              className="input-field"
                              placeholder="Present"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Description (one per line)
                          </label>
                          <textarea
                            rows={4}
                            value={exp.description.join('\n')}
                            onChange={(e) => updateExperience(index, 'description', e.target.value.split('\n').filter(Boolean))}
                            className="input-field"
                            placeholder="• Developed web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver features&#10;• Improved application performance by 30%"
                          />
                        </div>
                      </div>
                    ))}
                    
                    {resumeData.experience.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No work experience added yet. Click "Add Experience" to get started.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Education */}
              {expandedSection === 'education' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
                      Education
                    </h3>
                    <button
                      onClick={addEducation}
                      className="btn-secondary"
                    >
                      Add Education
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Degree *
                            </label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              className="input-field"
                              placeholder="Bachelor of Science in Computer Science"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Institution *
                            </label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                              className="input-field"
                              placeholder="University of Technology"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Graduation Date *
                            </label>
                            <input
                              type="text"
                              value={edu.graduationDate}
                              onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                              className="input-field"
                              placeholder="May 2020"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              GPA (Optional)
                            </label>
                            <input
                              type="text"
                              value={edu.gpa}
                              onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                              className="input-field"
                              placeholder="3.8/4.0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {resumeData.education.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No education added yet. Click "Add Education" to get started.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Skills */}
              {expandedSection === 'skills' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Code className="w-6 h-6 mr-2 text-blue-600" />
                    Skills
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tell us about your role and industry
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="e.g., Frontend Developer, Marketing Manager, Data Scientist..."
                      />
                    </div>
                    
                    <button
                      onClick={() => generateAIContent('skills', 'Generate relevant skills for my role')}
                      disabled={aiLoading === 'skills'}
                      className="btn-secondary flex items-center gap-2"
                    >
                      {aiLoading === 'skills' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      Suggest Skills with AI
                    </button>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skills (comma-separated) *
                      </label>
                      <textarea
                        rows={3}
                        value={resumeData.skills.join(', ')}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          skills: e.target.value.split(',').map(skill => skill.trim()).filter(Boolean)
                        }))}
                        className="input-field"
                        placeholder="JavaScript, React, Node.js, Python, SQL, AWS, Git, Agile"
                      />
                    </div>
                    
                    {resumeData.skills.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Projects */}
              {expandedSection === 'projects' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <FolderOpen className="w-6 h-6 mr-2 text-blue-600" />
                      Projects
                    </h3>
                    <button
                      onClick={addProject}
                      className="btn-secondary"
                    >
                      Add Project
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {(resumeData.projects || []).map((project, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Project Name *
                            </label>
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) => updateProject(index, 'name', e.target.value)}
                              className="input-field"
                              placeholder="E-commerce Website"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description *
                            </label>
                            <textarea
                              rows={3}
                              value={project.description}
                              onChange={(e) => updateProject(index, 'description', e.target.value)}
                              className="input-field"
                              placeholder="Built a full-stack e-commerce platform with user authentication, payment processing, and admin dashboard..."
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Technologies (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={project.technologies.join(', ')}
                              onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(tech => tech.trim()).filter(Boolean))}
                              className="input-field"
                              placeholder="React, Node.js, MongoDB, Stripe"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {(!resumeData.projects || resumeData.projects.length === 0) && (
                      <div className="text-center py-8 text-gray-500">
                        No projects added yet. Click "Add Project" to get started.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
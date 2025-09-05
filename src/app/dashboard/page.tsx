'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Plus, 
  ArrowLeft, 
  User, 
  LogOut,
  Sparkles,
  Target,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/');
    }
  }, [user, loading, router, mounted]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const handleUploadResume = () => {
    router.push('/upload');
  };

  const handleCreateResume = () => {
    router.push('/builder');
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
          <div className="flex justify-between items-center py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Resume Builder
              </span>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-5 h-5" />
                <span className="font-medium">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'there'}! 👋
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to create an amazing resume? Choose how you'd like to get started.
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Upload Resume Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card hover:scale-105 transition-all duration-300 cursor-pointer group"
            onClick={handleUploadResume}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Upload Existing Resume
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Have a resume already? Upload it and let our AI analyze, optimize, and enhance it for better ATS compatibility and impact.
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span>AI-powered analysis and feedback</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span>ATS optimization recommendations</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span>Content enhancement suggestions</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="btn-primary w-full group-hover:shadow-lg transition-shadow">
                  Upload Resume
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-3">
                Supports PDF, DOCX, and TXT formats
              </p>
            </div>
          </motion.div>

          {/* Create New Resume Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card hover:scale-105 transition-all duration-300 cursor-pointer group"
            onClick={handleCreateResume}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Plus className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Create New Resume
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Start fresh with our intelligent resume builder. Each section is powered by AI to help you craft compelling content.
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>AI-generated content suggestions</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Target className="w-4 h-4 text-purple-500" />
                  <span>Built-in ATS optimization</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  <span>Professional templates</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg group-hover:shadow-xl w-full">
                  Start Building
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-3">
                Guided step-by-step process
              </p>
            </div>
          </motion.div>
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </motion.div>
      </main>
    </div>
  );
}
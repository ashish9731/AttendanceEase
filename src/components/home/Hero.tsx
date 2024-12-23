import React from 'react';
import { Clock, Calendar, PieChart, Smartphone, Shield, Users, Briefcase, Award, LogIn } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { AuthTabs } from '../auth/AuthTabs';
import { LoginForm } from '../auth/LoginForm';
import { SignupForm } from '../auth/SignupForm';
import { useModal } from '../../hooks/useModal';

const features = [
  {
    icon: Clock,
    title: 'Real-Time Tracking',
    description: 'Monitor attendance in real-time with precise timestamps and location tracking',
  },
  {
    icon: Calendar,
    title: 'Smart Leave Management',
    description: 'Streamline leave requests with automated workflows and instant approvals',
  },
  {
    icon: PieChart,
    title: 'Advanced Analytics',
    description: 'Generate comprehensive reports with actionable insights and trends',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Access from any device with our responsive and intuitive interface',
  },
];

const benefits = [
  {
    icon: Shield,
    title: 'Enhanced Compliance',
    description: 'Stay compliant with labor laws and maintain accurate attendance records',
  },
  {
    icon: Users,
    title: 'Improved Productivity',
    description: 'Boost team efficiency with automated attendance tracking',
  },
  {
    icon: Briefcase,
    title: 'Seamless Integration',
    description: 'Integrate with your existing HR and payroll systems effortlessly',
  },
  {
    icon: Award,
    title: 'Employee Satisfaction',
    description: 'Enhance workplace transparency and fair attendance policies',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'HR Director',
    company: 'TechCorp Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    quote: 'AttendEase has transformed how we manage attendance. The automation and insights are invaluable.',
  },
  {
    name: 'Michael Chen',
    role: 'Operations Manager',
    company: 'Global Solutions',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    quote: 'The real-time tracking and reporting features have saved us countless hours of manual work.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Team Lead',
    company: 'Innovate Labs',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
    quote: 'Simple, intuitive, and powerful. AttendEase is exactly what we needed for our growing team.',
  },
];

export function Hero() {
  const { isOpen, open, close } = useModal();

  return (
    <div>
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">
                AttendEase
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={open}>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                Simplify Attendance
                <span className="block text-blue-600 mt-2">
                  Empower Your Workforce
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-500">
                Transform your attendance management with our intelligent platform. 
                Track attendance, manage leaves, and generate insights - all in one place.
              </p>
              <div className="mt-8 flex space-x-4">
                <Button onClick={open} className="px-8 py-3">
                  Get Started
                </Button>
                <Button variant="secondary" className="px-8 py-3">
                  Watch Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {testimonials.map((t, i) => (
                    <img key={i} src={t.image} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  Trusted by 1000+ companies worldwide
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
                  >
                    <div className="text-blue-600">
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose AttendEase?</h2>
            <p className="mt-4 text-lg text-gray-500">
              Discover how our platform can transform your attendance management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-gray-500">
              Join thousands of satisfied companies using AttendEase
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.company}</div>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Transform Your Attendance Management?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Join thousands of companies already using AttendEase
          </p>
          <Button 
            onClick={open}
            className="mt-8 bg-white text-blue-600 hover:bg-blue-50 px-8 py-3"
          >
            Start Free Trial
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={close}>
        <div className="p-6">
          <AuthTabs>
            <LoginForm />
            <SignupForm />
          </AuthTabs>
        </div>
      </Modal>
    </div>
  );
}
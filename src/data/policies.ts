import { Clock, Calendar, Shield, UserCheck, BookOpen, AlertCircle, Coffee, Users, Briefcase, Heart } from 'lucide-react';
import { Policy } from '../types/policy';

export const policies: Policy[] = [
  {
    id: 'attendance',
    title: 'Attendance Policy',
    description: 'Guidelines for work hours, attendance tracking, and time-off requests',
    icon: Clock,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
    sections: [
      {
        title: 'Work Hours',
        content: [
          'Standard work hours are from 9:00 AM to 5:00 PM, Monday through Friday',
          'Flexible timing allowed within 2 hours of standard timing (7:00 AM - 11:00 AM start)',
          'Minimum 8 working hours required per day',
          'Lunch break: 1 hour between 12:00 PM and 2:00 PM'
        ]
      },
      {
        title: 'Check-in/Check-out',
        content: [
          'Employees must check in upon arrival and check out before leaving',
          'Grace period of 15 minutes for check-in',
          'Early departure requires supervisor approval',
          'Three late arrivals in a month will trigger a review'
        ]
      }
    ]
  },
  {
    id: 'leave',
    title: 'Leave Policy',
    description: 'Types of leaves, application process, and approval workflow',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=800',
    sections: [
      {
        title: 'Leave Types',
        content: [
          'Annual Leave: 24 days per year',
          'Sick Leave: 12 days per year',
          'Personal Leave: 6 days per year',
          'Maternity Leave: 26 weeks',
          'Paternity Leave: 2 weeks'
        ]
      },
      {
        title: 'Application Process',
        content: [
          'Submit leave requests at least 3 days in advance',
          'Emergency leaves must be notified within 24 hours',
          'Provide supporting documents for sick leave exceeding 2 days',
          'Leave approval is subject to team capacity and deadlines'
        ]
      }
    ]
  },
  {
    id: 'benefits',
    title: 'Employee Benefits',
    description: 'Comprehensive overview of employee benefits and perks',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
    sections: [
      {
        title: 'Health Benefits',
        content: [
          'Comprehensive health insurance coverage',
          'Dental and vision coverage',
          'Annual health checkup',
          'Mental health support and counseling',
          'Gym membership reimbursement'
        ]
      },
      {
        title: 'Financial Benefits',
        content: [
          'Competitive salary package',
          '401(k) retirement plan with company matching',
          'Annual performance bonus',
          'Stock options after 1 year',
          'Professional development budget'
        ]
      }
    ]
  },
  {
    id: 'remote',
    title: 'Remote Work Policy',
    description: 'Guidelines for working remotely and maintaining productivity',
    icon: UserCheck,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    sections: [
      {
        title: 'Eligibility',
        content: [
          'Available to all employees after 3 months of employment',
          'Must maintain consistent performance metrics',
          'Requires reliable internet connection and workspace',
          'Subject to department head approval'
        ]
      },
      {
        title: 'Expectations',
        content: [
          'Regular attendance in team meetings',
          'Prompt response to communications during work hours',
          'Maintain same productivity standards as office work',
          'Regular updates on work progress'
        ]
      }
    ]
  },
  {
    id: 'workplace',
    title: 'Workplace Safety',
    description: 'Safety guidelines and emergency procedures',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    sections: [
      {
        title: 'General Safety',
        content: [
          'Follow all posted safety signs and instructions',
          'Report unsafe conditions immediately',
          'Keep emergency exits clear',
          'Participate in safety drills'
        ]
      },
      {
        title: 'Emergency Procedures',
        content: [
          'Evacuation routes are posted on each floor',
          'Assembly points are marked outside the building',
          'First aid kits available in designated areas',
          'Emergency contacts posted in common areas'
        ]
      }
    ]
  },
  {
    id: 'conduct',
    title: 'Code of Conduct',
    description: 'Professional behavior and workplace ethics guidelines',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800',
    sections: [
      {
        title: 'Professional Conduct',
        content: [
          'Maintain professional relationships with colleagues',
          'Respect diversity and inclusion',
          'Zero tolerance for harassment or discrimination',
          'Maintain confidentiality of sensitive information'
        ]
      },
      {
        title: 'Communication',
        content: [
          'Use appropriate language in all communications',
          'Follow email etiquette guidelines',
          'Respect meeting schedules and deadlines',
          'Address conflicts professionally'
        ]
      }
    ]
  }
];
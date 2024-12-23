import { LucideIcon } from 'lucide-react';

export interface PolicySection {
  title: string;
  content: string[];
}

export interface Policy {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  sections: PolicySection[];
}
export interface SkillCategory {
  category: string;
  items: string[];
  description?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  specialization: string;
  institution: string;
  affiliation: string;
  year: string;
  score: string;
  details?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  period: string;
  status?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  techStack: string[];
  deploymentPlatform: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: string[];
  timestamp: string;
  isError?: boolean;
}

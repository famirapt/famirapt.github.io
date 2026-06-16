export interface Competency {
  category: string;
  items: string[];
}

export interface ExperienceBullet {
  title: string;
  description: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: ExperienceBullet[];
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tech: string[];
  imagePrompt: string; // Used for identifying or generating visual patterns
  imagePath: string; // The generated or fallback asset path
  demoType: "honeypot" | "siem" | "waf"; // To mount the correct interactive demo
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}

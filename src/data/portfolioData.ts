import { Competency, Experience, Project, Testimonial, Certification } from "../types";

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    phone: string;
    email: string;
    location: string;
    githubUrl: string;
    linkedinUrl: string;
    avatar: string;
    tagline: string;
    summary: string;
  };
  competencies: Competency[];
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
  testimonials: Testimonial[];
  awardsAndActivities: string[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Rahmatu Abdulkarim",
    title: "Cybersecurity Analyst & SOC Analyst",
    phone: "0806 765 6124",
    email: "famirapt@gmail.com",
    location: "Zaria, Kaduna/Kano, Nigeria",
    githubUrl: "https://github.com/famirapt",
    linkedinUrl: "https://linkedin.com/in/rahmatu-abdulkarim",
    avatar: "/src/assets/images/coder_avatar_1781626585029.jpg",
    tagline: "Securing Digital Frontiers with Technical Rigour & Analytical Depth",
    summary: "SOC Analyst with a B.Sc. in Cyber Security and 2+ years of hands-on experience across military communications, university networks, and a cybersecurity dev centre. Google Cybersecurity Professional Certified with proven ability to triage and investigate live alerts using the ELK Stack, configure WAF rules that block SQL injection and XSS attacks, and deploy honeypots that capture real-world attacker behaviour. Experienced in Linux (Ubuntu/Kali), AWS security controls, and delivering security awareness training to non-technical communities. Passionate about protecting organisations that serve vulnerable populations."
  },
  competencies: [
    {
      category: "SIEM & Log Analysis",
      items: ["ELK Stack (Elasticsearch, Logstash, Kibana)", "Splunk (foundational)", "Log Ingestion & Parsing", "Alert Triage & Investigation", "Incident Documentation"]
    },
    {
      category: "Threat Detection",
      items: ["Honeypot Deployment (Cowrie SSH)", "Brute-force Pattern Analysis", "Vulnerability Assessment (DVWA)", "Nmap & Network Scanning", "Metasploit Exploitation Framework"]
    },
    {
      category: "Network & Perimeter",
      items: ["ModSecurity WAF / OWASP CRS", "Sophos UTM Firewall", "Wireshark Packet Analysis", "Cisco Networking", "VPNs & Secure Gateways", "CCTV Network Integration"]
    },
    {
      category: "Cloud Security & OS",
      items: ["AWS Security Groups", "IAM Least Privilege Access", "Linux (Ubuntu, Kali Linux)", "Bash Scripting & Automation", "Python Programming"]
    },
    {
      category: "Soft Skills & Defense",
      items: ["Alert Documentation", "Incident Escalation", "Cross-Functional Communication", "Security Awareness Training", "Continuous Learning"]
    }
  ],
  experiences: [
    {
      id: "exp1",
      role: "Cybersecurity Intern",
      company: "Bincom Dev Center",
      location: "Lagos, Nigeria (Remote)",
      period: "Jan 2026 – Feb 2026",
      tags: ["ELK Stack", "Honeypots", "ModSecurity WAF", "AWS Sec", "DVWA"],
      bullets: [
        {
          title: "Alert Triage & Incident Investigation",
          description: "Monitored live security events ingested into the ELK Stack across a multi-tenant environment, triaged and investigated alerts to distinguish true positives from false positives, and escalated confirmed incidents per defined SOC runbooks — producing written incident summaries for each escalation."
        },
        {
          title: "Threat Detection & Honeypot Analysis",
          description: "Deployed a Cowrie SSH honeypot capturing live brute-force attack patterns; analysed attacker behaviour including credential stuffing attempts and post-login session activity, and produced structured threat intelligence reports documenting attacker TTPs."
        },
        {
          title: "Web Application Defence",
          description: "Configured ModSecurity WAF with OWASP Core Rule Set (CRS) to detect and block common web threats including SQL injection and XSS; tuned rule sets to reduce false positives while maintaining active threat coverage across application endpoints."
        },
        {
          title: "Vulnerability Assessment",
          description: "Deployed DVWA (Damn Vulnerable Web Application) in a controlled virtualised environment to perform structured vulnerability assessments and document findings."
        },
        {
          title: "Cloud Security Controls",
          description: "Configured AWS Security Groups and IAM roles to enforce Least Privilege Access, limiting exposure of cloud-hosted resources."
        }
      ]
    },
    {
      id: "exp2",
      role: "Perimeter & Security Operations Intern",
      company: "57 Signal Division",
      location: "Maiduguri, Nigeria",
      period: "Jan 2025 – Dec 2025",
      tags: ["Military Communications", "CCTV", "Perimeter Security", "Access Control"],
      bullets: [
        {
          title: "Secure Network Operations",
          description: "Maintained network connectivity and access controls for a high-availability military communications environment, supporting infrastructure upgrades with zero unplanned downtime across the deployment period."
        },
        {
          title: "Physical & Digital Surveillance",
          description: "Configured and maintained CCTV surveillance networks across multiple installation points, integrating physical surveillance with digital access controls to strengthen the facility's overall security posture."
        },
        {
          title: "Perimeter Security",
          description: "Administered network device configurations and access control policies to enforce perimeter security, ensuring only authorised personnel accessed sensitive communication channels."
        }
      ]
    },
    {
      id: "exp3",
      role: "Cybersecurity Instructor",
      company: "BT-Hub Nigeria",
      location: "Nigeria",
      period: "Jun 2024 – Aug 2024",
      tags: ["Training", "Phishing Awareness", "Social Engineering", "Cybersecurity Curriculum"],
      bullets: [
        {
          title: "Security Awareness Training",
          description: "Designed and delivered a structured cybersecurity curriculum to 30+ community learners covering safe internet practices, phishing recognition, password hygiene, and social engineering awareness — translating technical concepts into accessible, actionable guidance for non-technical audiences."
        }
      ]
    },
    {
      id: "exp4",
      role: "IT Help Desk (SIWES)",
      company: "NIS Unit, ABU Zaria",
      location: "Zaria, Kaduna, Nigeria",
      period: "Dec 2022 – Jul 2023",
      tags: ["Sophos UTM", "Access Management", "Troubleshooting", "Firewall Rules"],
      bullets: [
        {
          title: "Gateway & Perimeter Security",
          description: "Configured Sophos UTM to protect the university network against external threats, applying firewall rules and content filtering policies."
        },
        {
          title: "Access Management",
          description: "Managed internet access credentials for 200+ staff and students, enforcing access control policies and handling account lifecycle tasks including provisioning, suspension, and password resets in line with institutional security standards."
        }
      ]
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Cowrie SSH Honeypot & Analytics Engine",
      subtitle: "B.Sc. Final Year Project & Implementation",
      description: "Deployed SSH honeypot decoy on Ubuntu Server, captured brute-force patterns, and built raw analytical logs parser in Python.",
      longDescription: "Deployed an active Cowrie SSH/Telnet honeypot on Ubuntu Server 22.04 in an exposed web-facing subnet to monitor real-time threat intelligence. Simulated brute-force attacks using Nmap, Medusa, and Metasploit. Then, built a custom multi-threaded Python parser to process Cowrie's unstructured JSON event logs, map attackers' IP addresses to geological regions, identify top username/password dictionary vectors, and output compiled, audit-ready summaries detailing threat actor Tactics, Techniques, and Procedures (TTPs).",
      tech: ["Ubuntu Server 22.04", "Cowrie SSH/Telnet", "Python", "JSON", "Medusa / Metasploit", "Bash"],
      imagePrompt: "A sleek dashboard showcasing real-time brute force logs, terminal lines, cyber defense maps, abstract dark design with glow",
      imagePath: "/src/assets/images/project_honeypot_1781626532535.jpg",
      demoType: "honeypot"
    },
    {
      id: "p2",
      title: "Security Onion & ELK Stack SIEM Pipeline",
      subtitle: "Enterprise Alert Triage & TTP Investigation",
      description: "Centralized multi-tenant endpoint alerts into Kibana for live incident monitoring and SOC threat analysis.",
      longDescription: "Engineered an ELK Stack pipeline with Security Onion to ingest network security telemetry and host audit logs across multi-tenant testbeds. Created interactive Kibana visualizers that query active alerts, filter false positives, and identify brute-force or lateral movement campaigns. Designed custom SOC runbooks detailing investigative pathways for rapid escalation of true physical and web endpoint threats.",
      tech: ["ELK Stack (Elasticsearch, Logstash, Kibana)", "Security Onion", "Syslog", "Network Security", "Incident Response"],
      imagePrompt: "Interactive network telemetry timeline with charts, cybersecurity dashboards, dark slate theme with glowing alerts",
      imagePath: "/src/assets/images/project_siem_1781626549141.jpg",
      demoType: "siem"
    },
    {
      id: "p3",
      title: "ModSecurity WAF Policy Config & Exclusion Rules",
      subtitle: "Layer 7 Web Shielding & Tuning",
      description: "Configured reverse proxy ModSecurity Web Application Firewall with OWASP CRS to block SQLi and XSS injection vectors.",
      longDescription: "Set up and scaled an Apache reverse proxy Web Application Firewall (WAF) using ModSecurity and the industry-standard OWASP Core Rule Set (CRS). Fine-tuned detection controls to recognize modern injection payloads like SQL Injections (SQLi), Cross-Site Scripting (XSS), and automated crawlers, while building detailed matching rules and pattern exceptions that eliminated high-volume false-positive alerts on authenticated sessions.",
      tech: ["ModSecurity", "OWASP CRS", "Web Vulnerability Defense", "Port/Log Ingestion", "Nginx/Apache Proxy"],
      imagePrompt: "Web application firewall routing visualization, digital shields blocking purple rays of attack code, stylized",
      imagePath: "/src/assets/images/project_waf_1781626566581.jpg",
      demoType: "waf"
    }
  ],
  certifications: [
    {
      name: "Google Cybersecurity Professional Certificate",
      issuer: "Google via Coursera",
      year: 2026
    },
    {
      name: "API Security Fundamentals",
      issuer: "API University",
      year: 2025
    },
    {
      name: "Networking Basics",
      issuer: "Cisco Networking Academy",
      year: 2025
    },
    {
      name: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      year: 2023
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Chinedu Okafor",
      role: "Lead Cybersecurity Engineering Mentor",
      company: "Bincom Dev Center",
      text: "Rahmatu stands out for her technical rigour and logical clarity. When triaging live security incidents on our ELK Stack, her ability to filter false positives and file crisp, detailed SOC incident reports kept our remediation times exceptionally low. She has a bright future in alert analysis and critical defense.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
    },
    {
      id: "t2",
      name: "Dr. Ibrahim Bello",
      role: "Professor & B.Sc. Final Year Advisor",
      company: "Department of Cybersecurity, Bayero University Kano",
      text: "For her final year project, Rahmatu self-directed an impressive real-world honeypot implementation on Ubuntu. Her customized Python parsing script did not just dump logs; it structured threat actors' credential behaviors in an academic-grade taxonomy. She possesses wonderful research skills matched with stellar engineering drive.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
    },
    {
      id: "t3",
      name: "Aisha Danjuma",
      role: "Program Manager",
      company: "BT-Hub Nigeria",
      text: "What makes Rahmatu an exceptional professional is how she bridges deep cyber knowledge with human-centered instruction. She designed a cybersecurity curriculum that transformed highly technical terms like 'social engineering' and 'brute force TTPs' into actionable, easy-to-grasp defenses for our local learners.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
    }
  ],
  awardsAndActivities: [
    "Participant, Inter-University Cybersecurity Debate | Diary of Hackers Career Fair, 2021",
    "Active practitioner on TryHackMe (scoring top badges in SOC and offensive penetration modules)"
  ]
};

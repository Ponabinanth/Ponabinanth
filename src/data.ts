/**
 * Portfolio Data Models & Comprehensive Schema
 * Personal Portfolio of PONABINANTH S
 * Computer Science Engineer | Full-Stack Developer | AI Enthusiast
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  architecture: string;
  features: string[];
  contribution: string;
  github: string;
  demoUrl?: string;
  imageUrl?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface AreaOfInterestDomain {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  technologies: string[];
  experienceSummary: string;
  practicalApplications: string[];
  relatedProjects: string[];
}

export interface AcademicSubject {
  name: string;
  category: string;
  keyConcepts: string[];
  practicalApplication: string;
  proficiency: "Advanced" | "Proficient" | "Core Competency";
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
}

export interface CodingProfile {
  platform: string;
  solved: string;
  badge: string;
  rank: string;
  color: string;
  iconName: string;
  profileUrl?: string;
}

export interface Certificate {
  category: "Java" | "Full Stack" | "Big Data" | "SQL" | "Cybersecurity" | "Testing";
  issuer: string;
  title: string;
  date: string;
  credentialId: string;
  skillsLearned: string[];
  verifyUrl?: string;
}

export interface InternshipExperience {
  role: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
  outcome: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  score?: string;
  coursework?: string[];
  technicalFocus?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  leetcode: string;
  areaOfInterest: AreaOfInterestDomain[];
  careerFocus: AreaOfInterestDomain[]; // Backward compatibility alias
  academics: AcademicSubject[];
  skills: SkillCategory[];
  projects: Project[];
  timeline: TimelineItem[];
  codingProfiles: CodingProfile[];
  certificates: Certificate[];
  internships: InternshipExperience[];
  education: Education[];
  githubStats: {
    repos: number;
    stars: number;
    followers: number;
    contributions: number;
    languages: { name: string; percentage: number; color: string }[];
  };
}

const areaOfInterestDomains: AreaOfInterestDomain[] = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    iconName: "Code2",
    shortDesc: "Designing maintainable, object-oriented systems with strong data structures and software architectural patterns.",
    technologies: ["Java", "C", "Python", "DSA", "OOP", "Design Patterns", "Clean Code"],
    experienceSummary: "Built robust Java applications following SOLID principles, modular package design, and automated testing standard procedures.",
    practicalApplications: ["Algorithmic problem solving", "System design optimization", "Multithreaded processing execution"],
    relatedProjects: ["Inventory Management System", "Automated Regression Framework"]
  },
  {
    id: "full-stack",
    title: "Full-Stack Development",
    iconName: "Layers",
    shortDesc: "End-to-end web application development connecting responsive UI client portals with RESTful API backends.",
    technologies: ["React.js", "Spring Boot", "Node.js", "Express", "Tailwind CSS", "HTML5", "JavaScript ES6+"],
    experienceSummary: "Developed commercial-grade single-page applications integrated with secure authentication (JWT) and persistent database layers.",
    practicalApplications: ["Responsive web portals", "RESTful API services", "Client-server state synchronization"],
    relatedProjects: ["EduReach AI", "Inventory Management System", "AI Recruitment System"]
  },
  {
    id: "ai-engineering",
    title: "Artificial Intelligence",
    iconName: "BrainCircuit",
    shortDesc: "Building generative AI pipelines, RAG systems, voice agents, and prompt-engineered LLM integration proxies.",
    technologies: ["LLMs", "Generative AI", "RAG", "Gemini API", "OpenAI API", "Web Speech API", "Prompt Engineering"],
    experienceSummary: "Created contextual AI tutoring ecosystems, voice-activated assistants, and automated natural language evaluation frameworks.",
    practicalApplications: ["Voice-interactive AI tutors", "Automated resume evaluation & ATS scoring", "RAG knowledge retrieval"],
    relatedProjects: ["EduReach AI", "AI Recruitment System"]
  },
  {
    id: "backend-engineering",
    title: "Backend Engineering",
    iconName: "Server",
    shortDesc: "Architecting high-throughput microservices, transaction safety, custom connection pools, and database ORMs.",
    technologies: ["Java", "Spring Boot", "REST APIs", "JDBC", "Hibernate", "FastAPI", "Maven", "PostgreSQL"],
    experienceSummary: "Designed REST controllers handling 5000+ operations/sec with transaction isolation, role-based access, and latency under 10ms.",
    practicalApplications: ["Role-Based Access Control (RBAC)", "Database connection pooling", "Service-oriented business logic"],
    relatedProjects: ["Inventory Management System", "EduReach AI Backend"]
  },
  {
    id: "cloud-deployment",
    title: "Cloud & Deployment",
    iconName: "Cloud",
    shortDesc: "Packaging applications with Docker, managing containerized deployments, cloud hosting, and continuous deployment.",
    technologies: ["AWS", "Docker", "Git", "GitHub Actions", "Vercel", "Render", "Firebase"],
    experienceSummary: "Deployed static and server-rendered web applications onto Vercel and Render with environment configuration and automated CI/CD pipelines.",
    practicalApplications: ["Cloud hosting management", "Containerized application runtime", "Version control & repository management"],
    relatedProjects: ["EduReach AI Cloud Host", "SecureChain Node Deployment"]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    iconName: "ShieldCheck",
    shortDesc: "Implementing secure network communications, automated vulnerability testing, and threat classification models.",
    technologies: ["Cisco Cybersecurity", "Automated Testing", "OWASP Security", "JWT Auth", "Cryptographic Hashing"],
    experienceSummary: "Certified by Cisco Networking Academy in Cybersecurity; engineered regression testing suites validating API vulnerability endpoints.",
    practicalApplications: ["Client-side ML threat detection", "API endpoint payload validation", "Secure token management"],
    relatedProjects: ["SecureChain", "Automated Regression Testing Framework"]
  },
  {
    id: "blockchain",
    title: "Blockchain",
    iconName: "Cpu",
    shortDesc: "Designing smart contracts, decentralized identity validation, and immutable transaction registries.",
    technologies: ["Solidity", "Web3.js", "Ethereum / Polygon", "Smart Contracts", "NFT Standards", "Crypto Hashes"],
    experienceSummary: "Constructed decentralized IoT transaction verification contracts and verified digital certificates using Web3 wrappers.",
    practicalApplications: ["Decentralized trust registries", "NFT credential validation", "Immutable ledger transactions"],
    relatedProjects: ["SecureChain Blockchain Security Suite"]
  }
];

export const portfolioData: PortfolioData = {
  name: "PONABINANTH S",
  title: "Computer Science Engineer | Full-Stack Developer | AI Enthusiast",
  tagline: "I build intelligent, scalable, and user-focused software solutions by combining full-stack development, artificial intelligence, cybersecurity, and emerging technologies.",
  about: "I am a Computer Science Engineering student with an unyielding passion for constructing robust full-stack applications, intelligent AI agent workflows, and secure decentralized systems. Guided by my core engineering philosophy — Build → Learn → Solve → Improve —, I focus on bridging scalable backend architectures (Java, Spring Boot, REST APIs) with intuitive, high-performance web frontends (React, Tailwind, Framer Motion) and cutting-edge GenAI APIs.",
  email: "abinanth574@gmail.com",
  phone: "+91 97869 40399",
  location: "Tiruppur, Tamil Nadu, India",
  linkedin: "https://www.linkedin.com/in/ponabinanths/",
  github: "https://github.com/Ponabinanth",
  leetcode: "https://leetcode.com/u/Abinanth1810/",

  areaOfInterest: areaOfInterestDomains,
  careerFocus: areaOfInterestDomains,

  academics: [
    {
      name: "Data Structures & Algorithms",
      category: "Computer Science Core",
      keyConcepts: ["Arrays", "Linked Lists", "Trees", "Graphs", "Sorting & Searching", "Dynamic Programming", "Recursion"],
      practicalApplication: "Solved 350+ LeetCode problems optimizing time and space complexities for algorithmic performance.",
      proficiency: "Advanced"
    },
    {
      name: "Object-Oriented Programming (OOP)",
      category: "Software Design",
      keyConcepts: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "SOLID Principles", "Design Patterns"],
      practicalApplication: "Architected modular Java Spring Boot services and scalable class hierarchies across full-stack applications.",
      proficiency: "Advanced"
    },
    {
      name: "Database Management Systems (DBMS)",
      category: "Data Engineering",
      keyConcepts: ["Relational Model", "SQL Queries", "Normalization (1NF-3NF)", "ACID Transactions", "Indexing", "Joins"],
      practicalApplication: "Designed normalized MySQL and PostgreSQL schemas for enterprise inventory & user authentication systems.",
      proficiency: "Advanced"
    },
    {
      name: "Operating Systems",
      category: "System Fundamentals",
      keyConcepts: ["Process Management", "Multithreading", "Memory Allocation", "Virtual Memory", "Deadlocks", "File Systems"],
      practicalApplication: "Implemented thread-safe concurrencies and connection pools within Spring Boot server backends.",
      proficiency: "Proficient"
    },
    {
      name: "Computer Networks",
      category: "System Infrastructure",
      keyConcepts: ["OSI Model", "TCP/IP Protocol Stack", "HTTP/HTTPS", "Sockets", "REST Protocol", "Network Security"],
      practicalApplication: "Engineered client-server REST API communication interfaces and client WebSocket data channels.",
      proficiency: "Proficient"
    },
    {
      name: "Software Engineering",
      category: "Methodology",
      keyConcepts: ["Agile/Scrum", "SDLC", "Requirements Analysis", "Software Architecture", "Unit & Integration Testing"],
      practicalApplication: "Built automated regression test suites using Selenium & REST Assured in Agile team environments.",
      proficiency: "Proficient"
    },
    {
      name: "Big Data & SQL Analytics",
      category: "Data Processing",
      keyConcepts: ["Complex Querying", "Aggregation Functions", "Window Functions", "Data Pipelines", "Big Data Concepts"],
      practicalApplication: "Completed Infosys & Oracle DB programming programs to process structured multi-table datasets.",
      proficiency: "Core Competency"
    },
    {
      name: "Cybersecurity & Information Security",
      category: "Security Engineering",
      keyConcepts: ["Network Defense", "Encryption Standards", "Access Control", "Threat Detection", "Vulnerability Assessment"],
      practicalApplication: "Certified by Cisco Networking Academy; designed AI threat detection pipelines for Web3 transactions.",
      proficiency: "Core Competency"
    }
  ],

  skills: [
    {
      category: "Languages",
      items: ["Java", "Python", "C", "JavaScript (ES6+)"]
    },
    {
      category: "Frontend",
      items: ["HTML5", "CSS3", "React.js", "Angular", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "Backend",
      items: ["Spring Boot", "FastAPI", "Flask", "REST APIs", "JDBC", "Maven"]
    },
    {
      category: "Databases",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Supabase", "SQLite"]
    },
    {
      category: "AI",
      items: ["LLMs", "Generative AI", "RAG", "AI APIs (Gemini/OpenAI)", "Prompt Engineering", "AI Agents"]
    },
    {
      category: "Cloud / Tools",
      items: ["AWS", "Docker", "Git", "GitHub", "Vercel", "Render", "Firebase"]
    }
  ],

  projects: [
    {
      id: "edureach",
      title: "EduReach AI",
      subtitle: "AI-Powered Personalized Learning & Tutor Ecosystem",
      description: "An intelligent, voice-enabled academic learning portal featuring automated curriculum roadmaps, AI mock interviews, and automated evaluation.",
      problem: "Traditional online learning lacks personalized, dynamic feedback and 1-on-1 vocal instruction tailored to an individual student's exact knowledge gaps.",
      solution: "Engineered an AI tutor platform combining LLM prompt grounding with browser speech synthesis/recognition to deliver interactive oral instruction, custom roadmaps, and instant coding evaluations.",
      techStack: ["React.js", "Spring Boot", "PostgreSQL", "Supabase", "Gemini API", "OpenAI API", "JWT", "Vercel", "Render"],
      architecture: "Decoupled Web Architecture: React SPA frontend communicates with a secure Spring Boot proxy backend. Speech-to-text queries are processed through Gemini API contextual prompt wrappers with strict academic guardrails.",
      features: [
        "Interactive Voice-Enabled AI Tutor (vocal question & vocal response capabilities)",
        "Adaptive Curriculum & Skill-Gap Roadmap Generator",
        "AI Resume Builder & Smart ATS Compatibility Scoring",
        "AI Exam Evaluator & Real-Time Coding Mentor",
        "AI Interview Coach & Notes Synthesizer"
      ],
      contribution: "Solely designed the entire end-to-end full stack architecture, integrated Web Speech APIs, authored prompt grounding scripts, and deployed client-server pipelines.",
      github: "https://github.com/Ponabinanth/edureach-ai",
      imageUrl: "/projects/edureach.png"
    },
    {
      id: "securechain",
      title: "SecureChain",
      subtitle: "AI-Powered Blockchain Security Platform",
      description: "A hybrid Web3 & AI threat detection platform designed to protect connected IoT devices and validate immutable cryptographic credentials.",
      problem: "Centralized IoT authentication and blockchain networks suffer from transaction anomaly risks, phishing bursts, and verification latency overheads.",
      solution: "Combined Solidity smart contracts on Polygon/Ethereum with client-side AI detection algorithms to analyze transaction packet spikes before committing on-chain.",
      techStack: ["React.js", "Python", "Flask", "PostgreSQL", "Supabase", "Solidity", "Web3.js", "TensorFlow.js"],
      architecture: "Hybrid Web3 Ecosystem: Solidified smart contracts handle immutable transaction validation, while off-chain Flask REST services feed real-time telemetry into client-side machine learning classifiers.",
      features: [
        "Real-Time AI Threat Detection for Transaction Bursts",
        "Encrypted Cloud & Decentralized Storage Manager",
        "Cyber Threat Monitoring Dashboard & Security Analytics",
        "IoT Trust Registry & NFT Certificate Validation",
        "Metamask & Web3 Wallet Authentication Integration"
      ],
      contribution: "Created smart contract lifecycle scripts, built client Web3 integration handlers, and trained transaction classification models.",
      github: "https://github.com/Ponabinanth/securechain",
      imageUrl: "/projects/securechain.png"
    },
    {
      id: "retail-intelligence",
      title: "Retail Intelligence Platform",
      subtitle: "Enterprise Inventory & Sales Analytics Console",
      description: "A high-performance full-stack inventory management system equipped with automated reorder calculations and business intelligence metrics.",
      problem: "Manual stock administration leads to stockout delays, inefficient depletion tracking, and lack of real-time multi-location warehouse visibility.",
      solution: "Developed a 3-tier Spring Boot and React enterprise dashboard with real-time stock telemetry, automated low-stock alerts, and predictive demand analytics.",
      techStack: ["Java", "Spring Boot", "React.js", "MySQL", "Hibernate ORM", "Tailwind CSS", "Spring Security"],
      architecture: "3-Tier Enterprise Architecture: Presentation Layer (Vite-React UI), API/Controller Layer (Spring REST controllers & JWT auth), Service Layer (Transactional scopes), Data Layer (Hibernate ORM with MySQL).",
      features: [
        "Real-Time Inventory Stock Tracking & Dynamic Reorder Thresholds",
        "Role-Based Access Control (RBAC: Admin, Manager, Auditor)",
        "Sales Analytics & Demand Forecasting Dashboard",
        "Automated Transaction History Audit Logger",
        "Low-Stock Email Alert Triggers"
      ],
      contribution: "Engineered Spring Boot REST endpoints, implemented database transaction safety, built the interactive data visualization UI, and optimized query execution times to <10ms.",
      github: "https://github.com/Ponabinanth/inventory-management-system",
      imageUrl: "/projects/inventory.png"
    },
    {
      id: "ai-recruitment",
      title: "AI Recruitment System",
      subtitle: "Automated Candidate Screening & Resume Analytics Platform",
      description: "An AI-assisted talent acquisition portal that automates resume parsing, skill matching, and preliminary candidate interview scoring.",
      problem: "Recruiters spend hundreds of hours manually screening unqualified resumes and evaluating standardized initial screening answers.",
      solution: "Created an intelligent recruitment engine that extracts key skills from candidate PDFs, compares qualifications against job specs, and ranks candidates using AI scoring models.",
      techStack: ["Node.js", "Express", "React.js", "Gemini API", "Tailwind CSS", "Chart.js"],
      architecture: "Client-Server API Pipeline: React portal captures applicant CVs, passes parsed text to Express REST endpoints wrapping Gemini LLM models for multi-variable skill matching and candidate ranking.",
      features: [
        "Automated PDF Resume Extraction & Parsing",
        "Job Description vs Applicant Skill Matching Matrix",
        "AI Candidate Screening & Comparative Ranking Leaderboard",
        "AI Interview Question Evaluator",
        "Automated Recruiter Feedback Report Generator"
      ],
      contribution: "Authored resume parsing algorithms, designed prompt matrices for objective candidate evaluation, and constructed the interactive recruiter dashboard.",
      github: "https://github.com/Ponabinanth/ai-recruitment-system",
      imageUrl: "/projects/recruitment.png"
    }
  ],

  timeline: [
    {
      year: "2021",
      title: "Secondary Education",
      subtitle: "📍 Shri Ganga Matriculation School",
      description: "Built my academic foundation and developed an early interest in technology and problem-solving."
    },
    {
      year: "2023",
      title: "Higher Secondary Education",
      subtitle: "📍 RKR Grks Matric Hr Sec School",
      description: "Strengthened my analytical and logical thinking, leading me toward Computer Science."
    },
    {
      year: "2024",
      title: "Started B.E. Computer Science & Engineering",
      subtitle: "📍 V.S.B. Engineering College, Karur",
      description: "Began my journey into programming, software engineering, databases, networking, and computer science fundamentals."
    },
    {
      year: "2024–2025",
      title: "Programming & Development Foundation",
      subtitle: "💻 Java • Python • C • SQL • HTML • CSS • JavaScript",
      description: "Started building applications and strengthening DSA, OOP, DBMS, and web development skills."
    },
    {
      year: "2025",
      title: "Full-Stack Development",
      subtitle: "🚀 React • Spring Boot • REST APIs • MySQL • PostgreSQL",
      description: "Moved from learning individual technologies to developing complete end-to-end applications."
    },
    {
      year: "2025–2026",
      title: "Industry Training & Certifications",
      subtitle: "🏢 Infosys • NPTEL • Oracle Academy • Cisco",
      description: "Gained practical exposure to Java, full-stack development, Big Data, SQL, cybersecurity, and automated testing."
    },
    {
      year: "2026",
      title: "EduReach AI",
      subtitle: "🎓 AI-Powered Learning Platform",
      description: "Built an intelligent education ecosystem incorporating AI tutoring, personalized learning, AI evaluation, interview preparation, career guidance, and coding assistance."
    },
    {
      year: "2026",
      title: "SecureChain",
      subtitle: "🔐 AI-Powered Blockchain Security Platform",
      description: "Combined blockchain, cybersecurity, AI threat detection, encrypted storage, IoT trust, and security analytics."
    },
    {
      year: "2027",
      title: "Future Goal",
      subtitle: "🎯 Software Engineer",
      description: "Build production-ready software that combines AI + Full Stack + Cloud + Security to solve meaningful real-world problems."
    }
  ],

  codingProfiles: [
    {
      platform: "LeetCode",
      solved: "350+ Problems",
      badge: "Knight Tier",
      rank: "Top 15% Global",
      color: "from-amber-500 to-yellow-600",
      iconName: "Code",
      profileUrl: "https://leetcode.com/u/Abinanth1810/"
    },
    {
      platform: "CodeChef",
      solved: "150+ Problems",
      badge: "3-Star Rank",
      rank: "Rating 1680",
      color: "from-emerald-500 to-green-600",
      iconName: "Code",
      profileUrl: "https://www.codechef.com/users/abinanth1810"
    },
    {
      platform: "GeeksforGeeks",
      solved: "200+ Solved",
      badge: "400+ Coding Score",
      rank: "Top Performer",
      color: "from-green-600 to-teal-700",
      iconName: "Cpu",
      profileUrl: "https://www.geeksforgeeks.org/user/abinanth1810/"
    },
    {
      platform: "HackerRank",
      solved: "Gold Badges",
      badge: "5-Star Java",
      rank: "5-Star Problem Solving",
      color: "from-blue-500 to-indigo-600",
      iconName: "Award",
      profileUrl: "https://www.hackerrank.com/profile/abinanth574"
    }
  ],

  certificates: [
    {
      category: "Java",
      issuer: "Infosys Springboard",
      title: "Java Foundation Certification",
      date: "2024",
      credentialId: "INF-JF-FOUND",
      skillsLearned: ["Java Syntax & OOP", "Exception Handling", "Collections Framework", "Generics"]
    },
    {
      category: "Full Stack",
      issuer: "Infosys Springboard",
      title: "Java Full Stack Development",
      date: "2025",
      credentialId: "INF-JFS-DEV",
      skillsLearned: ["Spring Boot REST APIs", "Hibernate ORM", "React UI Integration", "MySQL Data Persistence"]
    },
    {
      category: "SQL",
      issuer: "Oracle Academy",
      title: "Database Programming with SQL",
      date: "2024",
      credentialId: "ORA-SQL-DBMS",
      skillsLearned: ["Relational Database Design", "Complex SQL Joins", "Subqueries & Indexing", "Data Normalization"]
    },
    {
      category: "Big Data",
      issuer: "NPTEL (IIT)",
      title: "Database Management System",
      date: "2024",
      credentialId: "NPTEL-DBMS-882",
      skillsLearned: ["ACID Properties", "Relational Algebra", "Transaction Management", "B-Trees & Indexing"]
    },
    {
      category: "Cybersecurity",
      issuer: "Cisco Networking Academy",
      title: "Cybersecurity Essentials",
      date: "2024",
      credentialId: "CISCO-CYBER-SEC",
      skillsLearned: ["Network Defense", "Threat Detection", "Cryptographic Protocols", "Security Vulnerability Scans"]
    },
    {
      category: "Testing",
      issuer: "Automated Testing Suite",
      title: "Automated Regression Testing Framework",
      date: "2025",
      credentialId: "AUT-TEST-SELENIUM",
      skillsLearned: ["Java Selenium WebDriver", "REST Assured API Automation", "JUnit / TestNG", "Spring Boot Test Suites"]
    }
  ],

  internships: [
    {
      role: "Java Developer / TechA Program Intern",
      company: "Infosys",
      duration: "2025",
      location: "Mysore / Remote",
      responsibilities: [
        "Engineered full-stack applications using Java and Spring Boot framework following enterprise coding standards.",
        "Designed and executed RESTful APIs with database integration using MySQL and Hibernate ORM.",
        "Built frontend interfaces using HTML, CSS, and JavaScript for dynamic user experiences.",
        "Participated in Agile development processes, code reviews, and team-based project delivery."
      ],
      technologies: ["Java", "Spring Boot", "MySQL", "REST APIs", "JavaScript", "Agile"],
      outcome: "Successfully delivered production-grade full stack capstone application with 100% test coverage compliance."
    },
    {
      role: "Full Stack Web Development Intern",
      company: "SquashApps",
      duration: "2025",
      location: "Coimbatore / Remote",
      responsibilities: [
        "Engineered full-stack web application features using HTML, CSS, JavaScript, and modern frontend frameworks.",
        "Executed RESTful APIs integration with backend services and database systems (MySQL / MongoDB).",
        "Enhanced UI/UX responsiveness, performance optimization, and cross-browser compatibility across target viewports."
      ],
      technologies: ["React.js", "Node.js", "Express", "MongoDB", "MySQL", "Tailwind CSS"],
      outcome: "Accelerated page load speed by 35% and improved responsive layout rendering across mobile and tablet devices."
    },
    {
      role: "Automated Regression Testing Developer",
      company: "Infosys / Enterprise Project",
      duration: "2025 – 2026",
      location: "Remote",
      responsibilities: [
        "Developed automated regression testing suites for enterprise web portals and backend microservices.",
        "Integrated Selenium WebDriver for UI end-to-end automation and REST Assured for backend API endpoint validation.",
        "Configured test execution reports and automated regression pipelines connected to Spring Boot application build processes."
      ],
      technologies: ["Java", "Selenium", "REST Assured", "Spring Boot", "Maven", "TestNG"],
      outcome: "Reduced manual QA validation cycles from 6 hours to under 15 minutes per deployment build."
    }
  ],

  education: [
    {
      degree: "B.E. Computer Science & Engineering",
      institution: "V.S.B. Engineering College",
      location: "Karur, Tamil Nadu",
      duration: "2023 – 2027",
      score: "CGPA: 8.0",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (Java)",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Web Technologies",
        "Artificial Intelligence & Machine Learning"
      ],
      technicalFocus: "Full Stack Systems Architecture, Core Java Development, Spring Boot, & GenAI Platform Integration."
    },
    {
      degree: "Higher Secondary Education (12th Grade)",
      institution: "RKR GRKS Matric Higher Secondary School",
      location: "Udumalpet, Tamil Nadu",
      duration: "2022 – 2023",
      score: "First Class with Distinction",
      coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
      technicalFocus: "Strengthened analytical problem solving, logical reasoning, and computer programming fundamentals."
    },
    {
      degree: "Secondary Education (10th Grade)",
      institution: "Shri Ganga Matriculation School",
      location: "Tiruppur, Tamil Nadu",
      duration: "2020 – 2021",
      score: "First Class Distinction",
      coursework: ["Mathematics", "Science", "Social Science", "English", "Tamil"],
      technicalFocus: "Built academic foundation, logical aptitude, and developed an early passion for technology."
    }
  ],

  githubStats: {
    repos: 24,
    stars: 118,
    followers: 85,
    contributions: 843,
    languages: [
      { name: "Java (Spring Boot / JDBC)", percentage: 45, color: "#b07219" },
      { name: "JavaScript / TypeScript / React", percentage: 30, color: "#f1e05a" },
      { name: "Python / GenAI APIs", percentage: 15, color: "#3572A5" },
      { name: "Solidity / Web3", percentage: 10, color: "#AA6746" }
    ]
  }
};

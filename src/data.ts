export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  architecture: string;
  features: string[];
  github: string;
  demoUrl?: string;
  details: string;
  imageUrl?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface SkillProgress {
  name: string;
  percentage: number;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface CodingProfile {
  platform: string;
  solved: string;
  badge: string;
  rank: string;
  color: string;
  iconName: string;
}

export interface Certificate {
  issuer: string;
  title: string;
  date: string;
  credentialId: string;
}

export interface Internship {
  role: string;
  company: string;
  duration: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  score?: string;
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
  skills: SkillCategory[];
  skillProgress: SkillProgress[];
  projects: Project[];
  timeline: TimelineItem[];
  codingProfiles: CodingProfile[];
  certificates: Certificate[];
  internships: Internship[];
  education: Education[];
  githubStats: {
    repos: number;
    stars: number;
    followers: number;
    contributions: number;
    languages: { name: string; percentage: number; color: string }[];
  };
}

export const portfolioData: PortfolioData = {
  name: "PONABINANTH S",
  title: "Java Full Stack Developer | AI Engineer | Blockchain Enthusiast",
  tagline: "Building intelligent, secure, and scalable software that solves real-world problems using Java, AI, and Modern Web Technologies.",
  about: "I am a Computer Science Engineering student passionate about building AI-powered applications, highly scalable Java backend systems, and secure blockchain platforms. My expertise spans Full Stack Development, Deep Learning/Prompt Engineering, Cloud Computing, and Algorithmic Problem Solving. I enjoy bridging complex backend architectures with stunning, highly interactive frontends to construct production-ready software with real-world utility.",
  email: "abinanth574@gmail.com",
  phone: "+91 97869 40399",
  location: "Tiruppur, Tamil Nadu, India",
  linkedin: "https://www.linkedin.com/in/ponabinanths/",
  github: "https://github.com/Ponabinanth",
  skills: [
    {
      category: "Languages",
      items: ["Java", "Python", "JavaScript (ES6+)", "C", "SQL"]
    },
    {
      category: "Frontend",
      items: ["HTML5", "CSS3", "React", "Tailwind CSS", "GSAP", "Three.js"]
    },
    {
      category: "Backend",
      items: ["Spring Boot", "REST API", "JDBC", "Hibernate", "Node.js", "Express"]
    },
    {
      category: "Database & Cloud",
      items: ["MySQL", "MongoDB", "Firebase", "AWS", "Vercel", "Render"]
    },
    {
      category: "AI & ML",
      items: ["Prompt Engineering", "OpenAI / Gemini API", "RAG Systems", "Vector Databases", "Web Speech API", "TensorFlow.js"]
    },
    {
      category: "Developer Tools",
      items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Postman", "Docker"]
    }
  ],
  skillProgress: [
    { name: "Java", percentage: 95 },
    { name: "Spring Boot", percentage: 90 },
    { name: "MySQL", percentage: 90 },
    { name: "AI Engineering & LLMs", percentage: 88 },
    { name: "JavaScript / React", percentage: 85 },
    { name: "HTML5 & Tailwind CSS", percentage: 95 }
  ],
  projects: [
    {
      id: "inventory",
      title: "Inventory Management System",
      description: "A highly scalable full-stack enterprise resource planning and stock administration console.",
      techStack: ["Java", "Spring Boot", "Spring Security", "Hibernate", "MySQL", "React", "Tailwind CSS"],
      architecture: "3-Tier Enterprise Architecture: Presentation Layer (Vite-React UI), API/Controller Layer (Spring REST controllers & JWT authentication), Business/Service Layer (Transactional Service scopes), Data Access Layer (Hibernate ORM mapping), and Persistent Storage (MySQL Database on Cloud AWS).",
      features: [
        "Real-time inventory levels tracking with automatic dynamic reordering algorithms.",
        "Secure Role-Based Access Control (RBAC) allowing Admin, Manager, and Viewer views.",
        "Full stock depletion analytics using automated transactional charting dashboards.",
        "Interactive low-stock threshold email alerts and audit history loggers."
      ],
      github: "https://github.com/Ponabinanth/inventory-management-system",
      details: "This inventory solution resolves critical warehouse pipeline issues. Developed using Spring Boot to facilitate rapid data transactions, it includes comprehensive validation checkers, transactional state safety, and structured logging. The system easily handles 5,000+ operations per second with query execution times below 10ms."
    },
    {
      id: "edureach",
      title: "EduReach AI (Personalized AI Tutor)",
      description: "An AI-powered academic learning portal specializing in customized roadmap creation and vocal study tutoring.",
      techStack: ["React", "Node.js", "Express", "Gemini API", "Web Speech API", "Tailwind CSS", "Chart.js"],
      architecture: "Decoupled Serverless Client-Proxy Architecture: Front-end UI captures speech-to-text queries via browser Web Speech API, passes questions to the server-side proxy which wraps LLM configurations with strict educational system constraints, and synthesizes text responses back using TTS or browser Speech Synthesis.",
      features: [
        "Interactive AI Academic Tutor with audio-vocal dialogue (voice-in, voice-out).",
        "Automated PDF Resume Builder and smart ATS capability assessment system.",
        "Adaptive Curriculum Roadmap Generator based on customizable skill-gap analyzers.",
        "Dynamic Topic Quiz Creator with real-time feedback and difficulty scaling."
      ],
      github: "https://github.com/Ponabinanth/edureach-ai",
      details: "EduReach AI leverages LLM grounding models to eliminate generic response behaviors, keeping instruction highly academic. The custom AI Tutor acts as a hyper-personalized mentor, synthesizing custom programming exercises, mock exams, and graphical flowcharts to explain complex computer architecture or algorithms."
    },
    {
      id: "securechain",
      title: "SecureChain Blockchain Security Suite",
      description: "A decentralized IoT device transaction authorization platform featuring client-side ML threat-analysis models.",
      techStack: ["Solidity", "Web3.js", "Ethereum / Polygon", "React", "Express", "TensorFlow.js", "Tailwind CSS"],
      architecture: "Hybrid Web3 Ecosystem: Solidified smart contracts handle immutable transaction validation and tokenized NFT certificate indexing on the blockchain, while off-chain Express REST workers gather transaction traces, parsing them to client-side TensorFlow.js neural networks for lightning-fast anomaly and DDoS prediction.",
      features: [
        "On-chain smart-contract cryptographic verification for secure connected IoT telemetry.",
        "Client-side deep learning classification model detecting malicious transaction packet bursts.",
        "Digital NFT validations representing physical product authenticity guarantees.",
        "Live web-socket based ledger block visualizer with interactive packet metrics."
      ],
      github: "https://github.com/Ponabinanth/securechain",
      details: "SecureChain merges cryptographic ledger safety with AI models to guard connected networks. It reduces typical transaction review overheads by processing the preliminary detection sweeps directly on-edge using optimized browser TensorFlow models, minimizing gas costs and accelerating verification timings."
    }
  ],
  timeline: [
    {
      year: "2024",
      title: "Launched Computer Science Engineering Journey",
      description: "Enrolled in B.E. Computer Science Engineering. Immediately gravitated towards logical computing and structured algorithms."
    },
    {
      year: "2024",
      title: "Mastered Java Core & Advanced Systems",
      description: "Gained in-depth proficiency in OOP concepts, Multithreading, JDBC, Collections Framework, and JVM structural layouts."
    },
    {
      year: "2024",
      title: "Adopted Modern Full-Stack Technologies",
      description: "Learned CSS3, ES6+ Javascript, and React. Began building responsive layouts and interactive modular single-page apps."
    },
    {
      year: "2025",
      title: "Pioneered AI & Prompt Engineering Projects",
      description: "Integrated Large Language Models (Gemini/OpenAI) using server-side proxies, crafting smart tutors, custom roadmaps, and TTS utilities."
    },
    {
      year: "2025",
      title: "Explored Blockchain & Cryptographic Nodes",
      description: "Wrote smart contracts in Solidity, deploying them on testnets, and connected decentralized pipelines to React using Web3 wrappers."
    },
    {
      year: "2025",
      title: "Industrial Full-Stack & AI Engineering Internships",
      description: "Participated in commercial software developments, building secure database tables, Spring Rest APIs, and local AI toolchains."
    },
    {
      year: "2026",
      title: "Intensive Competitive Coding & Placement Prep",
      description: "Solved 350+ data structures & algorithms problems on LeetCode/CodeChef. Strengthened knowledge in system architectures."
    },
    {
      year: "2026+",
      title: "Future Software Engineer / Technical Architect",
      description: "Poised to deliver production-ready enterprise software utilizing Spring Boot robustness and Gemini intelligence."
    }
  ],
  codingProfiles: [
    {
      platform: "LeetCode",
      solved: "350+ Problems",
      badge: "Knight (Simulated)",
      rank: "Top 15%",
      color: "from-amber-500 to-yellow-600",
      iconName: "Code"
    },
    {
      platform: "CodeChef",
      solved: "150+ Solved",
      badge: "3-Star Rank",
      rank: "Rating 1680",
      color: "from-emerald-500 to-green-600",
      iconName: "Terminal"
    },
    {
      platform: "GeeksforGeeks",
      solved: "200+ Solved",
      badge: "400+ Coding Score",
      rank: "Monthly Rank 120",
      color: "from-green-600 to-teal-700",
      iconName: "Cpu"
    },
    {
      platform: "HackerRank",
      solved: "Gold Badges",
      badge: "5-Star in Java",
      rank: "5-Star Problem Solving",
      color: "from-blue-500 to-indigo-600",
      iconName: "Award"
    }
  ],
  certificates: [
    {
      issuer: "Oracle Academy",
      title: "Database Programming with SQL",
      date: "2024",
      credentialId: "ORA-SQL-DBMS"
    },
    {
      issuer: "NPTEL (IIT)",
      title: "Database Management System",
      date: "2024",
      credentialId: "NPTEL-DBMS-882"
    },
    {
      issuer: "Cisco Networking Academy",
      title: "Cybersecurity",
      date: "2024",
      credentialId: "CISCO-CYBER-SEC"
    },
    {
      issuer: "Infosys Springboard",
      title: "Java Foundation",
      date: "2024",
      credentialId: "INF-JF-FOUND"
    },
    {
      issuer: "Infosys Springboard",
      title: "Java Full Stack Development",
      date: "2025",
      credentialId: "INF-JFS-DEV"
    }
  ],
  internships: [
    {
      role: "Java Developer Intern",
      company: "Infosys",
      duration: "2025",
      bullets: [
        "Engineered full-stack applications using Java and Spring Boot framework",
        "Designed and executed RESTful APIs with database integration using MySQL",
        "Built frontend interfaces using HTML, CSS, and JavaScript for dynamic user experience",
        "Participated in Agile development process, code reviews, and team-based project delivery"
      ]
    },
    {
      role: "Full Stack Web Development Intern",
      company: "SquashApps",
      duration: "2025",
      bullets: [
        "Engineered full-stack web application features using HTML, CSS, JavaScript, and modern frontend frameworks",
        "Executed RESTful APIs integration with backend services and database systems (MySQL/MongoDB)",
        "Enhanced UI/UX responsiveness, performance optimization, and cross-browser compatibility"
      ]
    }
  ],
  education: [
    {
      degree: "B.E Computer Science Engineering",
      institution: "V.S.B Engineering College",
      duration: "2023 – 2027",
      score: "CGPA: 8"
    },
    {
      degree: "Higher Secondary Education",
      institution: "RKR GRKS Matric Higher Secondary School",
      duration: "2022 – 2023"
    },
    {
      degree: "Secondary Education",
      institution: "Shri Ganga Matriculation School",
      duration: "2020 – 2021"
    }
  ],
  githubStats: {
    repos: 24,
    stars: 118,
    followers: 85,
    contributions: 843,
    languages: [
      { name: "Java (Spring Boot / JDBC)", percentage: 45, color: "#b07219" },
      { name: "JavaScript / TypeScript", percentage: 30, color: "#f1e05a" },
      { name: "Solidity (Smart Contracts)", percentage: 15, color: "#AA6746" },
      { name: "HTML / Tailwind CSS", percentage: 10, color: "#e34c26" }
    ]
  }
};

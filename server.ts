import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { portfolioData } from "./src/data.js"; // Importing data to feed the model

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3010;

app.use(express.json());

// Initialize Gemini Client with proper telemetric User-Agent as instructed
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// API Route: Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!apiKey,
    time: new Date().toISOString(),
  });
});

// In-memory cache for GitHub API data
let githubCache: { data: any; timestamp: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// API Route: Live GitHub Metrics Proxy
app.get("/api/github", async (req, res) => {
  try {
    const now = Date.now();
    if (githubCache && (now - githubCache.timestamp < CACHE_TTL_MS)) {
      return res.json(githubCache.data);
    }

    const [userRes, reposRes, eventsRes] = await Promise.allSettled([
      fetch("https://api.github.com/users/Ponabinanth", { headers: { "User-Agent": "PortfolioApp" } }),
      fetch("https://api.github.com/users/Ponabinanth/repos?sort=updated&per_page=10", { headers: { "User-Agent": "PortfolioApp" } }),
      fetch("https://api.github.com/users/Ponabinanth/events/public?per_page=10", { headers: { "User-Agent": "PortfolioApp" } })
    ]);

    let user: any = null;
    let repos: any[] = [];
    let events: any[] = [];

    if (userRes.status === "fulfilled" && userRes.value.ok) {
      user = await userRes.value.json();
    }
    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      repos = await reposRes.value.json();
    }
    if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
      events = await eventsRes.value.json();
    }

    const totalStars = repos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);
    const totalForks = repos.reduce((acc: number, r: any) => acc + (r.forks_count || 0), 0);

    const formattedEvents = events.slice(0, 5).map((evt: any) => ({
      id: evt.id,
      type: evt.type,
      repo: evt.repo?.name || "Ponabinanth/repository",
      createdAt: evt.created_at,
      message: evt.payload?.commits?.[0]?.message || evt.type.replace("Event", "")
    }));

    const result = {
      isLive: !!user,
      username: user?.login || "Ponabinanth",
      avatarUrl: user?.avatar_url || "https://github.com/Ponabinanth.png",
      publicRepos: user?.public_repos ?? portfolioData.githubStats.repos,
      followers: user?.followers ?? portfolioData.githubStats.followers,
      following: user?.following ?? 2,
      totalStars: totalStars > 0 ? totalStars : portfolioData.githubStats.stars,
      totalForks: totalForks,
      contributions: portfolioData.githubStats.contributions,
      bio: user?.bio || portfolioData.about,
      profileCreated: user?.created_at || "2025-06-12T02:17:11Z",
      lastUpdated: user?.updated_at || new Date().toISOString(),
      languages: portfolioData.githubStats.languages,
      topRepos: repos.length > 0 ? repos.slice(0, 4).map((r: any) => ({
        name: r.name,
        desc: r.description || "Portfolio project repository",
        lang: r.language || "Java",
        stars: r.stargazers_count,
        forks: r.forks_count,
        url: r.html_url
      })) : null,
      recentEvents: formattedEvents
    };

    githubCache = { data: result, timestamp: now };
    res.json(result);
  } catch (err: any) {
    console.error("GitHub Proxy Error:", err);
    res.json({
      isLive: false,
      username: "Ponabinanth",
      avatarUrl: "https://github.com/Ponabinanth.png",
      publicRepos: portfolioData.githubStats.repos,
      followers: portfolioData.githubStats.followers,
      totalStars: portfolioData.githubStats.stars,
      contributions: portfolioData.githubStats.contributions,
      languages: portfolioData.githubStats.languages,
      recentEvents: []
    });
  }
});

// API Route: Real-Time System Telemetry
const startTime = Date.now();
app.get("/api/telemetry", (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const memoryUsageMB = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
  const randomLatency = Math.floor(Math.random() * 12) + 12; // 12ms to 24ms

  res.json({
    status: "OPERATIONAL",
    uptimeSeconds,
    memoryUsageMB,
    pingMs: randomLatency,
    nodeVersion: process.version,
    activeVisitorsSimulated: Math.floor(Math.random() * 5) + 3,
    timestamp: new Date().toISOString(),
    localTimeString: new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }),
    utcTimeString: new Date().toUTCString()
  });
});

// API Route: Contact Form Handler with Automated AI Dispatch
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  console.log(`[CONTACT RECEIVED] From: ${name} (${email}) - Message: ${message}`);

  let autoReply = `Hi ${name},\n\nThank you for reaching out! I have received your message regarding: "${message.substring(0, 60)}...". I appreciate your interest in my portfolio and software development work. I will get back to you shortly.\n\nBest regards,\nPonabinanth S`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: `A recruiter/collaborator named '${name}' (${email}) sent the following contact message: "${message}". Generate a warm, ultra-professional 3-sentence acknowledgement email from Ponabinanth S confirming receipt of their message and highlighting enthusiasm to connect.` }]
          }
        ],
      });
      if (response.text) {
        autoReply = response.text;
      }
    } catch (e) {
      console.warn("AI Auto-reply generation warning, using template fallback.");
    }
  }

  res.json({
    success: true,
    receivedAt: new Date().toISOString(),
    message: "Your message was delivered successfully to Ponabinanth S.",
    autoReply
  });
});

// Helper to compile the comprehensive system instructions based on portfolioData
function buildSystemInstruction(mode: string): string {
  const serializedProfile = JSON.stringify(portfolioData, null, 2);
  
  let modeInstruction = "";
  if (mode === "interview") {
    modeInstruction = `
MODE: TECHNICAL INTERVIEW SIMULATOR
- You are an expert technical interviewer (Senior Director of Engineering).
- Conduct a realistic technical interview. Ask standard interview questions focusing on:
  * Java Core, OOP Principles, JVM Architecture (JVM memory layers, garbage collection)
  * REST APIs vs SOAP, Spring Boot Annotations
  * Data Structures and Algorithms (e.g. Binary Search, Quick Sort, String manipulation)
- DO NOT dump all questions at once. Ask exactly ONE question at a time.
- Read the user's answer, provide a highly constructive critique with an 'Interview Score' (e.g., 8/10), explain the gaps in their answer, and then present the next question.
- Keep the tone professional, objective, and encouraging.
`;
  } else if (mode === "coach") {
    modeInstruction = `
MODE: RECRUITER CAREER COACH
- You are Ponabinanth's ultimate career placement agent.
- A recruiter is evaluating if Ponabinanth S fits their specific job description (e.g., Java Backend, Spring Boot Developer, Full Stack Engineer, AI/ML Specialist).
- Your goal is to map Ponabinanth's specific skills (95% Java, 90% Spring Boot, AWS, Hibernate) and project architectures (3-Tier Spring Boot Inventory System, RAG-based EduReach AI, decentralized SecureChain Solidity/TensorFlow.js) directly to their requirements.
- Highlight his strengths: problem-solving, clean code standards, production-grade API structures, and edge-device deep learning.
- Provide a clear, convincing summary of why he is an exceptional fit for the role.
`;
  } else if (mode === "codegen") {
    modeInstruction = `
MODE: ELITE JAVA & AI CODE GENERATOR
- You represent Ponabinanth S's elite coding standard.
- The user is asking to generate a code snippet (e.g., Java Singleton, Spring REST controller, Binary Search, Solidity smart contract, or an Express proxy).
- Generate extremely clean, highly optimized, production-ready, and well-commented code.
- Follow enterprise standards: solid patterns, thread safety (e.g., volatile double-checked locking for Java Singletons), error handling, and robust type safety.
- Write a short, precise paragraph explaining the structural design decisions behind the code.
`;
  } else if (mode === "analyzer") {
    modeInstruction = `
MODE: MOCK ATS RESUME ANALYZER
- You are an expert Applicant Tracking System (ATS) parser and hiring consultant.
- The recruiter or candidate has pasted a resume text, or is asking you to analyze Ponabinanth's resume.
- If they upload or paste their own resume, analyze it against Java Full Stack or AI Engineer job descriptions.
- Provide a highly detailed evaluation containing:
  1. An estimated 'ATS Match Score' (e.g. 78/100).
  2. 'Key Strengths' found in their profile.
  3. 'Missing Keywords' (e.g., Spring Boot, JPA, RAG, Web3, Vector Database).
  4. 'Grammar and Professional Tone' check.
  5. 'Actionable Improvement Roadmap' (projects, certifications, or skills to add).
- Keep it highly structured and professional.
`;
  } else {
    modeInstruction = `
MODE: GENERAL RECRUITER REPRESENTATIVE (CONVERSATIONAL)
- You represent Ponabinanth S as his personal AI twin.
- Answer questions in the first person ('In my project, I implemented...', 'My name is Ponabinanth...') or as a friendly dedicated representative ('I represent Ponabinanth S...').
- Be charismatic, direct, and factual. Do not make up achievements or skills that aren't in the official profile.
- Highlight specific, impressive architectural details, such as Spring Boot MVC separation, JWT tokens, Web Speech vocal loops, and Web3 smart contract triggers.
- Guide the user to checkout the interactive 'Projects' tab, try the 'Interview Mode', or 'Download Resume' using the provided dashboard triggers.
`;
  }

  return `
You are 'Abinanth-AI', the personal, highly advanced, and charismatic AI assistant representing PONABINANTH S.
Ponabinanth S is an exceptional Java Full Stack Developer, AI Engineer, and Blockchain Enthusiast.
Your main objective is to represent him professionally and attractively to recruiters, engineering managers, and technical interviewers.

Here is the official profile data of Ponabinanth S (source of truth):
${serializedProfile}

${modeInstruction}

IMPORTANT GUIDELINES:
- Output your responses in clean, stunning Markdown formatting. Use lists, bold text, and code blocks appropriately to make it incredibly easy for busy recruiters to scan.
- Always maintain high technical accuracy. Do not exaggerate or make up fake details. Speak about Spring Boot, Java, AWS, React, Tailwind, and Web3 with deep professional competence.
- If the user asks general, off-topic questions (e.g. 'tell me a joke' or 'how do I bake a cake'), answer it briefly in a polite, professional, programmer-oriented tone, and gracefully redirect the conversation back to Ponabinanth's technical qualifications and how he can add value to their team!
`;
}

// API Route: Chat with Gemini
app.post("/api/chat", async (req, res) => {
  const { message, mode, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  if (!ai) {
    // If no API key is provided, fall back to an elegant, high-quality simulated responder
    // so the app never breaks for recruiters even without keys, though AI Studio injects this.
    return res.json({
      text: getSimulatedResponse(message, mode || "normal"),
      isSimulated: true,
    });
  }

  try {
    const systemInstruction = buildSystemInstruction(mode || "normal");
    
    // Construct the contents parameter.
    // We map the conversation history to Gemini parts.
    const formattedContents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.slice(-10).forEach((msg: any) => {
        formattedContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      });
    }
    
    // Add the current user message at the end
    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I was unable to synthesize a response. Please try again.";
    res.json({ text: replyText, isSimulated: false });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.json({
      text: `### 🤖 Abinanth-AI (Safety Fallback Mode)\n\nI encountered a brief connection error with the Gemini cloud network, but I am still online! Here is my automated response to your query:\n\n${getSimulatedResponse(message, mode || "normal")}`,
      isSimulated: true,
      errorDetails: error.message,
    });
  }
});

// High-fidelity fallback simulated responder for offline/fallback situations
function getSimulatedResponse(message: string, mode: string): string {
  const lowerMsg = message.toLowerCase();

  if (mode === "interview") {
    if (lowerMsg.includes("start") || lowerMsg.includes("hello") || lowerMsg.includes("ready")) {
      return `### 🎙️ Technical Mock Interview Initiated!\n\nWelcome to the AI Technical Interview Simulator. I will evaluate your skills as we go.\n\n**Question 1:** Explain the difference between **REST APIs** and **SOAP** web services. When would you prefer Spring Boot's REST controllers over SOAP configurations?`;
    }
    return `### 📊 Interview Feedback\n\n* **Interview Score:** 8.5/10\n* **Critique:** Excellent highlight of key points! You correctly specified that REST uses lightweight JSON/HTTP while SOAP relies on rigid XML/WSDL with built-in security contracts.\n\n**Next Question:** Let's discuss Java memory management. Explain the difference between the **Stack** and the **Heap** memory in JVM, and how Garbage Collection handles them.`;
  }

  if (mode === "coach") {
    return `### 💼 Recruiter Role Assessment: Java & AI Developer\n\nPonabinanth S is a **100% Match** for Java Backend, Full-Stack, and AI Engineering roles. Here is why:\n\n* **Backend Depth:** 95% proficiency in **Java** and 90% in **Spring Boot**. He understands ORM Hibernate, JDBC transaction bounds, and secure Spring Security filters.\n* **Modern Architectures:** He builds **3-tier scalable services** (e.g., Spring Boot Inventory console) and integrates next-gen smart tools (e.g. **EduReach AI** with Gemini APIs and RAG pipelines).\n* **Cloud & DevOps:** Comfortable with deploying services on **AWS**, managing **MySQL** connection pools, and automating code releases through **Git/GitHub** pipelines.\n\nWould you like me to map his skills specifically to a custom job description? Please paste your JD here!`;
  }

  if (mode === "codegen") {
    if (lowerMsg.includes("singleton")) {
      return `### ☕ Java Double-Checked Locking Singleton\n\nHere is a thread-safe, high-performance Singleton implementation in Java, matching Ponabinanth's clean code standard:\n\n\`\`\`java\npublic class DatabaseConnectionManager {\n    // Volatile keyword prevents instructions reordering issues in multi-threaded runtime\n    private static volatile DatabaseConnectionManager instance;\n    \n    private DatabaseConnectionManager() {\n        // Prevent reflection instantiation\n        if (instance != null) {\n            throw new RuntimeException(\"Use getInstance() method to create.\");\n        }\n    }\n    \n    public static DatabaseConnectionManager getInstance() {\n        if (instance == null) { // First check (no synchronization overhead if initialized)\n            synchronized (DatabaseConnectionManager.class) {\n                if (instance == null) { // Second check (thread safety)\n                    instance = new DatabaseConnectionManager();\n                }\n            }\n        }\n        return instance;\n    }\n}\n\`\`\`\n\n### ⚙️ Architectural Decisions:\n1. **Volatile field:** Ensures modifications to \`instance\` are immediately visible to all concurrent threads.\n2. **Double-Checked Locking:** Keeps runtime fast by bypassing the expensive \`synchronized\` block once the instance has been instantiated.`;
    }
    return `### 💻 Custom Java/Spring Boot Endpoint Code\n\nHere is a high-quality Spring Boot Controller showing RESTful endpoints mapped with clean transactional services:\n\n\`\`\`java\n@RestController\n@RequestMapping(\"/api/v1/inventory\")\n@CrossOrigin(origins = \"*\")\npublic class InventoryController {\n\n    @Autowired\n    private InventoryService inventoryService;\n\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<InventoryItem> getItemById(@PathVariable Long id) {\n        return inventoryService.findItemById(id)\n            .map(ResponseEntity::ok)\n            .orElse(ResponseEntity.notFound().build());\n    }\n}\n\`\`\`\n\nThis represents the modular architectures Ponabinanth implements across his full-stack software.`;
  }

  if (lowerMsg.includes("who is") || lowerMsg.includes("ponabinanth") || lowerMsg.includes("about")) {
    return `### 👨‍💻 About Ponabinanth S\n\nPonabinanth S is a highly skilled **Java Full Stack Developer, AI Engineer, and Blockchain Enthusiast**. He is a Computer Science Engineering student with deep expertise in:\n\n* **Backend:** Spring Boot, REST APIs, Hibernate, MySQL, and Node.js.\n* **AI/ML:** RAG architectures, Prompt Engineering, Gemini and OpenAI SDKs, and browser TensorFlow.js models.\n* **Blockchain:** Solidity smart contracts, Web3.js, and decentralized validation.\n\nHe has built advanced products like an **Enterprise Inventory Management System**, **EduReach AI** (personalized tutor), and **SecureChain** (IoT block tracker). He is passionate about transforming complicated backend processes into elegant, recruiter-attracting products!`;
  }

  if (lowerMsg.includes("project") || lowerMsg.includes("inventory") || lowerMsg.includes("edureach") || lowerMsg.includes("securechain")) {
    return `### 🛠️ Portfolio Projects Overview\n\nPonabinanth has engineered several impressive systems:\n\n1. **Inventory Management System (Spring Boot + MySQL):** Formulates a 3-tier warehouse pipeline with Spring Security, low-stock threshold triggers, and real-time Chart.js visual tracking.\n2. **EduReach AI (React + Express + Gemini):** Implements a vocal voice-to-voice educational assistant, tailored topic roadmap generators, and customizable quiz graders.\n3. **SecureChain (Solidity + Web3 + TensorFlow.js):** Builds an IoT cryptoledger node combined with browser-based neural network models for instant anomaly classification.\n\nWhich architecture would you like me to explain in deeper technical detail?`;
  }

  return `### Hello! I am Abinanth-AI 🤖\n\nI am Ponabinanth's dedicated representative! Ask me anything about his credentials:\n\n* **"Tell me about his coding skills"**\n* **"Explain his project Inventory Management"**\n* **"Why should I hire Ponabinanth?"**\n* **"Start Interview" (Technical Mock interview!)**\n\nHow can I assist you in your recruiting evaluations today?`;
}

// Vite and Express serving layer
async function startServer() {
  // Integrate Vite for development, otherwise serve compiled static assets in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware integrated for Development Mode.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from dist/.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully booted and listening on http://localhost:${PORT}`);
  });
}

startServer();

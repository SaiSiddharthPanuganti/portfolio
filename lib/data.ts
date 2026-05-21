export const personalInfo = {
  name: "Sai Siddharth Panuganti",
  tagline: "portfolio · 2026 · open to internships",
  subHeadline: "ML builder · Full-stack developer · Problem solver",
  location: "Hyderabad, India",
  email: "saisiddharthpanuganti@gmail.com",
  phone: "+91 6301727634",
  linkedin: "https://www.linkedin.com/in/sai-siddharth-panuganti-b2b365270/",
  dribbble: "#",
  github: "https://github.com/SaiSiddharthPanuganti",
  resumeHref: "/Sai_Siddharth_Resume.pdf",
};

export const heroWords = [
  { word: "I", original: "I", className: "w1" },
  { word: "build", original: "build", className: "w2" },
  { word: "products", original: "products", className: "w3", lineBreak: true },
  { word: "that", original: "that", className: "w4" },
  { word: "detect", original: "detect", className: "w5" },
  { word: "predict", original: "predict", className: "w7", lineBreak: true },
  { word: "and", original: "and", className: "w8" },
  { word: "ship", original: "ship", className: "w6" },
  { word: "fast", original: "fast", className: "w9", lineBreak: true },
  { word: "with", original: "with", className: "w10" },
  { word: "real", original: "real", className: "w11" },
  { word: "impact", original: "impact", className: "w12" },
];

export const selectedWork = [
  {
    num: "01",
    tag: "Computer Vision · 2025",
    title: "Oil Spill Detection (DeepHyperX)",
    description: "Implemented an end-to-end oil spill identification model using a 3D convolutional framework (DeepHyperX) on hyperspectral and SAR imagery.",
    bullets: [
      "Enabled reliable detection across hyperspectral and SAR imagery with a 96% accuracy rate.",
      "Leveraged PCA to compress spectral information, isolating the 10 most influential wavelengths to achieve a 15% classification improvement.",
      "Derived spill boundaries using fine-grained contour extraction and region-based volumetric analysis."
    ],
    tags: ["Python", "DeepHyperX", "PCA", "OpenCV", "Machine Learning"],
    metric: "96% accuracy",
    link: "https://github.com/SaiSiddharthPanuganti/oilspill-dualpipeline",
  },
  {
    num: "02",
    tag: "Detection Systems · 2025",
    title: "Real-time Object Detection (YOLOv8)",
    description: "Fine-tuned YOLOv8 Nano on PASCAL VOC 2007 and engineered a real-time inference engine.",
    bullets: [
      "Automated a data pipeline to parse 15,000+ XML annotations and normalize coordinates using Pandas.",
      "Achieved 74.4% mAP50 across 20 classes using fine-tuned YOLOv8 Nano.",
      "Developed a real-time inference engine using OpenCV for live webcam and video detection."
    ],
    tags: ["Python", "YOLOv8", "Pandas", "OpenCV", "Dataset Pipeline"],
    metric: "74.4 mAP50",
    link: "https://github.com/SaiSiddharthPanuganti/Object-detection-using-yolov8",
  },
  {
    num: "03",
    tag: "MERN + GenAI · 2025",
    title: "Clips N Quizzez",
    description: "Built an automated quiz generator that extracts YouTube transcripts and generates interactive quizzes with adaptive difficulty.",
    bullets: [
      "Extracted YouTube transcripts and generated quizzes using Gemini API, drastically reducing manual creation time.",
      "Automated multiple question formats including MCQs, true/false, and fill-in-the-blanks.",
      "Enhanced user personalization by enabling adjustable difficulty levels."
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API"],
    metric: "Interactive AI Quizzes",
    link: "https://github.com/SaiSiddharthPanuganti/VQuiz",
  },
];

export const techCategories = [
  {
    category: "Programming Languages",
    bgClass: "bg-ink text-paper",
    items: [
      { name: "Python", color: "#4b8bbe" },
      { name: "Java", color: "#f89820" },
      { name: "C", color: "#a8b9cc" },
      { name: "JavaScript", color: "#f7df1e" },
      { name: "SQL", color: "#336791" },
    ],
  },
  {
    category: "Tools & Applied Tech",
    bgClass: "bg-green text-paper-light",
    items: [
      { name: "Machine Learning", color: "#ff4154" },
      { name: "Gen AI", color: "#10a37f" },
      { name: "RAG", color: "#8e24aa" },
      { name: "Vector DBs", color: "#00897b" },
      { name: "Jupyter Notebook", color: "#f37626" },
      { name: "Git", color: "#f05032" },
    ],
  },
  {
    category: "Web Development",
    bgClass: "bg-red text-paper-dark",
    items: [
      { name: "Next.js", color: "#000000" },
      { name: "React.js", color: "#61dafb" },
      { name: "Node.js", color: "#3c873a" },
      { name: "Express.js", color: "#2d2d2d" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "MongoDB", color: "#4db33d" },
      { name: "MySQL", color: "#00758f" },
      { name: "REST APIs", color: "#00bcd4" },
    ],
  },
  {
    category: "Core Competencies",
    bgClass: "bg-navy text-paper-light",
    items: [
      { name: "DSA", color: "#e91e63" },
      { name: "OOP", color: "#9c27b0" },
      { name: "Operating Systems", color: "#673ab7" },
      { name: "Computer Networks", color: "#3f51b5" },
      { name: "Excel", color: "#107c41" },
      { name: "PowerPoint", color: "#d83b01" },
      { name: "Word", color: "#0078d4" },
    ],
  },
];

export const aboutContent = {
  highlight: "Top 1% in NPTEL Java (Elite + Gold)",
  body1: "I enjoy building intelligent systems that move from research to usable products.",
  highlight2: "Winner / Runner-up at national project events",
  body2: "From computer vision models to full-stack builds, I focus on measurable outcomes and fast iteration.",
  highlight3: "Deputy Head, DSAC Web Dev Club",
  body3: "I lead peer learning sessions on HTML, CSS, JavaScript, MERN, and open-source collaboration.",
};

export const footerMessage = [
  "© 2026 Sai Siddharth Panuganti · All rights reserved",
  "Built with: Next.js 14 · Tailwind · Framer Motion · Canvas Cursor · R3F",
  "Hyderabad, India · UTC+5:30",
];

export const quickStats = [
  { label: "B.E. CGPA", value: "8.37 / 10" },
  { label: "Diploma CGPA", value: "9.77 / 10" },
  { label: "Dataset Scale", value: "15k+ Samples" },
  { label: "Leadership", value: "Deputy Club Head" },
];

export const achievements = [
  "NPTEL Programming in Java — Elite + Gold (Top 1% among 16,000+ learners)",
  "1st Place — Tech Savishkar 3.0 (Outperforming national-level teams)",
  "Runner-up — RUDEO Project Expo 2025 (Recognized for technical excellence)",
  "Runner-up — InnovateX IEEE Hackathon 2025 (High-impact humanitarian solution)",
];

export const education = [
  {
    degree: "Bachelor of Engineering in Information Technology",
    institution: "Vasavi College of Engineering",
    period: "2024 - 2027 (Expected)",
    metric: "CGPA: 8.37 / 10",
    details: "Focusing on data structures, algorithms, object-oriented programming, operating systems, and computer networks."
  },
  {
    degree: "Diploma in Computer Science",
    institution: "Government Polytechnic Hyderabad",
    period: "2021 - 2024",
    metric: "CGPA: 9.77 / 10",
    details: "Laid strong foundational knowledge in programming paradigms, databases, and core computer science fundamentals."
  }
];

export const leadership = [
  {
    role: "Deputy Head",
    organization: "DSAC Web Dev Club",
    description: "Led club planning, coordination, and operations. Conducted hands-on bootcamps for 100+ students covering HTML, CSS, JavaScript, MERN stack, and open-source contribution practices.",
  },
  {
    role: "Team Lead",
    organization: "Tech Savishkar Hackathon",
    description: "Led a 5-member multidisciplinary engineering team to secure 1st place in the national-level hackathon. Structured task allocation, coordinated rapid development, and spearheaded the final winning pitch.",
  }
];

export interface Certification {
  title: string;
  issuer: string;
  issued: string;
  link: string;
}

export const ciscoCertifications: Certification[] = [
  {
    title: "Enterprise Networking, Security, & Automation",
    issuer: "Cisco",
    issued: "Apr 2026",
    link: "https://www.credly.com/earner/earned/badge/5756a86f-6c02-4770-aba9-63f4ff3bb237",
  },
  {
    title: "Switching, Routing, & Wireless Essentials",
    issuer: "Cisco",
    issued: "Apr 2026",
    link: "https://www.credly.com/earner/earned/badge/f033366b-5540-4ad4-8fdd-d842e78425b3",
  },
  {
    title: "Introduction to Networks",
    issuer: "Cisco",
    issued: "Dec 2024",
    link: "https://www.credly.com/earner/earned/badge/ed50ab47-5fd8-4a22-be00-a750534ce33d",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    issued: "Aug 2024",
    link: "https://www.credly.com/earner/earned/badge/9744fe4f-9664-4ff5-a718-1cf298a86d2b",
  },
];

export const googleCertifications: Certification[] = [
  {
    title: "Explore Generative AI with the Vertex AI Gemini API",
    issuer: "Google",
    issued: "May 2025",
    link: "https://www.credly.com/earner/earned/badge/f033366b-5540-4ad4-8fdd-d842e78425b3",
  },
  {
    title: "Inspect Rich Documents with Gemini Multimodality & Multimodal RAG",
    issuer: "Google",
    issued: "May 2025",
    link: "https://www.credly.com/earner/earned/badge/df638ea9-e5ec-4bb3-b578-761fdba114dd",
  },
  {
    title: "Develop GenAI Apps with Gemini and Streamlit",
    issuer: "Google",
    issued: "May 2025",
    link: "https://www.credly.com/earner/earned/badge/54727db5-bd16-4b2e-8ef1-357295a9e23c",
  },
  {
    title: "Build Real World AI Applications with Gemini and Imagen",
    issuer: "Google",
    issued: "May 2025",
    link: "https://www.credly.com/earner/earned/badge/52dfa7bb-6bf1-473d-aa68-2ad8b2acfa7e",
  },
  {
    title: "Prompt Design in Vertex AI",
    issuer: "Google",
    issued: "May 2025",
    link: "https://www.credly.com/earner/earned/badge/48a1350e-58eb-498b-8065-ef8088c79682",
  },
];


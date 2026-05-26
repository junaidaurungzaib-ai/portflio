export type NavItem = {
  id: string;
  label: string;
};

export type ResearchItem = {
  title: string;
  venue: string;
  abstract: string;
  tags: string[];
  image: string;
  imageAlt: string;
};

export type ProjectItem = {
  title: string;
  category: "Web Apps" | "AI/ML" | "Mobile";
  description: string;
  tech: string[];
  image: string;
  imageAlt: string;
  github?: string;
  demo?: string;
};

export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  details: string[];
  type: "experience" | "education" | "certification";
};

export const profile = {
  name: "Junaid Aurungzaib",
  headline:
    "Machine learning and computer vision focused software professional building reliable digital products, applied AI solutions, and secure user experiences.",
  location: "Islamabad, Pakistan",
  email: "junaidaurungzaib@gmail.com",
  phone: "+92-315-5159065",
  typingRoles: [
    "Machine Learning Developer",
    "Computer Vision Researcher",
    "Full-Stack Developer",
    "QA and Automation Specialist"
  ],
  careerGoal:
    "Seeking international opportunities in machine learning, computer vision, and software engineering to contribute to high-impact digital products and research-led teams."
};

export const navItems: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" }
];

export const researchItems: ResearchItem[] = [
  {
    title: "Optimized Brain Tumor Detection Using Machine Learning",
    venue: "Computer Vision Research Focus",
    abstract:
      "Research topic centered on improving brain tumor detection pipelines using machine learning and computer vision. The work emphasizes image preprocessing, model optimization, and clinically relevant classification accuracy.",
    tags: ["Machine Learning", "Computer Vision", "Medical Imaging", "Deep Learning"],
    image: "/brain-tumor.svg",
    imageAlt: "Brain imaging scan on a medical monitor"
  },
  {
    title: "Performance Testing for Fintech Applications",
    venue: "Industry Practice at Dartican",
    abstract:
      "Designed and executed performance and load-testing cycles for web systems, emphasizing bottleneck discovery, service stability under stress, and QA planning to support release confidence.",
    tags: ["Performance Testing", "JMeter", "Fintech", "QA"],
    image: "/fintech-dashboard.svg",
    imageAlt: "Modern financial dashboard analytics"
  },
  {
    title: "Data Integrity and Security Assurance",
    venue: "Production QA Operations",
    abstract:
      "Worked with SQL-driven checks and security-focused validation to maintain confidentiality, quality, and correctness of client and partner data in operational systems.",
    tags: ["Data Integrity", "SQL", "Security Testing", "Client Privacy"],
    image: "/code-workstation.svg",
    imageAlt: "Developer working with secure application dashboards"
  }
];

export const projectItems: ProjectItem[] = [
  {
    title: "Brain Tumor Detection Prototype",
    category: "AI/ML",
    description:
      "A machine-learning and computer-vision inspired prototype for medical image analysis, presented as a research-led direction aligned with the user's stated focus.",
    tech: ["Python", "TensorFlow", "OpenCV", "Computer Vision"],
    image: "/brain-tumor.svg",
    imageAlt: "Medical imaging scan on a monitor"
  },
  {
    title: "Fintech QA Automation and Validation",
    category: "Web Apps",
    description:
      "End-to-end QA lifecycle support for fintech web products, including bug reporting workflows, QA plans, UAT, and release-readiness tracking across agile teams.",
    tech: ["Postman", "Jira", "Azure DevOps", "Selenium", "Confluence"],
    image: "/fintech-dashboard.svg",
    imageAlt: "Analytics dashboard with product metrics"
  },
  {
    title: "Load and Stress Testing Suite",
    category: "AI/ML",
    description:
      "Performance testing initiative using open-source tooling to assess system behavior under load and identify critical reliability gaps before deployment.",
    tech: ["JMeter", "Performance Testing", "Monitoring", "Risk Analysis"],
    image: "/code-workstation.svg",
    imageAlt: "Software engineering workstation with code and dashboards"
  },
  {
    title: "WordPress and Full-Stack Client Solutions",
    category: "Web Apps",
    description:
      "Delivered front-end and back-end implementation work for client systems with a stack spanning WordPress, PHP, Python, and classic web technologies.",
    tech: ["WordPress", "HTML", "CSS", "JavaScript", "PHP", "Python"],
    image: "/code-workstation.svg",
    imageAlt: "Team collaborating on a web application"
  },
  {
    title: "Computer Lab Operations and Learning Systems",
    category: "Mobile",
    description:
      "Managed lab installations, taught programming-focused sessions, and supported practical computing education environments at university and school levels.",
    tech: ["Lab Management", "Programming Instruction", "Curriculum Support"],
    image: "/classroom-lab.svg",
    imageAlt: "Students and instructor in a computer lab"
  }
];

export const experienceItems: TimelineItem[] = [
  {
    title: "Lab Instructor",
    organization: "Federal Urdu University of Arts, Sciences and Technology",
    period: "Oct 2025 - Present",
    details: ["Teaching lab classes", "Managing lab installations"],
    type: "experience"
  },
  {
    title: "Lecturer Computer",
    organization: "Dare Arqam Schools",
    period: "Mar 2023 - Present",
    details: ["Computer lectures", "Evening coaching classes"],
    type: "experience"
  },
  {
    title: "SQA Engineer",
    organization: "Dartican",
    period: "Jun 2023 - Aug 2024",
    details: [
      "Bug identification and reporting",
      "Security, functional, performance and UAT testing",
      "SQL-based data quality checks and monthly project reporting",
      "Agile collaboration and Azure team management"
    ],
    type: "experience"
  },
  {
    title: "Software Developer",
    organization: "Master Mind Technologies",
    period: "Dec 2019 - Jan 2021",
    details: [
      "WordPress development",
      "Front-end design with HTML/CSS/JavaScript",
      "Back-end development with PHP and Python"
    ],
    type: "experience"
  },
  {
    title: "Software Developer",
    organization: "Master Mind Technologies",
    period: "Dec 2019 - Jan 2021",
    details: [
      "WordPress development",
      "Front-end design with HTML/CSS/JavaScript",
      "Back-end development with PHP and Python"
    ],
    type: "experience"
  },
];

export const educationItems: TimelineItem[] = [
  {
    title: "MS Computer Science",
    organization: "Abasyn University Islamabad",
    period: "2023 - Present",
    details: ["Graduate studies in computer science"],
    type: "education"
  },
  {
    title: "BS Computer Science",
    organization: "PMAS Arid Agricultural University Rawalpindi",
    period: "2016 - 2020",
    details: ["Undergraduate studies in computer science"],
    type: "education"
  },
  {
    title: "DAE Telecomm",
    organization: "Prince Salman Institute of Technology",
    period: "2012 - 2015",
    details: ["Diploma in telecommunications"],
    type: "education"
  },
  {
    title: "Matric Science",
    organization: "Sultana Foundation BHS",
    period: "2010 - 2012",
    details: ["Science foundation studies"],
    type: "education"
  }
];

export const certificationItems: TimelineItem[] = [
  {
    title: "Machine Learning/Deep Learning Certification",
    organization: "Air University",
    period: "Completed",
    details: ["Applied ML and deep learning foundations"],
    type: "certification"
  },
  {
    title: "Oracle Development Certification",
    organization: "Master Mind Technologies",
    period: "Completed",
    details: ["Oracle development training and practice"],
    type: "certification"
  }
];

export const skillCloud = [
  "TensorFlow",
  "PyTorch",
  "Keras",
  "Selenium",
  "Postman",
  "JMeter",
  "Azure DevOps",
  "Jira",
  "Confluence",
  "PL-SQL",
  "Critical Thinking",
  "Stakeholder Management"
];

export const honorItems = [
  {
    title: "Attending International WHO Conference",
    organization: "World Health Organization",
    period: "2021",
    image: "/honor-and-rewards/who-conference.jpg",
    description:
      "Attended the WHO international conference on global health, pandemic preparedness, and cross-border public health collaboration.",
    details: [
      "Certificate of attendance from WHO",
      "Topics covered: pandemic response, health systems, international cooperation"
    ] 
  },
  {
    title: "Participation in Brain Storming Session",
    organization: "Youth Leadership Forum",
    period: "2021",
    image: "/honor-and-rewards/brainstorming-session.jpg",
    description:
      "Participated in a brainstorming conference focused on creative problem solving, teamwork, and innovation strategy.",
    details: [
      "Workshop on idea generation and collaborative solutions",
      "Recognized for active participation and leadership"
    ]
  },
  {
    title: "Participation in How to Overcome Anxiety in Youth",
    organization: "Mental Wellness Conference",
    period: "2022",
    image: "/honor-and-rewards/anxiety-youth-conference.jpg",
    description:
      "Attended a conference on youth mental health, anxiety management, and wellbeing strategies.",
    details: [
      "Learned practical techniques for anxiety reduction",
      "Certificate of participation in youth mental health awareness"
    ]
  },
  {
    title: "1st Prize in Rise Award",
    organization: "Rise Awards",
    period: "2021",
    image: "/honor-and-rewards/rise-award-1st-prize.jpg",
    description:
      "Awarded first prize in the Rise Award competition for outstanding achievement and innovation.",
    details: [
      "First-place winner for professional excellence",
      "Recognized for high-impact project delivery"
    ]
  },
  {
    title: "First Aid Training Certificate",
    organization: "First Aid Training Institute",
    period: "2015",
    image: "/honor-and-rewards/first-aid-training.jpg",
    description:
      "Completed certified first aid training including CPR, wound care, and emergency response.",
    details: [
      "Practical first aid and emergency preparedness training",
      "Certified to provide immediate care in urgent situations"
    ]
    
  }
];

// Content model — extracted from King Owusu's resume and restructured into
// a narrative rather than a literal transcription of resume sections.

export const profile = {
  name: "King Owusu",
  initials: "KO",
  roles: [
    "IT Support Specialist",
    "Cybersecurity Analyst",
    "AI Practitioner",
    "Systems Builder",
  ],
  location: "Houston, TX",
  origin: "Kumasi, Ghana",
  email: "owusuking401@gmail.com",
  phone: "+1 713 875 2432",
  resumeFile: "King_Owusu_Resume.pdf",
  socials: {
    github: "https://github.com/owusu-king",
    linkedin: "https://www.linkedin.com/in/kingowusu/",
    email: "mailto:owusuking401@gmail.com",
  },
  tagline:
    "I keep systems running, and keep them safe while they do it.",
  summary: [
    "My path into technology didn't start in a classroom in the U.S. — it started in Kumasi, Ghana, managing an e-commerce site and troubleshooting hardware for a small company, one support ticket at a time.",
    "That hands-on instinct followed me to Houston, where I traded plugin audits for packet captures — hardening Windows systems, studying intrusion detection, and eventually standing on a state stage as SkillsUSA's Texas Cybersecurity Champion.",
    "Today I'm extending that foundation into artificial intelligence — pairing a security-first mindset with the tools to build and defend the systems of what's next.",
  ],
};

export const stats = [
  { label: "CGPA", value: "4.6", suffix: "/5.0", note: "Computer Science, HND" },
  { label: "CyberStart Score", value: "21,000", suffix: "+", note: "capture-the-flag points" },
  { label: "Community Service", value: "250", suffix: "+ hrs", note: "U.S. Dept. of State program" },
  { label: "State Title", value: "1st", suffix: "", note: "SkillsUSA TX, Cybersecurity" },
];

export const experience = [
  {
    id: "archrock",
    role: "Technical Support Intern",
    company: "Archrock",
    location: "Houston, TX",
    period: "Dec 2022 — May 2023",
    summary:
      "Kept a fleet of end-user systems provisioned, patched, and ticket-free — while turning support data into decisions.",
    points: [
      "Imaged and configured new computer systems for incoming users, following organizational security policy end to end.",
      "Resolved user issues through the company ticketing system, maintaining response and closure standards.",
      "Built weekly operational reports in Microsoft Power BI, turning raw ticket data into visibility for the team.",
    ],
    tech: ["Windows Imaging", "Power BI", "Ticketing Systems", "IT Policy"],
  },
  {
    id: "peadato",
    role: "Customer Support & WordPress Developer",
    company: "Peadato Limited Company",
    location: "Kumasi, Ghana",
    period: "Aug 2020 — Jul 2022",
    summary:
      "Owned an e-commerce platform end to end — from the code and plugins to the people using it.",
    points: [
      "Developed and managed the company's e-commerce website on WordPress.",
      "Audited user privileges, plugins, and security configurations to reduce exposure.",
      "Resolved customer-facing technical issues and managed hardware and inventory troubleshooting.",
    ],
    tech: ["WordPress", "Web Security", "E-Commerce", "Hardware Support"],
  },
];

export const education = [
  {
    id: "hcc-ai",
    degree: "A.A.S., Artificial Intelligence",
    school: "Houston Community College",
    location: "Houston, TX",
    period: "Dec 2024 — Present",
    detail: "Computer vision, deep learning, applied data science, and AI as applied to cybersecurity.",
  },
  {
    id: "hcc-cyber",
    degree: "Certificate Level 1, Cybersecurity",
    school: "Houston Community College",
    location: "Houston, TX",
    period: "Jul 2022 — May 2023",
    detail: "Windows Server 2016 administration, CompTIA security labs, Cisco Packet Tracer networking, and digital forensics.",
  },
  {
    id: "ktu",
    degree: "Higher National Diploma, Computer Science",
    school: "Kumasi Technical University",
    location: "Kumasi, Ghana",
    period: "Dec 2020 — Sep 2024",
    detail: "CGPA 4.6/5.0 — programming in Python, Java, and JavaScript; database administration; web development.",
  },
  {
    id: "lister",
    degree: "WAEC Advanced Business Certificate, Information Technology",
    school: "Lister Professional Institute",
    location: "Kumasi, Ghana",
    period: "Jul 2022 — May 2023",
    detail: "Foundational IT, hardware and networking, and information systems.",
  },
];

export const skills = [
  {
    category: "Security",
    items: ["Intrusion Detection", "Firewalls & Networking", "Windows Server Hardening", "Risk Assessment", "Digital Forensics"],
  },
  {
    category: "Programming",
    items: ["Python", "Java", "JavaScript", "Django / DRF"],
  },
  {
    category: "Web & Platforms",
    items: ["HTML", "CSS", "WordPress", "REST APIs"],
  },
  {
    category: "Data & Infrastructure",
    items: ["MySQL", "PostgreSQL", "MS Access", "Power BI"],
  },
  {
    category: "Tools",
    items: ["Git", "Linux", "Cisco Packet Tracer", "CompTIA Labs"],
  },
  {
    category: "AI (in progress)",
    items: ["Computer Vision", "Deep Learning", "Data Science", "AI for Security"],
  },
];

export const projects = [
  {
    id: "poultry",
    title: "Electronic Poultry Management System",
    year: "2024",
    description:
      "A web-based farm management platform that replaced paper logs with automated tracking for inventory, feeding schedules, and flock health.",
    challenge:
      "Small-scale poultry operations were tracking inventory and health data manually, causing missed feeding cycles and delayed health interventions.",
    outcome:
      "Automated scheduling and RESTful data flows gave operators real-time visibility, cutting manual record-keeping and catching health issues earlier.",
    tech: ["Django", "Python", "Django REST Framework", "ORM", "HTML/CSS/JS"],
    links: { github: "#", demo: "#" },
  },
  {
    id: "labmanual",
    title: "Web-Based Student Lab Manual",
    year: "2023",
    description:
      "An online platform where students access lab manuals, submit reports, and track their own lab activity — replacing a paper-based workflow.",
    challenge:
      "Lab manuals and report submissions were fragmented across paper and email, making it hard for students and instructors to track progress.",
    outcome:
      "Centralized access and submission through a single platform, with secure REST APIs handling data exchange between students and staff.",
    tech: ["Django", "Python", "Django REST Framework", "ORM", "HTML/CSS/JS"],
    links: { github: "#", demo: "#" },
  },
];

export const certifications = [
  {
    name: "GIAC Foundational Cybersecurity Technologies",
    provider: "Global Information Assurance Certification",
    date: "Aug 2023",
  },
  {
    name: "CompTIA Security+",
    provider: "CompTIA",
    date: "Apr 2023",
  },
  {
    name: "Google IT Support Specialization",
    provider: "Coursera",
    date: "Oct 2020",
  },
  {
    name: "Google IT Automation with Python",
    provider: "Coursera",
    date: "Jan 2021",
  },
  {
    name: "Open-Source Development, Linux and Git",
    provider: "Coursera",
    date: "Jan 2021",
  },
];

export const awards = [
  {
    title: "SkillsUSA Texas State Champion — Cybersecurity",
    date: "Mar 2023",
    detail: "Hardened a Windows VM against live attack scenarios, answered 70 CompTIA Security+ domain questions, and completed 16-bit subnetting — qualifying for the national contest.",
  },
  {
    title: "CyberStart Competition Scholar Award",
    date: "Feb 2023",
    detail: "Scored 21,000+ points across capture-the-flag challenges, earning $3,000+ in GIAC resources and a SANS Scholar badge.",
  },
  {
    title: "Community College Initiative Program Award",
    date: "May 2023",
    detail: "Selected by the U.S. Department of State for a leadership and cultural exchange program; completed a community project, \"Don't Be Hacked,\" and 250+ volunteer hours while maintaining a 4.0 GPA.",
  },
  {
    title: "Phi Theta Kappa Honor Society",
    date: "2023",
    detail: "Inducted into the National Society of Collegiate Students in recognition of academic standing.",
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

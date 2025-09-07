const mongoose = require("mongoose");
require("dotenv").config();
const Roadmap = require("../Models/Raodmap");

const sampleRoadmaps = [
  {
    title: "Frontend Developer",
    description:
      "A complete roadmap to becoming a frontend developer, covering HTML, CSS, JavaScript, and modern frameworks.",
    category: "Frontend",
    difficulty: "Beginner",
    estimatedTime: "6-8 months",
    color: "#61dafb",
    icon: "🎨",
    isPublished: true,
    steps: [
      {
        id: "html-basics",
        title: "HTML Basics",
        description:
          "Learn the fundamentals of HTML structure, elements, and semantic markup.",
        resources: [
          {
            title: "MDN HTML Guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
            type: "documentation",
          },
          {
            title: "HTML Crash Course",
            url: "https://www.youtube.com/watch?v=qz0aGYrrlhU",
            type: "video",
          },
        ],
        prerequisites: [],
        estimatedTime: "2 weeks",
        difficulty: "Easy",
        position: { x: 50, y: 100 },
        connections: ["css-basics"],
      },
      {
        id: "css-basics",
        title: "CSS Fundamentals",
        description:
          "Master CSS styling, layout, and responsive design principles.",
        resources: [
          {
            title: "CSS Complete Guide",
            url: "https://css-tricks.com/",
            type: "article",
          },
          {
            title: "Flexbox Froggy",
            url: "https://flexboxfroggy.com/",
            type: "course",
          },
        ],
        prerequisites: ["html-basics"],
        estimatedTime: "3 weeks",
        difficulty: "Easy",
        position: { x: 250, y: 100 },
        connections: ["javascript-basics", "responsive-design"],
      },
      {
        id: "javascript-basics",
        title: "JavaScript Fundamentals",
        description:
          "Learn JavaScript syntax, data types, functions, and DOM manipulation.",
        resources: [
          {
            title: "JavaScript.info",
            url: "https://javascript.info/",
            type: "documentation",
          },
          {
            title: "Eloquent JavaScript",
            url: "https://eloquentjavascript.net/",
            type: "book",
          },
        ],
        prerequisites: ["css-basics"],
        estimatedTime: "4 weeks",
        difficulty: "Medium",
        position: { x: 450, y: 100 },
        connections: ["react-basics", "node-basics"],
      },
      {
        id: "responsive-design",
        title: "Responsive Design",
        description:
          "Learn to create mobile-friendly websites using CSS Grid and Flexbox.",
        resources: [
          {
            title: "CSS Grid Guide",
            url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
            type: "article",
          },
          {
            title: "Responsive Design Patterns",
            url: "https://bradfrost.com/blog/web/responsive-design-patterns/",
            type: "article",
          },
        ],
        prerequisites: ["css-basics"],
        estimatedTime: "2 weeks",
        difficulty: "Medium",
        position: { x: 250, y: 250 },
        connections: ["react-basics"],
      },
      {
        id: "react-basics",
        title: "React Fundamentals",
        description: "Learn React components, state management, and hooks.",
        resources: [
          {
            title: "React Official Tutorial",
            url: "https://react.dev/learn",
            type: "documentation",
          },
          {
            title: "React Course",
            url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
            type: "video",
          },
        ],
        prerequisites: ["javascript-basics", "responsive-design"],
        estimatedTime: "4 weeks",
        difficulty: "Medium",
        position: { x: 450, y: 250 },
        connections: ["state-management", "testing"],
      },
      {
        id: "state-management",
        title: "State Management",
        description:
          "Learn Redux, Context API, and other state management solutions.",
        resources: [
          {
            title: "Redux Toolkit Guide",
            url: "https://redux-toolkit.js.org/",
            type: "documentation",
          },
          {
            title: "Context API Tutorial",
            url: "https://react.dev/learn/passing-data-deeply-with-context",
            type: "documentation",
          },
        ],
        prerequisites: ["react-basics"],
        estimatedTime: "3 weeks",
        difficulty: "Hard",
        position: { x: 650, y: 250 },
        connections: ["testing", "build-tools"],
      },
      {
        id: "testing",
        title: "Testing",
        description:
          "Learn Jest, React Testing Library, and testing best practices.",
        resources: [
          {
            title: "Testing Library Docs",
            url: "https://testing-library.com/docs/react-testing-library/intro/",
            type: "documentation",
          },
          {
            title: "Jest Testing Guide",
            url: "https://jestjs.io/docs/getting-started",
            type: "documentation",
          },
        ],
        prerequisites: ["react-basics"],
        estimatedTime: "2 weeks",
        difficulty: "Medium",
        position: { x: 450, y: 400 },
        connections: ["build-tools"],
      },
      {
        id: "build-tools",
        title: "Build Tools",
        description: "Learn Webpack, Vite, and modern build processes.",
        resources: [
          {
            title: "Vite Guide",
            url: "https://vitejs.dev/guide/",
            type: "documentation",
          },
          {
            title: "Webpack Tutorial",
            url: "https://webpack.js.org/concepts/",
            type: "documentation",
          },
        ],
        prerequisites: ["state-management", "testing"],
        estimatedTime: "2 weeks",
        difficulty: "Hard",
        position: { x: 650, y: 400 },
        connections: [],
      },
    ],
    metadata: {
      lastUpdated: new Date(),
      version: "1.0.0",
      contributors: ["System"],
    },
  },
  {
    title: "Backend Developer",
    description:
      "Complete roadmap for backend development covering Node.js, databases, APIs, and deployment.",
    category: "Backend",
    difficulty: "Intermediate",
    estimatedTime: "8-10 months",
    color: "#68d391",
    icon: "⚙️",
    isPublished: true,
    steps: [
      {
        id: "node-basics",
        title: "Node.js Basics",
        description: "Learn Node.js fundamentals, modules, and npm ecosystem.",
        resources: [
          {
            title: "Node.js Official Docs",
            url: "https://nodejs.org/en/docs/",
            type: "documentation",
          },
          {
            title: "Node.js Course",
            url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
            type: "video",
          },
        ],
        prerequisites: [],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 50, y: 100 },
        connections: ["express-basics"],
      },
      {
        id: "express-basics",
        title: "Express.js",
        description:
          "Learn Express.js framework for building web APIs and applications.",
        resources: [
          {
            title: "Express.js Guide",
            url: "https://expressjs.com/",
            type: "documentation",
          },
          {
            title: "Express Tutorial",
            url: "https://www.youtube.com/watch?v=L72fhGm1tfE",
            type: "video",
          },
        ],
        prerequisites: ["node-basics"],
        estimatedTime: "2 weeks",
        difficulty: "Easy",
        position: { x: 250, y: 100 },
        connections: ["database-basics", "api-design"],
      },
      {
        id: "database-basics",
        title: "Database Fundamentals",
        description: "Learn SQL, database design, and ORM concepts.",
        resources: [
          {
            title: "SQL Tutorial",
            url: "https://www.w3schools.com/sql/",
            type: "course",
          },
          {
            title: "Database Design",
            url: "https://www.lucidchart.com/pages/database-diagram/database-design",
            type: "article",
          },
        ],
        prerequisites: ["express-basics"],
        estimatedTime: "4 weeks",
        difficulty: "Medium",
        position: { x: 450, y: 100 },
        connections: ["mongodb", "postgresql"],
      },
      {
        id: "api-design",
        title: "API Design",
        description: "Learn RESTful API design principles and best practices.",
        resources: [
          {
            title: "REST API Guide",
            url: "https://restfulapi.net/",
            type: "article",
          },
          {
            title: "API Design Patterns",
            url: "https://www.youtube.com/watch?v=7YcW25PHnAA",
            type: "video",
          },
        ],
        prerequisites: ["express-basics"],
        estimatedTime: "2 weeks",
        difficulty: "Medium",
        position: { x: 250, y: 250 },
        connections: ["authentication"],
      },
      {
        id: "mongodb",
        title: "MongoDB",
        description: "Learn NoSQL database with MongoDB and Mongoose ODM.",
        resources: [
          {
            title: "MongoDB University",
            url: "https://university.mongodb.com/",
            type: "course",
          },
          {
            title: "Mongoose Guide",
            url: "https://mongoosejs.com/docs/",
            type: "documentation",
          },
        ],
        prerequisites: ["database-basics"],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 450, y: 250 },
        connections: ["authentication"],
      },
      {
        id: "postgresql",
        title: "PostgreSQL",
        description:
          "Learn relational database with PostgreSQL and advanced SQL.",
        resources: [
          {
            title: "PostgreSQL Tutorial",
            url: "https://www.postgresql.org/docs/current/tutorial.html",
            type: "documentation",
          },
          {
            title: "SQL Advanced",
            url: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
            type: "video",
          },
        ],
        prerequisites: ["database-basics"],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 650, y: 250 },
        connections: ["authentication"],
      },
      {
        id: "authentication",
        title: "Authentication & Security",
        description: "Implement JWT, OAuth, and security best practices.",
        resources: [
          {
            title: "JWT Guide",
            url: "https://jwt.io/introduction",
            type: "article",
          },
          {
            title: "OAuth 2.0",
            url: "https://auth0.com/intro-to-iam/what-is-oauth-2",
            type: "article",
          },
        ],
        prerequisites: ["api-design", "mongodb", "postgresql"],
        estimatedTime: "3 weeks",
        difficulty: "Hard",
        position: { x: 450, y: 400 },
        connections: ["deployment"],
      },
      {
        id: "deployment",
        title: "Deployment & DevOps",
        description: "Learn Docker, AWS, and deployment strategies.",
        resources: [
          {
            title: "Docker Tutorial",
            url: "https://docs.docker.com/get-started/",
            type: "documentation",
          },
          {
            title: "AWS Free Tier",
            url: "https://aws.amazon.com/free/",
            type: "course",
          },
        ],
        prerequisites: ["authentication"],
        estimatedTime: "4 weeks",
        difficulty: "Hard",
        position: { x: 650, y: 400 },
        connections: [],
      },
    ],
    metadata: {
      lastUpdated: new Date(),
      version: "1.0.0",
      contributors: ["System"],
    },
  },
  {
    title: "DevOps Engineer",
    description:
      "Complete DevOps roadmap covering CI/CD, containerization, cloud platforms, and monitoring.",
    category: "DevOps",
    difficulty: "Advanced",
    estimatedTime: "10-12 months",
    color: "#f6ad55",
    icon: "🚀",
    isPublished: true,
    steps: [
      {
        id: "linux-basics",
        title: "Linux Fundamentals",
        description:
          "Master Linux command line, file systems, and system administration.",
        resources: [
          {
            title: "Linux Command Line",
            url: "https://linuxcommand.org/",
            type: "course",
          },
          {
            title: "Bash Scripting",
            url: "https://www.gnu.org/software/bash/manual/",
            type: "documentation",
          },
        ],
        prerequisites: [],
        estimatedTime: "4 weeks",
        difficulty: "Medium",
        position: { x: 50, y: 100 },
        connections: ["git-version-control"],
      },
      {
        id: "git-version-control",
        title: "Git & Version Control",
        description:
          "Learn Git workflows, branching strategies, and collaboration.",
        resources: [
          {
            title: "Git Handbook",
            url: "https://guides.github.com/introduction/git-handbook/",
            type: "article",
          },
          {
            title: "Git Flow",
            url: "https://nvie.com/posts/a-successful-git-branching-model/",
            type: "article",
          },
        ],
        prerequisites: ["linux-basics"],
        estimatedTime: "2 weeks",
        difficulty: "Easy",
        position: { x: 250, y: 100 },
        connections: ["docker-basics"],
      },
      {
        id: "docker-basics",
        title: "Docker & Containers",
        description:
          "Learn containerization with Docker and container orchestration.",
        resources: [
          {
            title: "Docker Get Started",
            url: "https://docs.docker.com/get-started/",
            type: "documentation",
          },
          {
            title: "Docker Compose",
            url: "https://docs.docker.com/compose/",
            type: "documentation",
          },
        ],
        prerequisites: ["git-version-control"],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 450, y: 100 },
        connections: ["kubernetes", "ci-cd"],
      },
      {
        id: "kubernetes",
        title: "Kubernetes",
        description: "Master Kubernetes orchestration and cluster management.",
        resources: [
          {
            title: "Kubernetes Basics",
            url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
            type: "course",
          },
          {
            title: "K8s in Production",
            url: "https://www.youtube.com/watch?v=X48VuDVv0do",
            type: "video",
          },
        ],
        prerequisites: ["docker-basics"],
        estimatedTime: "6 weeks",
        difficulty: "Hard",
        position: { x: 650, y: 100 },
        connections: ["monitoring"],
      },
      {
        id: "ci-cd",
        title: "CI/CD Pipelines",
        description:
          "Build automated deployment pipelines with Jenkins, GitHub Actions.",
        resources: [
          {
            title: "GitHub Actions",
            url: "https://docs.github.com/en/actions",
            type: "documentation",
          },
          {
            title: "Jenkins Tutorial",
            url: "https://www.jenkins.io/doc/tutorials/",
            type: "course",
          },
        ],
        prerequisites: ["docker-basics"],
        estimatedTime: "4 weeks",
        difficulty: "Hard",
        position: { x: 450, y: 250 },
        connections: ["monitoring", "cloud-platforms"],
      },
      {
        id: "monitoring",
        title: "Monitoring & Logging",
        description:
          "Implement monitoring with Prometheus, Grafana, and ELK stack.",
        resources: [
          {
            title: "Prometheus Guide",
            url: "https://prometheus.io/docs/introduction/overview/",
            type: "documentation",
          },
          {
            title: "Grafana Tutorial",
            url: "https://grafana.com/tutorials/",
            type: "course",
          },
        ],
        prerequisites: ["kubernetes", "ci-cd"],
        estimatedTime: "4 weeks",
        difficulty: "Hard",
        position: { x: 650, y: 250 },
        connections: ["cloud-platforms"],
      },
      {
        id: "cloud-platforms",
        title: "Cloud Platforms",
        description:
          "Master AWS, Azure, or GCP cloud services and infrastructure.",
        resources: [
          {
            title: "AWS Free Tier",
            url: "https://aws.amazon.com/free/",
            type: "course",
          },
          {
            title: "Azure Fundamentals",
            url: "https://docs.microsoft.com/en-us/learn/azure/",
            type: "course",
          },
        ],
        prerequisites: ["ci-cd", "monitoring"],
        estimatedTime: "8 weeks",
        difficulty: "Hard",
        position: { x: 450, y: 400 },
        connections: [],
      },
    ],
    metadata: {
      lastUpdated: new Date(),
      version: "1.0.0",
      contributors: ["System"],
    },
  },
];

async function populateRoadmaps() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing roadmaps
    await Roadmap.deleteMany({});
    console.log("Cleared existing roadmaps");

    // Insert sample roadmaps
    const insertedRoadmaps = await Roadmap.insertMany(sampleRoadmaps);
    console.log(`Inserted ${insertedRoadmaps.length} roadmaps`);

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error populating roadmaps:", error);
    process.exit(1);
  }
}

// Run the script
populateRoadmaps();

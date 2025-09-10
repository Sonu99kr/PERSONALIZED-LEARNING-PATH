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
    title: "Mobile Developer",
    description:
      "Roadmap for native and cross-platform mobile development covering Android, iOS, and Flutter/React Native.",
    category: "Mobile",
    difficulty: "Intermediate",
    estimatedTime: "8-10 months",
    color: "#f472b6",
    icon: "📱",
    isPublished: true,
    steps: [
      {
        id: "mobile-foundations",
        title: "Mobile Foundations",
        description:
          "Understand mobile platforms, app lifecycle, UI patterns, and store guidelines.",
        resources: [
          {
            title: "Android Overview",
            url: "https://developer.android.com/guide",
            type: "documentation",
          },
          {
            title: "Human Interface Guidelines",
            url: "https://developer.apple.com/design/human-interface-guidelines/",
            type: "documentation",
          },
        ],
        prerequisites: [],
        estimatedTime: "2 weeks",
        difficulty: "Easy",
        position: { x: 50, y: 100 },
        connections: ["kotlin-basics", "swift-basics", "cross-platform-intro"],
      },
      {
        id: "kotlin-basics",
        title: "Kotlin for Android",
        description: "Learn Kotlin syntax and Android Studio basics.",
        resources: [
          {
            title: "Kotlin Lang",
            url: "https://kotlinlang.org/docs/home.html",
            type: "documentation",
          },
          {
            title: "Android Basics",
            url: "https://developer.android.com/courses",
            type: "course",
          },
        ],
        prerequisites: ["mobile-foundations"],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 250, y: 100 },
        connections: ["android-ui", "data-storage"],
      },
      {
        id: "swift-basics",
        title: "Swift for iOS",
        description: "Learn Swift syntax and Xcode fundamentals.",
        resources: [
          {
            title: "Swift Book",
            url: "https://docs.swift.org/swift-book/",
            type: "documentation",
          },
          {
            title: "Develop in Swift",
            url: "https://developer.apple.com/tutorials/",
            type: "course",
          },
        ],
        prerequisites: ["mobile-foundations"],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 450, y: 100 },
        connections: ["ios-ui", "data-storage"],
      },
      {
        id: "cross-platform-intro",
        title: "Cross-Platform Intro",
        description: "Compare Flutter and React Native options.",
        resources: [
          {
            title: "Flutter Docs",
            url: "https://docs.flutter.dev/",
            type: "documentation",
          },
          {
            title: "React Native Docs",
            url: "https://reactnative.dev/docs/getting-started",
            type: "documentation",
          },
        ],
        prerequisites: ["mobile-foundations"],
        estimatedTime: "1 week",
        difficulty: "Easy",
        position: { x: 250, y: 250 },
        connections: ["flutter-basics", "react-native-basics"],
      },
      {
        id: "android-ui",
        title: "Android UI & Compose",
        description:
          "Build Android UIs with Jetpack Compose and material design.",
        resources: [
          {
            title: "Compose Basics",
            url: "https://developer.android.com/jetpack/compose/documentation",
            type: "documentation",
          },
        ],
        prerequisites: ["kotlin-basics"],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 450, y: 250 },
        connections: ["testing-mobile"],
      },
      {
        id: "ios-ui",
        title: "iOS UI & SwiftUI",
        description: "Build iOS UIs with SwiftUI and UIKit basics.",
        resources: [
          {
            title: "SwiftUI Tutorials",
            url: "https://developer.apple.com/tutorials/swiftui",
            type: "documentation",
          },
        ],
        prerequisites: ["swift-basics"],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 650, y: 250 },
        connections: ["testing-mobile"],
      },
      {
        id: "flutter-basics",
        title: "Flutter Basics",
        description: "Learn Dart and Flutter widgets, navigation, and state.",
        resources: [
          {
            title: "Dart Language",
            url: "https://dart.dev/guides",
            type: "documentation",
          },
        ],
        prerequisites: ["cross-platform-intro"],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 450, y: 400 },
        connections: ["testing-mobile"],
      },
      {
        id: "react-native-basics",
        title: "React Native Basics",
        description: "Learn RN components, navigation, and native modules.",
        resources: [
          {
            title: "React Native Guide",
            url: "https://reactnative.dev/docs/environment-setup",
            type: "documentation",
          },
        ],
        prerequisites: ["cross-platform-intro"],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 650, y: 400 },
        connections: ["testing-mobile"],
      },
      {
        id: "data-storage",
        title: "Data & Networking",
        description: "Local storage, REST/GraphQL, and offline-first patterns.",
        resources: [
          {
            title: "Room/SQLite",
            url: "https://developer.android.com/training/data-storage/room",
            type: "documentation",
          },
          {
            title: "URLSession & Core Data",
            url: "https://developer.apple.com/documentation/",
            type: "documentation",
          },
        ],
        prerequisites: ["kotlin-basics", "swift-basics"],
        estimatedTime: "3 weeks",
        difficulty: "Hard",
        position: { x: 50, y: 250 },
        connections: ["testing-mobile"],
      },
      {
        id: "testing-mobile",
        title: "Testing & Release",
        description: "Unit/UI testing, CI/CD, signing, and store release.",
        resources: [
          {
            title: "Android Testing",
            url: "https://developer.android.com/training/testing",
            type: "documentation",
          },
          {
            title: "XCTest",
            url: "https://developer.apple.com/documentation/xctest",
            type: "documentation",
          },
        ],
        prerequisites: [
          "android-ui",
          "ios-ui",
          "flutter-basics",
          "react-native-basics",
          "data-storage",
        ],
        estimatedTime: "3 weeks",
        difficulty: "Hard",
        position: { x: 250, y: 400 },
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
    title: "Data Science",
    description:
      "End-to-end data science roadmap covering Python, statistics, ML, and deployment.",
    category: "Data Science",
    difficulty: "Intermediate",
    estimatedTime: "8-12 months",
    color: "#34d399",
    icon: "📊",
    isPublished: true,
    steps: [
      {
        id: "python-basics-ds",
        title: "Python Basics",
        description: "Python syntax, packages, and environments for DS.",
        resources: [
          {
            title: "Python Tutorial",
            url: "https://docs.python.org/3/tutorial/",
            type: "documentation",
          },
          {
            title: "Anaconda Guide",
            url: "https://docs.conda.io/projects/conda/en/latest/user-guide/",
            type: "documentation",
          },
        ],
        prerequisites: [],
        estimatedTime: "3 weeks",
        difficulty: "Easy",
        position: { x: 50, y: 100 },
        connections: ["data-wrangling", "statistics"],
      },
      {
        id: "data-wrangling",
        title: "Data Wrangling",
        description: "NumPy, pandas, and data cleaning.",
        resources: [
          {
            title: "pandas Docs",
            url: "https://pandas.pydata.org/docs/",
            type: "documentation",
          },
          {
            title: "NumPy Docs",
            url: "https://numpy.org/doc/",
            type: "documentation",
          },
        ],
        prerequisites: ["python-basics-ds"],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 250, y: 100 },
        connections: ["visualization", "ml-foundations"],
      },
      {
        id: "statistics",
        title: "Statistics & Probability",
        description: "Descriptive stats, probability, and inference.",
        resources: [
          {
            title: "Khan Academy: Stats",
            url: "https://www.khanacademy.org/math/statistics-probability",
            type: "course",
          },
        ],
        prerequisites: ["python-basics-ds"],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 450, y: 100 },
        connections: ["ml-foundations"],
      },
      {
        id: "visualization",
        title: "Data Visualization",
        description: "Matplotlib, Seaborn, Plotly, and storytelling.",
        resources: [
          {
            title: "Matplotlib",
            url: "https://matplotlib.org/stable/",
            type: "documentation",
          },
          {
            title: "Seaborn",
            url: "https://seaborn.pydata.org/",
            type: "documentation",
          },
        ],
        prerequisites: ["data-wrangling"],
        estimatedTime: "2 weeks",
        difficulty: "Easy",
        position: { x: 250, y: 250 },
        connections: ["ml-foundations"],
      },
      {
        id: "ml-foundations",
        title: "ML Foundations",
        description: "Scikit-learn, model evaluation, and pipelines.",
        resources: [
          {
            title: "scikit-learn",
            url: "https://scikit-learn.org/stable/",
            type: "documentation",
          },
        ],
        prerequisites: ["data-wrangling", "statistics"],
        estimatedTime: "4 weeks",
        difficulty: "Medium",
        position: { x: 450, y: 250 },
        connections: ["model-deployment"],
      },
      {
        id: "model-deployment",
        title: "Model Deployment",
        description: "Serving models with FastAPI/Flask and monitoring.",
        resources: [
          {
            title: "FastAPI",
            url: "https://fastapi.tiangolo.com/",
            type: "documentation",
          },
          {
            title: "MLflow",
            url: "https://mlflow.org/docs/latest/index.html",
            type: "documentation",
          },
        ],
        prerequisites: ["ml-foundations"],
        estimatedTime: "3 weeks",
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
  {
    title: "AI/ML Engineer",
    description:
      "Roadmap for machine learning and deep learning engineering from math to production.",
    category: "AI/ML",
    difficulty: "Advanced",
    estimatedTime: "10-12 months",
    color: "#a78bfa",
    icon: "🤖",
    isPublished: true,
    steps: [
      {
        id: "python-ml-basics",
        title: "Python & Math Refresher",
        description: "Linear algebra, calculus basics, and Python tooling.",
        resources: [
          {
            title: "Linear Algebra",
            url: "https://www.khanacademy.org/math/linear-algebra",
            type: "course",
          },
          {
            title: "NumPy",
            url: "https://numpy.org/doc/",
            type: "documentation",
          },
        ],
        prerequisites: [],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 50, y: 100 },
        connections: ["ml-classical", "dl-basics"],
      },
      {
        id: "ml-classical",
        title: "Classical ML",
        description:
          "Supervised/unsupervised algorithms and feature engineering.",
        resources: [
          {
            title: "sklearn",
            url: "https://scikit-learn.org/stable/",
            type: "documentation",
          },
        ],
        prerequisites: ["python-ml-basics"],
        estimatedTime: "4 weeks",
        difficulty: "Medium",
        position: { x: 250, y: 100 },
        connections: ["ml-evaluation"],
      },
      {
        id: "dl-basics",
        title: "Deep Learning Basics",
        description: "Neural networks with PyTorch/TensorFlow.",
        resources: [
          {
            title: "PyTorch",
            url: "https://pytorch.org/docs/stable/index.html",
            type: "documentation",
          },
          {
            title: "TensorFlow",
            url: "https://www.tensorflow.org/guide",
            type: "documentation",
          },
        ],
        prerequisites: ["python-ml-basics"],
        estimatedTime: "4 weeks",
        difficulty: "Hard",
        position: { x: 450, y: 100 },
        connections: ["computer-vision", "nlp"],
      },
      {
        id: "ml-evaluation",
        title: "ML Evaluation & MLOps",
        description: "Metrics, experiment tracking, and reproducibility.",
        resources: [
          {
            title: "Weights & Biases",
            url: "https://docs.wandb.ai/",
            type: "documentation",
          },
        ],
        prerequisites: ["ml-classical"],
        estimatedTime: "2 weeks",
        difficulty: "Medium",
        position: { x: 250, y: 250 },
        connections: ["production-ml"],
      },
      {
        id: "computer-vision",
        title: "Computer Vision",
        description: "CNNs, augmentation, and transfer learning.",
        resources: [
          {
            title: "TorchVision",
            url: "https://pytorch.org/vision/stable/index.html",
            type: "documentation",
          },
        ],
        prerequisites: ["dl-basics"],
        estimatedTime: "3 weeks",
        difficulty: "Hard",
        position: { x: 450, y: 250 },
        connections: ["production-ml"],
      },
      {
        id: "nlp",
        title: "Natural Language Processing",
        description: "RNNs, Transformers, and embeddings.",
        resources: [
          {
            title: "Hugging Face",
            url: "https://huggingface.co/docs",
            type: "documentation",
          },
        ],
        prerequisites: ["dl-basics"],
        estimatedTime: "3 weeks",
        difficulty: "Hard",
        position: { x: 650, y: 250 },
        connections: ["production-ml"],
      },
      {
        id: "production-ml",
        title: "Production ML",
        description: "Serving, monitoring, and responsible AI practices.",
        resources: [
          {
            title: "TensorFlow Serving",
            url: "https://www.tensorflow.org/tfx/guide/serving",
            type: "documentation",
          },
        ],
        prerequisites: ["ml-evaluation", "computer-vision", "nlp"],
        estimatedTime: "4 weeks",
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
  {
    title: "Product Designer",
    description:
      "Design roadmap covering UX research, UI design, interaction, and handoff.",
    category: "Design",
    difficulty: "Beginner",
    estimatedTime: "6-8 months",
    color: "#f59e0b",
    icon: "🎨",
    isPublished: true,
    steps: [
      {
        id: "design-foundations",
        title: "Design Foundations",
        description: "Color, typography, layout, and accessibility.",
        resources: [
          {
            title: "Material Design",
            url: "https://m3.material.io/",
            type: "documentation",
          },
          {
            title: "WCAG",
            url: "https://www.w3.org/WAI/standards-guidelines/wcag/",
            type: "documentation",
          },
        ],
        prerequisites: [],
        estimatedTime: "2 weeks",
        difficulty: "Easy",
        position: { x: 50, y: 100 },
        connections: ["ux-research", "ui-tools"],
      },
      {
        id: "ux-research",
        title: "UX Research",
        description: "User interviews, personas, and journey mapping.",
        resources: [
          {
            title: "NNGroup Articles",
            url: "https://www.nngroup.com/articles/",
            type: "article",
          },
        ],
        prerequisites: ["design-foundations"],
        estimatedTime: "2 weeks",
        difficulty: "Medium",
        position: { x: 250, y: 100 },
        connections: ["wireframing"],
      },
      {
        id: "ui-tools",
        title: "UI Tools & Systems",
        description: "Figma/Sketch, components, and design systems.",
        resources: [
          {
            title: "Figma Docs",
            url: "https://help.figma.com/hc/en-us",
            type: "documentation",
          },
        ],
        prerequisites: ["design-foundations"],
        estimatedTime: "2 weeks",
        difficulty: "Easy",
        position: { x: 450, y: 100 },
        connections: ["wireframing", "prototyping"],
      },
      {
        id: "wireframing",
        title: "Wireframing",
        description: "Low-fidelity flows and information architecture.",
        resources: [
          {
            title: "IA Basics",
            url: "https://www.usability.gov/what-and-why/information-architecture.html",
            type: "article",
          },
        ],
        prerequisites: ["ux-research", "ui-tools"],
        estimatedTime: "2 weeks",
        difficulty: "Medium",
        position: { x: 250, y: 250 },
        connections: ["prototyping"],
      },
      {
        id: "prototyping",
        title: "Prototyping & Interaction",
        description:
          "Interactive prototypes, micro-interactions, and usability testing.",
        resources: [
          {
            title: "Figma Prototyping",
            url: "https://help.figma.com/hc/en-us/articles/360040448373-Create-advanced-prototypes",
            type: "documentation",
          },
        ],
        prerequisites: ["wireframing"],
        estimatedTime: "3 weeks",
        difficulty: "Medium",
        position: { x: 450, y: 250 },
        connections: ["handoff"],
      },
      {
        id: "handoff",
        title: "Design Handoff",
        description: "Specs, assets, and collaboration with developers.",
        resources: [
          {
            title: "Design Tokens",
            url: "https://design-tokens.github.io/",
            type: "documentation",
          },
        ],
        prerequisites: ["prototyping"],
        estimatedTime: "2 weeks",
        difficulty: "Easy",
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

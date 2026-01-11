import express from 'express';
const router = express.Router();

// Extended video database with 12 videos
const sampleVideos = [
  {
    _id: 'vid_001',
    title: "React Tutorial for Beginners 2024 - Learn React in 3 Hours",
    description: "Complete React tutorial with hooks, context, and modern practices. Build 3 projects!",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    views: 154200,
    likes: 12500,
    userId: "user1",
    username: "CodeMaster",
    duration: 10800,
    createdAt: new Date('2024-01-15'),
    tags: ["react", "javascript", "webdev"]
  },
  {
    _id: 'vid_002',
    title: "Build a Full Stack YouTube Clone with React & Node.js",
    description: "Learn to build a complete video sharing platform from scratch",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    views: 89200,
    likes: 8500,
    userId: "user2",
    username: "DevGuru",
    duration: 14400,
    createdAt: new Date('2024-02-10'),
    tags: ["nodejs", "express", "mongodb"]
  },
  {
    _id: 'vid_003',
    title: "Tailwind CSS Crash Course - Build Beautiful UIs Fast",
    description: "Master utility-first CSS framework with practical projects",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
    views: 134800,
    likes: 11200,
    userId: "user3",
    username: "CSSWizard",
    duration: 7200,
    createdAt: new Date('2024-02-28'),
    tags: ["tailwind", "css", "design"]
  },
  {
    _id: 'vid_004',
    title: "MongoDB Complete Tutorial for Backend Developers",
    description: "Learn NoSQL database design, queries, and aggregation",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1640184998828-22d4d9a0d5c8?w=800&q=80",
    views: 78560,
    likes: 7200,
    userId: "user4",
    username: "DatabaseGuru",
    duration: 10800,
    createdAt: new Date('2024-03-05'),
    tags: ["mongodb", "database", "nosql"]
  },
  {
    _id: 'vid_005',
    title: "TypeScript Full Course for JavaScript Developers",
    description: "Add type safety to your JavaScript projects with practical examples",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    views: 112300,
    likes: 9800,
    userId: "user5",
    username: "TypeScriptPro",
    duration: 9000,
    createdAt: new Date('2024-03-20'),
    tags: ["typescript", "javascript", "webdev"]
  },
  {
    _id: 'vid_006',
    title: "Next.js 14 Complete Guide with App Router",
    description: "Build production-ready React applications with SSR and SEO",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    views: 156800,
    likes: 13400,
    userId: "user6",
    username: "NextJSExpert",
    duration: 12600,
    createdAt: new Date('2024-04-05'),
    tags: ["nextjs", "react", "ssr"]
  },
  {
    _id: 'vid_007',
    title: "Python Django Full Course - Build a Blog Platform",
    description: "Learn Django from basics to advanced with a complete project",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec6?w=800&q=80",
    views: 98700,
    likes: 8200,
    userId: "user7",
    username: "Pythonista",
    duration: 10800,
    createdAt: new Date('2024-04-15'),
    tags: ["python", "django", "backend"]
  },
  {
    _id: 'vid_008',
    title: "AWS Cloud Practitioner Certification Guide",
    description: "Pass AWS certification with hands-on labs and practice tests",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    views: 143200,
    likes: 11800,
    userId: "user8",
    username: "CloudExpert",
    duration: 14400,
    createdAt: new Date('2024-05-01'),
    tags: ["aws", "cloud", "devops"]
  },
  {
    _id: 'vid_009',
    title: "Flutter & Firebase Mobile App Development",
    description: "Build cross-platform apps with Flutter and Firebase backend",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    views: 87600,
    likes: 7400,
    userId: "user9",
    username: "MobileDev",
    duration: 9000,
    createdAt: new Date('2024-05-10'),
    tags: ["flutter", "firebase", "mobile"]
  },
  {
    _id: 'vid_010',
    title: "Machine Learning Fundamentals with Python",
    description: "Introduction to ML algorithms and TensorFlow basics",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    views: 234100,
    likes: 19800,
    userId: "user10",
    username: "AIResearcher",
    duration: 12600,
    createdAt: new Date('2024-05-25'),
    tags: ["ml", "python", "ai"]
  },
  {
    _id: 'vid_011',
    title: "DevOps with Docker, Kubernetes & Jenkins",
    description: "Complete CI/CD pipeline setup for modern applications",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
    views: 113500,
    likes: 9600,
    userId: "user11",
    username: "DevOpsGuru",
    duration: 10800,
    createdAt: new Date('2024-06-05'),
    tags: ["devops", "docker", "kubernetes"]
  },
  {
    _id: 'vid_012',
    title: "GraphQL vs REST API - Complete Comparison",
    description: "When to use GraphQL and when to stick with REST APIs",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    views: 76500,
    likes: 6800,
    userId: "user12",
    username: "APIArchitect",
    duration: 7200,
    createdAt: new Date('2024-06-15'),
    tags: ["graphql", "api", "rest"]
  }
];

// Get all videos
router.get('/', (req, res) => {
  res.json(sampleVideos);
});

// Get single video
router.get('/:id', (req, res) => {
  const video = sampleVideos.find(v => v._id === req.params.id);
  if (!video) return res.status(404).json({ error: 'Video not found' });
  
  // Increment views
  video.views += 1;
  
  res.json(video);
});

// Like video
router.post('/:id/like', (req, res) => {
  const video = sampleVideos.find(v => v._id === req.params.id);
  if (!video) return res.status(404).json({ error: 'Video not found' });
  
  video.likes += 1;
  res.json({ 
    success: true, 
    likes: video.likes,
    message: `Video liked! Total: ${video.likes}`
  });
});

// Search videos
router.get('/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const results = sampleVideos.filter(video => 
    video.title.toLowerCase().includes(query) || 
    video.description.toLowerCase().includes(query) ||
    video.tags.some(tag => tag.toLowerCase().includes(query))
  );
  res.json(results);
});

export default router;
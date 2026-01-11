import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define the Video schema inline (since we don't have the model file yet)
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    duration: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);

const seedVideos = [
    {
        title: "React Tutorial for Beginners",
        description: "Learn React in 1 hour - Complete crash course",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        views: 15000,
        likes: 1200,
        userId: "user1",
        username: "CodeMaster",
        duration: 3600
    },
    {
        title: "Node.js REST API Crash Course",
        description: "Build a backend with Express and MongoDB",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w-800&q=80",
        views: 8900,
        likes: 850,
        userId: "user2",
        username: "DevGuru",
        duration: 4200
    },
    {
        title: "JavaScript Modern Features 2024",
        description: "Master ES6+ features with practical examples",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80",
        views: 23500,
        likes: 2100,
        userId: "user3",
        username: "JSExpert",
        duration: 2800
    },
    {
        title: "Tailwind CSS Complete Guide",
        description: "Build beautiful UIs without writing custom CSS",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80",
        views: 12400,
        likes: 980,
        userId: "user4",
        username: "DesignWizard",
        duration: 3200
    }
];

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/youtube_clone');
        console.log('✅ Connected to MongoDB');
        
        console.log('Clearing existing videos...');
        await Video.deleteMany({});
        
        console.log('Adding sample videos...');
        await Video.insertMany(seedVideos);
        
        console.log('✅ Database seeded with 4 sample videos!');
        console.log('\n📊 Sample Data Added:');
        console.log('1. React Tutorial for Beginners');
        console.log('2. Node.js REST API Crash Course');
        console.log('3. JavaScript Modern Features 2024');
        console.log('4. Tailwind CSS Complete Guide');
        
        process.exit();
    } catch (error) {
        console.error('❌ Seeding error:', error.message);
        process.exit(1);
    }
}

seed();
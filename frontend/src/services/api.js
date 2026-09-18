// src/services/api.js - WORKING MOCK DATA
const INDIAN_VIDEOS = [
  {
    id: '4TWR90KJl84',
    title: 'Kesariya - Brahmāstra | Ranbir Kapoor | Alia Bhatt',
    channel: 'Sony Music India',
    views: '752M',
    time: '1 year ago',
    duration: '4:28',
    thumbnail: 'https://i.ytimg.com/vi/4TWR90KJl84/hqdefault.jpg',
    channelAvatar: 'https://yt3.ggpht.com/ytc/APkrFKZVRQpYh9LWpDlQq5MqVpNkak-FW4-yL1CGNEHjaw=s88-c-k-c0x00ffffff-no-rj',
    category: 'music'
  },
  {
    id: 'Fg6QnB7wC3M',
    title: 'Lut Gaye - Jubin Nautiyal | Emraan Hashmi, Yukti',
    channel: 'T-Series',
    views: '1.2B',
    time: '3 years ago',
    duration: '3:48',
    thumbnail: 'https://i.ytimg.com/vi/Fg6QnB7wC3M/hqdefault.jpg',
    channelAvatar: 'https://yt3.ggpht.com/ytc/AIf8zZS9Gp0LeXfV5LzT20KQK6F-Q6b7wD8U7Q7Q7Q7Q=s88-c-k-c0x00ffffff-no-rj',
    category: 'music'
  },
  {
    id: 'y8OtzJp-8u8',
    title: 'Srivalli - Pushpa | Allu Arjun | Rashmika',
    channel: 'T-Series Telugu',
    views: '850M',
    time: '2 years ago',
    duration: '3:42',
    thumbnail: 'https://i.ytimg.com/vi/y8OtzJp-8u8/hqdefault.jpg',
    channelAvatar: 'https://yt3.ggpht.com/ytc/AIf8zZS9Gp0LeXfV5LzT20KQK6F-Q6b7wD8U7Q7Q7Q7Q=s88-c-k-c0x00ffffff-no-rj',
    category: 'music'
  },
  {
    id: 'abc123',
    title: 'Nothing Phone 2 Review - Best Under ₹40,000?',
    channel: 'Technical Guruji',
    views: '8.2M',
    time: '1 month ago',
    duration: '18:30',
    thumbnail: 'https://i.ytimg.com/vi/abc123/hqdefault.jpg',
    channelAvatar: 'https://yt3.ggpht.com/ytc/AIf8zZS9Gp0LeXfV5LzT20KQK6F-Q6b7wD8U7Q7Q7Q7Q=s88-c-k-c0x00ffffff-no-rj',
    category: 'tech'
  },
  {
    id: 'def456',
    title: 'iPhone 15 Unboxing & First Look - India Price',
    channel: 'Beebom',
    views: '5.8M',
    time: '2 weeks ago',
    duration: '15:45',
    thumbnail: 'https://i.ytimg.com/vi/def456/hqdefault.jpg',
    channelAvatar: 'https://yt3.ggpht.com/ytc/AIf8zZS9Gp0LeXfV5LzT20KQK6F-Q6b7wD8U7Q7Q7Q7Q=s88-c-k-c0x00ffffff-no-rj',
    category: 'tech'
  },
  {
    id: 'ghi789',
    title: 'Butter Chicken Recipe - Restaurant Style',
    channel: 'Ranveer Brar',
    views: '25M',
    time: '6 months ago',
    duration: '12:20',
    thumbnail: 'https://i.ytimg.com/vi/ghi789/hqdefault.jpg',
    channelAvatar: 'https://yt3.ggpht.com/ytc/AIf8zZS9Gp0LeXfV5LzT20KQK6F-Q6b7wD8U7Q7Q7Q7Q=s88-c-k-c0x00ffffff-no-rj',
    category: 'cooking'
  },
  {
    id: 'jkl012',
    title: 'Biryani Recipe - Hyderabadi Dum Biryani',
    channel: 'Kabita\'s Kitchen',
    views: '42M',
    time: '1 year ago',
    duration: '20:15',
    thumbnail: 'https://i.ytimg.com/vi/jkl012/hqdefault.jpg',
    channelAvatar: 'https://yt3.ggpht.com/ytc/AIf8zZS9Gp0LeXfV5LzT20KQK6F-Q6b7wD8U7Q7Q7Q7Q=s88-c-k-c0x00ffffff-no-rj',
    category: 'cooking'
  },
  {
    id: 'mno345',
    title: 'CarryMinati Roasts TikTokers | Funny Video',
    channel: 'CarryMinati',
    views: '125M',
    time: '2 years ago',
    duration: '10:45',
    thumbnail: 'https://i.ytimg.com/vi/mno345/hqdefault.jpg',
    channelAvatar: 'https://yt3.ggpht.com/ytc/AIf8zZS9Gp0LeXfV5LzT20KQK6F-Q6b7wD8U7Q7Q7Q7Q=s88-c-k-c0x00ffffff-no-rj',
    category: 'entertainment'
  }
];

// Generate 50+ more videos
const generateMoreVideos = () => {
  const categories = ['music', 'tech', 'gaming', 'education', 'sports', 'news', 'cooking', 'entertainment', 'travel'];
  const channels = [
    'T-Series', 'SET India', 'Technical Guruji', 'Beebom', 'CarryMinati', 
    'Ashish Chanchlani', 'CodeWithHarry', 'Physics Wallah', 'Ranveer Brar',
    'Kabita\'s Kitchen', 'Curly Tales', 'Aaj Tak', 'NDTV', 'Star Sports'
  ];
  
  const videos = [...INDIAN_VIDEOS];
  
  for (let i = 0; i < 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const channel = channels[Math.floor(Math.random() * channels.length)];
    const views = Math.floor(Math.random() * 10000000) + 100000;
    
    videos.push({
      id: `video_${i + 100}`,
      title: `${channel} - ${category.charAt(0).toUpperCase() + category.slice(1)} Video #${i + 1}`,
      channel: channel,
      views: formatViews(views),
      time: `${Math.floor(Math.random() * 30) + 1} ${['hours', 'days', 'weeks', 'months'][Math.floor(Math.random() * 4)]} ago`,
      duration: `${Math.floor(Math.random() * 30) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      thumbnail: `https://picsum.photos/320/180?random=${i + 1000}&blur=2`,
      channelAvatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      category: category
    });
  }
  
  return videos;
};

const formatViews = (num) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const ALL_VIDEOS = generateMoreVideos();

// Export functions
export const getAllVideos = () => ALL_VIDEOS;

export const getPopularVideos = (limit = 50) => {
  return [...ALL_VIDEOS]
    .sort((a, b) => {
      const aViews = parseFloat(a.views) || 0;
      const bViews = parseFloat(b.views) || 0;
      return bViews - aViews;
    })
    .slice(0, limit);
};

export const getVideosByCategory = (category, limit = 50) => {
  if (category === 'all') return getPopularVideos(limit);
  return ALL_VIDEOS
    .filter(video => video.category === category)
    .slice(0, limit);
};

export const searchVideos = (query, limit = 50) => {
  if (!query || query.trim() === '') return getPopularVideos(limit);
  
  const searchTerm = query.toLowerCase().trim();
  const results = ALL_VIDEOS
    .filter(video => 
      video.title.toLowerCase().includes(searchTerm) ||
      video.channel.toLowerCase().includes(searchTerm) ||
      video.category.toLowerCase().includes(searchTerm)
    )
    .slice(0, limit);
  
  return results.length > 0 ? results : getPopularVideos(limit);
};

export const getVideoById = (id) => {
  return ALL_VIDEOS.find(video => video.id === id) || ALL_VIDEOS[0];
};

// ADD THIS FUNCTION FOR VideoPage.jsx:
export const getRelatedVideos = (currentVideoId, limit = 10) => {
  const currentVideo = getVideoById(currentVideoId);
  if (!currentVideo) return getPopularVideos(limit);
  
  return ALL_VIDEOS
    .filter(video => video.id !== currentVideoId && video.category === currentVideo.category)
    .slice(0, limit);
};

// ADD THESE IF NEEDED:
export const getSubscriptionVideos = () => {
  const subscriptions = ['T-Series', 'SET India', 'Technical Guruji', 'CodeWithHarry', 'Sony Music'];
  return ALL_VIDEOS
    .filter(video => subscriptions.includes(video.channel))
    .slice(0, 15);
};

export const filterVideosByCategory = (videos, category) => {
  if (category === 'all') return videos;
  return videos.filter(video => video.category === category);
};

export const SHORTS_DATA = [
  {
    _id: 'short_1',
    title: 'Top 5 VS Code Secrets Every Developer Needs! 🔥 #shorts #coding',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    channel: 'CodeWithHarry',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harry',
    likes: 124500,
    dislikes: 120,
    commentsCount: 342,
    audioTitle: 'CodeWithHarry • Original Audio',
    isSubscribed: false,
    isLiked: false
  },
  {
    _id: 'short_2',
    title: 'Build a Full YouTube Shorts Player in React ⚡ #javascript #react',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    channel: 'Technical Guruji',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guruji',
    likes: 89300,
    dislikes: 95,
    commentsCount: 215,
    audioTitle: 'Technical Guruji • Trending Sound',
    isSubscribed: true,
    isLiked: false
  },
  {
    _id: 'short_3',
    title: 'Next.js 15 Server Actions Crash Course 🚀 #webdev #nextjs',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    channel: 'CarryMinati',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carry',
    likes: 245000,
    dislikes: 310,
    commentsCount: 1240,
    audioTitle: 'CarryMinati • Epic Beat',
    isSubscribed: false,
    isLiked: false
  },
  {
    _id: 'short_4',
    title: 'AI Coding Tools in 2026: Magic or Hype? 🤖 #ai #programming',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyplays.mp4',
    channel: 'Beebom',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beebom',
    likes: 67200,
    dislikes: 42,
    commentsCount: 180,
    audioTitle: 'Beebom Tech Sound',
    isSubscribed: false,
    isLiked: false
  },
  {
    _id: 'short_5',
    title: '10 SECRETS to Master CSS Grid & Flexbox! 🎨 #css #frontend',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    channel: 'T-Series',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tseries',
    likes: 312000,
    dislikes: 540,
    commentsCount: 890,
    audioTitle: 'T-Series • Music Track',
    isSubscribed: true,
    isLiked: false
  }
];

export const getShortsVideos = () => SHORTS_DATA;

export const videoAPI = {
  getAll: async () => ({ data: ALL_VIDEOS })
};

export default {
  getAllVideos,
  getPopularVideos,
  getVideosByCategory,
  searchVideos,
  getVideoById,
  getRelatedVideos,
  getSubscriptionVideos,
  getShortsVideos,
  filterVideosByCategory,
  videoAPI
};



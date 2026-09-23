import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyB8roM1_jDs7_XF4xT5dIDpm6eC5Smqr0Q';

// Real YouTube video IDs for variety
const REAL_VIDEO_IDS = [
  'dQw4w9WgXcQ', // Never Gonna Give You Up
  '9bZkp7q19f0', // Gangnam Style
  'kJQP7kiw5Fk', // Despacito
  'JGwWNGJdvx8', // Shape of You
  'RgKAFK5djSk', // See You Again
  'YQHsXMglC9A', // Hello - Adele
  'OPf0YbXqDm0', // Uptown Funk
  '09R8_2nJtjg', // Sugar
  'ru0K8uYEZWw', // Thinking Out Loud
  'pRpeEdMmmQ0', // Shake It Off
  'oyEuk8j8imI', // Blinding Lights
  'WDZJPJV__bQ', // Bad Guy
  'TdrL3QxjyVw', // Rockstar
  'k2qgadSvNyU', // Believer
  'fJ9rUzIMcZQ', // Bohemian Rhapsody
  'tAGnKpE4NCI', // Thriller
  'hTWKbfoikeg', // Smells Like Teen Spirit
  'wmin5WkOuPw', // Sweet Child O' Mine
  '1w7OgIMMRc4', // Hotel California
  'vCadcBR95oU', // Another Brick in the Wall
];

// YouTube-like video templates with diverse categories
const VIDEO_TEMPLATES = [
  // Music
  { title: 'Mega Victory Mass Lyrical Video | Chiranjeevi | Venkatesh | Anil Ravipudi', channel: 'T-Series Telugu', category: 'music' },
  { title: 'Naal Nachna | Dhurandhar | Ranveer Singh, Sara Ali Khan', channel: 'Saregama Music', category: 'music' },
  { title: 'Jawan 4K Video Songs | Zinda Banda | Shah Rukh Khan', channel: 'T-Series', category: 'music' },
  { title: 'Animal All Songs | Arjan Vailly | Satranga', channel: 'T-Series', category: 'music' },
  { title: 'Lo-Fi Hip Hop Radio 📚 Beats to Relax / Study to 24/7', channel: 'Lofi Girl', category: 'music' },
  { title: 'Coldplay - Yellow (Official Video)', channel: 'Coldplay', category: 'music' },
  { title: 'Arijit Singh Ultimate Love Mashup 2024', channel: 'Bollywood Melodies', category: 'music' },

  // Gaming
  { title: 'I Found Scary Villager City in Minecraft...', channel: 'CarryMinati', category: 'gaming' },
  { title: 'How To Get All 16 NEW BRAINROTS in Find the Brainrot', channel: 'Mythione', category: 'gaming' },
  { title: 'POOR vs RICH Mega Motorcycle Ramp In GTA 5', channel: 'Karry Kraft', category: 'gaming' },
  { title: 'MINECRAFT BUT VILLAGERS ARE SCARY!', channel: 'Techno Gamerz', category: 'gaming' },
  { title: 'GTA 6 OFFICIAL TRAILER 2 REACTION & BREAKDOWN', channel: 'Gamers Zone', category: 'gaming' },
  { title: 'Valorant Champions Tour Grand Finals Highlights', channel: 'VALORANT Esports', category: 'gaming' },

  // Tech & Learning
  { title: 'iPhone 16 Pro Max Unboxing & Review', channel: 'Technical Guruji', category: 'technology' },
  { title: 'Samsung Galaxy S24 Ultra First Look & Camera Test', channel: 'Trakin Tech', category: 'technology' },
  { title: 'New Tech Gadgets 2024 You Must Have', channel: 'Unbox Therapy', category: 'technology' },
  { title: 'Full Stack Web Development Course 2024 (HTML, CSS, JS, React)', channel: 'CodeWithHarry', category: 'learning' },
  { title: 'Artificial Intelligence & Neural Networks Explained Simply', channel: 'Fireship', category: 'learning' },

  // News & Live
  { title: 'Election Results 2024 Live Updates & Analysis', channel: 'Times Now', category: 'news' },
  { title: 'Stock Market Today: Sensex Nifty Live Trading Session', channel: 'CNBC TV18', category: 'news' },
  { title: 'ISRO Space Mission Launch LIVE Stream 🚀', channel: 'ISRO Official', category: 'live' },
  { title: 'Global World News 24/7 Live Stream', channel: 'BBC News', category: 'live' },

  // Comedy & Entertainment
  { title: 'CarryMinati Roasts | Funny Compilation 2024', channel: 'CarryMinati', category: 'comedy' },
  { title: 'BB Ki Vines | Funny Sketches & Standup', channel: 'BB Ki Vines', category: 'comedy' },
  { title: 'The Kapil Sharma Show - Funniest Moments', channel: 'SET India', category: 'comedy' },
  { title: 'Stranger Things 5 | Finale Official Trailer | Netflix', channel: 'Netflix', category: 'films' },

  // Sports
  { title: 'Virat Kohli 50th ODI Century | World Cup Highlights', channel: 'ICC', category: 'sports' },
  { title: 'MS Dhoni Last Ball Finish | IPL Highlights', channel: 'IPL Official', category: 'sports' },
  { title: 'Messi Unbelievable Solo Goal | FIFA World Cup', channel: 'FIFA', category: 'sports' },
  { title: 'Real Madrid vs Barcelona - El Clasico Thriller', channel: 'LaLiga Santander', category: 'sports' },
];

// Generate unique videos
const generateUniqueVideos = (count, categoryFilter = 'all') => {
  const videos = [];
  const usedTitles = new Set();
  
  // Filter templates matching category if specified
  let templates = VIDEO_TEMPLATES;
  if (categoryFilter && categoryFilter !== 'all') {
    const cLower = categoryFilter.toLowerCase();
    const filtered = VIDEO_TEMPLATES.filter(t => 
      t.category.toLowerCase().includes(cLower) ||
      (cLower === 'tech' && t.category === 'technology') ||
      (cLower === 'learning' && (t.category === 'learning' || t.category === 'technology')) ||
      (cLower === 'trending' && t.title) ||
      (cLower === 'recent' && t.title) ||
      (cLower === 'watched' && t.title) ||
      (cLower === 'new' && t.title)
    );
    if (filtered.length > 0) {
      templates = filtered;
    }
  }

  for (let i = 0; i < count; i++) {
    let videoTemplate = templates[i % templates.length];
    
    const videoId = REAL_VIDEO_IDS[i % REAL_VIDEO_IDS.length] || `video-${Date.now()}-${i}`;
    const views = Math.floor(Math.random() * 10000000) + 100000;
    const daysAgo = Math.floor(Math.random() * 30);
    
    videos.push({
      id: videoId,
      snippet: {
        title: `${videoTemplate.title}${count > 20 ? ` #${i + 1}` : ''}`,
        channelTitle: videoTemplate.channel,
        publishedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
        thumbnails: {
          medium: {
            url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
            width: 320,
            height: 180
          },
          high: {
            url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            width: 480,
            height: 360
          }
        },
        tags: [videoTemplate.category]
      },
      statistics: {
        viewCount: views.toString(),
        likeCount: Math.floor(views * 0.05).toString(),
        commentCount: Math.floor(views * 0.001).toString()
      },
      contentDetails: {
        duration: getRandomDuration(),
        dimension: '2d',
        definition: Math.random() > 0.5 ? 'hd' : 'sd'
      }
    });
  }
  
  console.log(`📺 Generated ${videos.length} unique videos for category: ${categoryFilter}`);
  return videos;
};

const getRandomDuration = () => {
  const durations = ['PT3M30S', 'PT5M15S', 'PT10M45S', 'PT15M20S', 'PT22M10S', 'PT45M30S', 'PT1H15M30S'];
  return durations[Math.floor(Math.random() * durations.length)];
};

// ========== MAIN API FUNCTIONS ==========
export const fetchPopularVideos = async (page = 1, category = 'all') => {
  console.log(`🎬 Fetching page ${page} videos (${category})...`);
  
  try {
    // Try real API first if not custom filtered
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics,contentDetails',
        chart: 'mostPopular',
        regionCode: 'IN',
        maxResults: 20,
        key: API_KEY
      }
    });
    
    const realVideos = response.data.items || [];
    const mockVideos = generateUniqueVideos(30, category);
    
    let allVideos = [...realVideos, ...mockVideos];
    
    if (category !== 'all') {
      const catLower = category.toLowerCase();
      const filtered = allVideos.filter(video => 
        video.snippet.tags?.some(t => t.toLowerCase().includes(catLower)) || 
        video.snippet.title?.toLowerCase().includes(catLower)
      );
      allVideos = filtered.length >= 4 ? filtered : generateUniqueVideos(24, category);
    }
    
    const startIndex = (page - 1) * 30;
    const paginatedVideos = allVideos.slice(startIndex, startIndex + 30);
    
    console.log(`✅ Page ${page}: ${paginatedVideos.length} unique videos`);
    return paginatedVideos;
    
  } catch (error) {
    console.log('❌ Using generated videos for category:', category);
    return generateUniqueVideos(30, category);
  }
};

export const searchVideos = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        maxResults: 50,
        q: query,
        type: 'video',
        key: API_KEY
      }
    });
    
    const searchResults = response.data.items || [];
    
    // Get details for each video
    if (searchResults.length > 0) {
      const videoIds = searchResults.map(item => item.id.videoId).join(',');
      
      const detailsResponse = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: 'statistics,contentDetails',
          id: videoIds,
          key: API_KEY
        }
      });
      
      return searchResults.map((item, index) => ({
        id: item.id.videoId,
        snippet: item.snippet,
        statistics: detailsResponse.data.items?.[index]?.statistics || {
          viewCount: '1000',
          likeCount: '100'
        },
        contentDetails: detailsResponse.data.items?.[index]?.contentDetails || {
          duration: 'PT5M30S'
        }
      }));
    }
    
    return [];
    
  } catch (error) {
    console.error('Search error:', error);
    return generateUniqueVideos(10);
  }
};

export const getVideoDetails = async (videoId) => {
  // Check if it's a real video ID
  if (REAL_VIDEO_IDS.includes(videoId) || videoId.startsWith('video-')) {
    try {
      const response = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: 'snippet,statistics,contentDetails',
          id: videoId,
          key: API_KEY
        }
      });
      
      if (response.data.items?.[0]) {
        return response.data.items[0];
      }
    } catch (error) {
      console.log('Falling back to mock video details');
    }
  }
  
  // Generate realistic video details
  const template = VIDEO_TEMPLATES[Math.floor(Math.random() * VIDEO_TEMPLATES.length)];
  const views = Math.floor(Math.random() * 10000000) + 1000000;
  
  return {
    id: videoId,
    snippet: {
      title: template.title,
      description: `🎬 ${template.title}\n\nOfficial music video. Like, share, and subscribe for more content!\n\nArtist: ${template.channel}\nCategory: ${template.category}\n\n#${template.category} #music #video #trending #2024\n\nFollow us on social media for updates!\n\n© 2024 YouTube Clone. All rights reserved.`,
      channelTitle: template.channel,
      publishedAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
      thumbnails: {
        medium: {
          url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
          width: 320,
          height: 180
        },
        high: {
          url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          width: 480,
          height: 360
        },
        standard: {
          url: `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
          width: 640,
          height: 480
        }
      },
      tags: [template.category, 'music', 'video', 'trending']
    },
    statistics: {
      viewCount: views.toString(),
      likeCount: Math.floor(views * 0.05).toString(),
      commentCount: Math.floor(views * 0.002).toString(),
      subscriberCount: Math.floor(Math.random() * 10000000) + 1000000
    },
    contentDetails: {
      duration: getRandomDuration(),
      dimension: '2d',
      definition: 'hd'
    }
  };
};

export const getVideosByCategory = async (category) => {
  return fetchPopularVideos(1, category);
};
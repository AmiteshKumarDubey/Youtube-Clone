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

// YouTube-like video templates
const VIDEO_TEMPLATES = [
  // Bollywood
  { title: 'Mega Victory Mass Lyrical Video | Chiranjeevi | Venkatesh | Anil Ravipudi', channel: 'T-Series Telugu', category: 'music' },
  { title: 'The RajaSaab Trailer 2.0 (Telugu) | Prabhas | Maruthi | Thaman S', channel: 'People Media Factory', category: 'films' },
  { title: 'Naal Nachna | Dhurandhar | Ranveer Singh, Sara Ali Khan', channel: 'Saregama Music', category: 'music' },
  { title: 'Stranger Things 5 | Finale Trailer | Netflix', channel: 'Netflix', category: 'films' },
  { title: 'TOXIC - Trailer | Rocking Star Yash | Nayanthara', channel: 'T-Series', category: 'films' },
  { title: 'Jawan 4K Video Songs | Zinda Banda | Shah Rukh Khan', channel: 'T-Series', category: 'music' },
  { title: 'Animal All Songs | Arjan Vailly | Satranga', channel: 'T-Series', category: 'music' },
  
  // Gaming
  { title: 'I Found Scary Villager City in Minecraft...', channel: 'CarryMinati', category: 'gaming' },
  { title: 'How To Get All 16 NEW BRAINROTS in Find the Brainrot', channel: 'Mythione', category: 'gaming' },
  { title: 'POOR vs RICH Mega Motorcycle Ramp In GTA 5', channel: 'Karry Kraft', category: 'gaming' },
  { title: 'MINECRAFT BUT VILLAGERS ARE SCARY!', channel: 'Techno Gamerz', category: 'gaming' },
  { title: 'GTA 6 OFFICIAL TRAILER REACTION', channel: 'CarryMinati', category: 'gaming' },
  
  // Tech
  { title: 'iPhone 16 Pro Max Unboxing & Review', channel: 'Technical Guruji', category: 'technology' },
  { title: 'Samsung Galaxy S24 Ultra First Look', channel: 'Trakin Tech', category: 'technology' },
  { title: 'New Tech Gadgets 2024 You Must Have', channel: 'Unbox Therapy', category: 'technology' },
  
  // News
  { title: 'Election Results 2024 Live Updates', channel: 'Times Now', category: 'news' },
  { title: 'Stock Market Today: Sensex Nifty Live', channel: 'CNBC TV18', category: 'news' },
  
  // Entertainment
  { title: 'CarryMinati Roasts | Funny Compilation 2024', channel: 'CarryMinati', category: 'comedy' },
  { title: 'BB Ki Vines | Funny Videos Compilation', channel: 'BB Ki Vines', category: 'comedy' },
  { title: 'AIB Comedy Sketches Best Of', channel: 'AIB', category: 'comedy' },
  { title: 'Kapil Sharma Show Best Episodes', channel: 'SET India', category: 'comedy' },
  
  // Sports
  { title: 'Virat Kohli 50th Century | World Cup 2023', channel: 'ICC', category: 'sports' },
  { title: 'MS Dhoni Last Match | IPL Final 2023', channel: 'IPL', category: 'sports' },
  { title: 'Messi World Cup 2022 Final Goal', channel: 'FIFA', category: 'sports' },
];

// Generate unique videos
const generateUniqueVideos = (count) => {
  const videos = [];
  const usedTitles = new Set();
  
  for (let i = 0; i < count; i++) {
    let videoTemplate;
    let attempts = 0;
    
    // Ensure unique title
    do {
      videoTemplate = VIDEO_TEMPLATES[Math.floor(Math.random() * VIDEO_TEMPLATES.length)];
      attempts++;
      if (attempts > 100) break; // Prevent infinite loop
    } while (usedTitles.has(videoTemplate.title) && attempts < 100);
    
    usedTitles.add(videoTemplate.title);
    
    const videoId = REAL_VIDEO_IDS[i % REAL_VIDEO_IDS.length] || `video-${Date.now()}-${i}`;
    const views = Math.floor(Math.random() * 10000000) + 100000;
    const daysAgo = Math.floor(Math.random() * 365);
    
    videos.push({
      id: videoId,
      snippet: {
        title: `${videoTemplate.title} ${i + 1}`,
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
  
  console.log(`📺 Generated ${videos.length} unique videos`);
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
    // Try real API first
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
    const mockVideos = generateUniqueVideos(20);
    
    // Combine and filter by category
    let allVideos = [...realVideos, ...mockVideos];
    
    if (category !== 'all') {
      allVideos = allVideos.filter(video => 
        video.snippet.tags?.includes(category) || 
        video.snippet.title?.toLowerCase().includes(category)
      );
    }
    
    // Add pagination
    const startIndex = (page - 1) * 50;
    const paginatedVideos = allVideos.slice(startIndex, startIndex + 50);
    
    console.log(`✅ Page ${page}: ${paginatedVideos.length} unique videos`);
    return paginatedVideos;
    
  } catch (error) {
    console.log('❌ Using unique mock videos');
    const mockVideos = generateUniqueVideos(50);
    
    if (category !== 'all') {
      return mockVideos.filter(video => 
        video.snippet.tags?.includes(category) || 
        video.snippet.title?.toLowerCase().includes(category)
      );
    }
    
    return mockVideos;
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
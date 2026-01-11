import { useState, useEffect } from 'react';
import { fetchVideos, searchVideos, testBackendConnection } from '../services/api';

export const useVideos = (category = 'all', searchQuery = '') => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [backendStatus, setBackendStatus] = useState(null);

    useEffect(() => {
        const loadVideos = async () => {
            setLoading(true);
            setError(null);
            
            try {
                console.log('🔄 Loading videos...', { category, searchQuery });
                
                // Test backend connection first
                const connection = await testBackendConnection();
                setBackendStatus(connection);
                console.log('🔌 Backend status:', connection);
                
                let data;
                
                if (searchQuery.trim()) {
                    console.log('🔍 Performing search:', searchQuery);
                    data = await searchVideos(searchQuery);
                } else {
                    console.log('📺 Fetching category:', category);
                    data = await fetchVideos(category);
                }
                
                console.log('✅ Videos loaded:', data.length);
                setVideos(data || []);
                
            } catch (err) {
                console.error('❌ Error loading videos:', err);
                setError(err.message || 'Failed to load videos');
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };

        loadVideos();
    }, [category, searchQuery]);

    return { 
        videos, 
        loading, 
        error, 
        backendStatus,
        refetch: () => {
            setLoading(true);
            setTimeout(() => loadVideos(), 100);
        }
    };
};
import admin from '../config/firebase.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userId = decodedToken.uid;
    req.username = decodedToken.name || decodedToken.email.split('@')[0];
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
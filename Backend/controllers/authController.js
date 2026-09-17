import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User with this email already exists' });
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    const user = await User.create({ 
      name, 
      email, 
      passwordHash,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
    });
    
    const jwtSecret = process.env.JWT_SECRET || 'yt_clone_super_secret_jwt_key_2026';
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });
    
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });
    
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });
    
    const jwtSecret = process.env.JWT_SECRET || 'yt_clone_super_secret_jwt_key_2026';
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });
    
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error during login' });
  }
};

export const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token provided' });
    
    const jwtSecret = process.env.JWT_SECRET || 'yt_clone_super_secret_jwt_key_2026';
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id).select('-passwordHash');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    
    res.json({ user });
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};


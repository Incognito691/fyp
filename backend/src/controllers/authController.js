import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// Initialize Google Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        language: user.language,
        hasOnboarded: user.hasOnboarded,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        language: user.language,
        hasOnboarded: user.hasOnboarded,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Google Login
// @route   POST /api/auth/google
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body; 

    // 1. Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture, sub: googleId } = ticket.getPayload();

    // 2. Check/Create User
    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture;
        await user.save();
      }
    } else {
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture,
      });
    }

    // 3. Return Token
    res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      language: user.language,
      hasOnboarded: user.hasOnboarded,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(400).json({ success: false, message: 'Google Login Failed' });
  }
};

// @desc    Complete Onboarding
// @route   PUT /api/auth/onboarding
export const completeOnboarding = async (req, res) => {
  try {
    console.log('📝 Onboarding request:', {
      userId: req.user?._id,
      body: req.body,
      hasUser: !!req.user,
    });

    const { language } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      user.language = language || 'en';
      user.hasOnboarded = true;
      const updatedUser = await user.save();

      console.log('✅ Onboarding completed for:', updatedUser.email);

      res.json({
        success: true,
        _id: updatedUser._id,
        name: updatedUser.name,
        language: updatedUser.language,
        hasOnboarded: updatedUser.hasOnboarded,
        token: generateToken(updatedUser._id),
      });
    } else {
      console.log('❌ User not found:', req.user._id);
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('❌ Onboarding error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
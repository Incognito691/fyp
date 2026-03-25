import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log('🔐 Verifying token:', token.substring(0, 20) + '...');
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token decoded, user ID:', decoded.id);
      
      req.user = await User.findById(decoded.id).select("-password");
      
      if (!req.user) {
        console.log('❌ User not found in database');
        return res.status(401).json({ success: false, message: "User not found" });
      }
      
      console.log('✅ User authenticated:', req.user.email);
      return next();
    } catch (error) {
      console.error('❌ Token verification failed:', error.message);
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    console.log('❌ No token provided');
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};

export default protect;

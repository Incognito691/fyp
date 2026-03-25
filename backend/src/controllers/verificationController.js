import PhoneNumber from '../models/PhoneNumber.js';

// @desc    Verify if a phone number is scam
// @route   POST /api/verify
// @access  Protected
export const verifyPhoneNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    console.log('📞 Verification request for:', phoneNumber);
    
    // Validation
    if (!phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number is required' 
      });
    }
    
    // Check if number exists in database
    let numberRecord = await PhoneNumber.findOne({ phoneNumber });
    
    if (!numberRecord) {
      // Number not reported yet - it's safe
      console.log('✅ Number not in database - Safe');
      return res.json({
        success: true,
        isScam: false,
        riskLevel: 'LOW',
        riskScore: 0,
        totalReports: 0,
        aiDetections: 0,
        manualReports: 0,
        scamTypes: [],
        message: 'This number has not been reported as scam'
      });
    }
    
    // Number exists - return details
    console.log('⚠️ Number found in database:', {
      riskLevel: numberRecord.riskLevel,
      riskScore: numberRecord.riskScore,
      totalReports: numberRecord.totalReports
    });
    
    res.json({
      success: true,
      isScam: numberRecord.riskLevel === 'HIGH',
      riskLevel: numberRecord.riskLevel,
      riskScore: numberRecord.riskScore,
      totalReports: numberRecord.totalReports,
      aiDetections: numberRecord.aiDetections,
      manualReports: numberRecord.manualReports,
      scamTypes: numberRecord.scamTypes,
      firstDetected: numberRecord.firstDetected,
      lastActivity: numberRecord.lastActivity,
      status: numberRecord.status
    });
    
  } catch (error) {
    console.error('❌ Verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get detailed information about a phone number
// @route   GET /api/verify/:number
// @access  Protected
export const getNumberDetails = async (req, res) => {
  try {
    const { number } = req.params;
    
    console.log('📋 Getting details for:', number);
    
    const numberRecord = await PhoneNumber.findOne({ phoneNumber: number })
      .populate('reportedBy', 'name email');
    
    if (!numberRecord) {
      return res.status(404).json({
        success: false,
        message: 'Number not found in database'
      });
    }
    
    res.json({
      success: true,
      data: {
        phoneNumber: numberRecord.phoneNumber,
        countryCode: numberRecord.countryCode,
        riskLevel: numberRecord.riskLevel,
        riskScore: numberRecord.riskScore,
        totalReports: numberRecord.totalReports,
        aiDetections: numberRecord.aiDetections,
        manualReports: numberRecord.manualReports,
        scamTypes: numberRecord.scamTypes,
        status: numberRecord.status,
        firstDetected: numberRecord.firstDetected,
        lastActivity: numberRecord.lastActivity,
        reportedBy: numberRecord.reportedBy,
        createdAt: numberRecord.createdAt,
        updatedAt: numberRecord.updatedAt
      }
    });
    
  } catch (error) {
    console.error('❌ Get details error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get recent scam numbers
// @route   GET /api/verify/recent
// @access  Protected
export const getRecentScams = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const recentScams = await PhoneNumber.find({ 
      riskLevel: { $in: ['MEDIUM', 'HIGH'] } 
    })
      .sort({ lastActivity: -1 })
      .limit(limit)
      .select('-reportedBy -__v');
    
    res.json({
      success: true,
      count: recentScams.length,
      data: recentScams
    });
    
  } catch (error) {
    console.error('❌ Get recent scams error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get statistics
// @route   GET /api/verify/stats
// @access  Protected
export const getStats = async (req, res) => {
  try {
    const totalNumbers = await PhoneNumber.countDocuments();
    const highRisk = await PhoneNumber.countDocuments({ riskLevel: 'HIGH' });
    const mediumRisk = await PhoneNumber.countDocuments({ riskLevel: 'MEDIUM' });
    const lowRisk = await PhoneNumber.countDocuments({ riskLevel: 'LOW' });
    
    const totalReports = await PhoneNumber.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalReports' }
        }
      }
    ]);
    
    res.json({
      success: true,
      stats: {
        totalNumbers,
        highRisk,
        mediumRisk,
        lowRisk,
        totalReports: totalReports[0]?.total || 0
      }
    });
    
  } catch (error) {
    console.error('❌ Get stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

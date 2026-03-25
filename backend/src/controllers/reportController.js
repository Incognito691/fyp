import Report from '../models/Report.js';
import PhoneNumber from '../models/PhoneNumber.js';

// @desc    Submit a scam report
// @route   POST /api/reports
// @access  Protected
export const submitReport = async (req, res) => {
  try {
    const { phoneNumber, scamType, description, messageMetadata } = req.body;
    const userId = req.user._id;
    
    console.log('📝 Report submission:', {
      userId,
      phoneNumber,
      scamType
    });
    
    // Validation
    if (!phoneNumber || !scamType) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and scam type are required'
      });
    }
    
    // Check if user already reported this number
    const alreadyReported = await Report.hasUserReported(userId, phoneNumber);
    
    if (alreadyReported) {
      return res.status(400).json({
        success: false,
        message: 'You have already reported this number'
      });
    }
    
    // Create report
    const report = await Report.create({
      userId,
      phoneNumber,
      scamType,
      description,
      messageMetadata: messageMetadata || {}
    });
    
    console.log('✅ Report created:', report._id);
    
    // Update or create phone number record
    let numberRecord = await PhoneNumber.findOne({ phoneNumber });
    
    if (numberRecord) {
      // Update existing record
      console.log('📊 Updating existing number record');
      
      numberRecord.manualReports += 1;
      numberRecord.totalReports += 1;
      
      // Add user to reportedBy if not already there
      if (!numberRecord.reportedBy.includes(userId)) {
        numberRecord.reportedBy.push(userId);
      }
      
      // Add scam type if not already in array
      if (!numberRecord.scamTypes.includes(scamType)) {
        numberRecord.scamTypes.push(scamType);
      }
      
      numberRecord.lastActivity = new Date();
      
      // Recalculate risk score
      numberRecord.calculateRiskScore();
      
      await numberRecord.save();
      
      console.log('✅ Number record updated:', {
        riskScore: numberRecord.riskScore,
        riskLevel: numberRecord.riskLevel,
        totalReports: numberRecord.totalReports
      });
      
    } else {
      // Create new record
      console.log('📊 Creating new number record');
      
      numberRecord = await PhoneNumber.create({
        phoneNumber,
        manualReports: 1,
        totalReports: 1,
        scamTypes: [scamType],
        reportedBy: [userId]
      });
      
      numberRecord.calculateRiskScore();
      await numberRecord.save();
      
      console.log('✅ New number record created:', {
        riskScore: numberRecord.riskScore,
        riskLevel: numberRecord.riskLevel
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Report submitted successfully',
      report: {
        _id: report._id,
        phoneNumber: report.phoneNumber,
        scamType: report.scamType,
        status: report.status,
        createdAt: report.createdAt
      },
      updatedRisk: {
        riskLevel: numberRecord.riskLevel,
        riskScore: numberRecord.riskScore,
        totalReports: numberRecord.totalReports
      }
    });
    
  } catch (error) {
    console.error('❌ Report submission error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get reports for a specific phone number
// @route   GET /api/reports/:number
// @access  Protected
export const getReportsForNumber = async (req, res) => {
  try {
    const { number } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    console.log('📋 Getting reports for:', number);
    
    const reports = await Report.find({ phoneNumber: number })
      .populate('userId', 'name')
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-__v');
    
    res.json({
      success: true,
      count: reports.length,
      phoneNumber: number,
      reports
    });
    
  } catch (error) {
    console.error('❌ Get reports error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's submitted reports
// @route   GET /api/reports/my
// @access  Protected
export const getMyReports = async (req, res) => {
  try {
    const userId = req.user._id;
    const limit = parseInt(req.query.limit) || 20;
    
    console.log('📋 Getting reports for user:', userId);
    
    const reports = await Report.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-__v');
    
    res.json({
      success: true,
      count: reports.length,
      reports
    });
    
  } catch (error) {
    console.error('❌ Get my reports error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get report statistics for user
// @route   GET /api/reports/my/stats
// @access  Protected
export const getMyReportStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const totalReports = await Report.countDocuments({ userId });
    const pendingReports = await Report.countDocuments({ userId, status: 'pending' });
    const verifiedReports = await Report.countDocuments({ userId, status: 'verified' });
    
    // Get scam type breakdown
    const scamTypeBreakdown = await Report.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$scamType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      stats: {
        totalReports,
        pendingReports,
        verifiedReports,
        scamTypeBreakdown
      }
    });
    
  } catch (error) {
    console.error('❌ Get report stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete a report (user can delete their own)
// @route   DELETE /api/reports/:id
// @access  Protected
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    const report = await Report.findById(id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    // Check if user owns this report
    if (report.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this report'
      });
    }
    
    await report.deleteOne();
    
    // Update phone number record
    const numberRecord = await PhoneNumber.findOne({ phoneNumber: report.phoneNumber });
    if (numberRecord) {
      numberRecord.manualReports = Math.max(0, numberRecord.manualReports - 1);
      numberRecord.totalReports = Math.max(0, numberRecord.totalReports - 1);
      numberRecord.calculateRiskScore();
      await numberRecord.save();
    }
    
    res.json({
      success: true,
      message: 'Report deleted successfully'
    });
    
  } catch (error) {
    console.error('❌ Delete report error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

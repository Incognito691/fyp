import mongoose from 'mongoose';

const phoneNumberSchema = mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  countryCode: {
    type: String,
    default: '+977'
  },
  
  // Detection metrics
  aiDetections: {
    type: Number,
    default: 0,
    min: 0
  },
  manualReports: {
    type: Number,
    default: 0,
    min: 0
  },
  totalReports: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Risk assessment
  riskScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  riskLevel: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'LOW'
  },
  
  // Scam details
  scamTypes: [{
    type: String,
    enum: ['lottery', 'banking', 'prize', 'phishing', 'loan', 'investment', 'other']
  }],
  
  // User tracking
  reportedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Status
  status: {
    type: String,
    enum: ['active', 'verified_scam', 'false_positive', 'under_review'],
    default: 'active'
  },
  
  // Timestamps
  firstDetected: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
});

// Method to calculate risk score
phoneNumberSchema.methods.calculateRiskScore = function() {
  // Weights for different factors
  const AI_WEIGHT = 40;
  const MANUAL_WEIGHT = 60;
  
  // Calculate scores (cap at 100)
  const aiScore = Math.min(this.aiDetections * 10, 100);
  const manualScore = Math.min(this.manualReports * 20, 100);
  
  // Weighted average
  this.riskScore = Math.round(
    (aiScore * AI_WEIGHT + manualScore * MANUAL_WEIGHT) / 100
  );
  
  // Update risk level based on score
  if (this.riskScore < 40) {
    this.riskLevel = 'LOW';
  } else if (this.riskScore < 70) {
    this.riskLevel = 'MEDIUM';
  } else {
    this.riskLevel = 'HIGH';
  }
  
  // Update last activity
  this.lastActivity = new Date();
  
  return this.riskScore;
};

// Static method to find or create phone number
phoneNumberSchema.statics.findOrCreate = async function(phoneNumber) {
  let record = await this.findOne({ phoneNumber });
  
  if (!record) {
    record = await this.create({ phoneNumber });
  }
  
  return record;
};

const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema);

export default PhoneNumber;

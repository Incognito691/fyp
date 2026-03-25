import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  phoneNumber: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  
  // Report details
  scamType: {
    type: String,
    enum: ['lottery', 'banking', 'prize', 'phishing', 'loan', 'investment', 'other'],
    required: true
  },
  
  description: {
    type: String,
    maxlength: 500,
    trim: true
  },
  
  // Message metadata (NOT actual content for privacy)
  messageMetadata: {
    hasURL: {
      type: Boolean,
      default: false
    },
    hasPhoneNumber: {
      type: Boolean,
      default: false
    },
    messageLength: {
      type: Number,
      default: 0
    }
  },
  
  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  
  // Admin review
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: {
    type: Date
  },
  reviewNotes: {
    type: String,
    maxlength: 200
  }
}, { 
  timestamps: true 
});

// Index for faster queries
reportSchema.index({ phoneNumber: 1, userId: 1 });
reportSchema.index({ createdAt: -1 });

// Static method to check if user already reported this number
reportSchema.statics.hasUserReported = async function(userId, phoneNumber) {
  const report = await this.findOne({ userId, phoneNumber });
  return !!report;
};

const Report = mongoose.model('Report', reportSchema);

export default Report;

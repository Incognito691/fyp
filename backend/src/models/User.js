import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // UPDATED: Password is only required if Google ID is missing
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    // NEW: Stores the Google ID (e.g., "1029384...")
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple users to have 'null' googleId (normal users)
    },
    // NEW: Stores Google Profile Picture
    avatar: {
      type: String,
      default: "",
    },
    isAdmin: { type: Boolean, required: true, default: false },

    // --- ONBOARDING FIELDS ---
    language: {
      type: String,
      enum: ["en", "ne"],
      default: "en",
    },
    hasOnboarded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Middleware: Encrypt password before saving
userSchema.pre("save", async function () {
  // If password is not modified OR if it doesn't exist (Google User), skip
  if (!this.isModified("password") || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method: check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  // If user has no password (Google User), return false immediately
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

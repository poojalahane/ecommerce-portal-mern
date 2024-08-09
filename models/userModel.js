import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      type: {},
      required: false,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,

      default: 0,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the User model
export default mongoose.model("users", userSchema);

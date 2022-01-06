const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Please try a different email"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please fill a valid email address",
    ],
  },
  role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
  },
  password: {
      type: String,
      minlength: [6, "Please provide a password with min length: 6"],
      required: [true, "Please provide a valid password"],
      select: false,
  },
  createdAt: {
      type: Date,
      default: Date.now,
  },
  title: {
      type: String,
  },
  about: {
      type: String
  },
  place: {
      type: String
  },
  website: {
      type: String
  },
  profileImage: {
      type: String,
      default: "default.jpg"
  },
  blocked: {
      type: Boolean,
      default: false
  }
});

module.exports = mongoose.model("User", UserSchema);
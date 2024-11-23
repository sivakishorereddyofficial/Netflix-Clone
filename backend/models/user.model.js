import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  activityLog: {
    type: Array,
    default: [],
  },
});

export const Account = mongoose.model("Account", accountSchema);

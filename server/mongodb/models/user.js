import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  company: { type: String, required: true },
  token: { type: String },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;

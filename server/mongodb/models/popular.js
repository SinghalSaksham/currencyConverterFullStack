import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const popularSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  frequency: { type: Number, default: 0 },
});

const popularModel = mongoose.model("popular", popularSchema);

export default popularModel;

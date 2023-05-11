import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const favouriteSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  userId: { type: String, required: true },
});

const favouriteModel = mongoose.model("favourite", favouriteSchema);

export default favouriteModel;

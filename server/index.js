import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import userRoutes from "./routes/user.js";
import favouriteRoutes from "./routes/favourite.js";
import popularRoutes from "./routes/popular.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/favourite", favouriteRoutes);
app.use("/popular", popularRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);

    app.listen(process.env.PORT, () =>
      console.log(`Server started on port http://localhost:${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();

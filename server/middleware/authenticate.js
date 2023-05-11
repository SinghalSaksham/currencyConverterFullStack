import jwt from "jsonwebtoken";
import userModel from "../mongodb/models/user.js";
import * as dotenv from "dotenv";

dotenv.config();

export const Authenticate = async (req, res, next) => {
  try {
    const { token } = req.body;
    // console.log("token", token);

    if (token == "" || token == undefined)
      res.status(404).json({ message: "Unauthenticated" });
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await userModel.findOne({
      _id: verifyToken._id,
    });

    // console.log("verifyY=Token", rootUser);
    if (!rootUser) {
      res.status(401).json({ message: "User not Found" });
    }

    req.token = token;
    req.rootUser = rootUser;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    console.log(error);
  }
};

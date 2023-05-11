import userModel from "../mongodb/models/user.js";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

//email config

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.find({ _id: id });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, company } = req.body;
    // console.log("email", email);

    const userExists = await userModel.findOne({ email });
    // console.log("userExists", userExists);

    if (userExists) return res.status(409).json(userExists);

    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log(hashedPassword);

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      company,
    });

    // console.log("newUser", newUser);
    // const token = createToken()
    const userId = newUser._id.toHexString();
    // console.log("userId", userId);
    // console.log("user", newUser);
    const token = createToken(userId);
    // console.log("token", token);
    const resp = await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          token: token,
        },
      }
    );

    res.status(200).json({ email, token });
  } catch (error) {
    console.log("error", error.message);
    res.status(404).json({ message: error.message });
  }
};

export const checkUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("email", email);
    // console.log("password", password);
    const userExists = await userModel.findOne({ email });
    // console.log("userExixtssss", userExists);
    if (userExists) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        userExists.password
      );
      const userId = userExists._id.toHexString();
      // console.log("entered", isPasswordCorrect);
      // console.log("id", userExists._id.toHexString());
      // const token = jwt.sign({ userId }, process.env.SECRET_KEY);

      // token = await userModel.generateAuthToken();
      // console.log("token", token);
      if (!isPasswordCorrect)
        res.status(401).json({ message: "Password is Incorrect" });
      else {
        const token = createToken(userId);
        // console.log("token", token);
        const resp = await userModel.findOneAndUpdate(
          { email },
          {
            $set: {
              token: token,
            },
          }
        );

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
        });
        // console.log("ressssss", resp);
        // const token = jwt.sign({ userId }, process.env.SECRET_KEY);
        res.status(200).json({
          email,
          token,
          id: userExists._id,
        });
        // res.status(200).json(userExists);
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      res.status(200).json(userExists);
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editDetails = async (req, res) => {
  try {
    const { name, email, company, revenuePercent, isActive, _id } = req.body;

    // console.log("isAdmin", isAdmin);
    // console.log("company", company);

    const user = await userModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          name,
          company,
          revenuePercent,
          isActive,
        },
      }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const checkValidity = async (req, res) => {
  try {
    res.status(200).json(req.rootUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

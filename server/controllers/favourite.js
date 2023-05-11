import favouriteModel from "../mongodb/models/favourite.js";
import * as dotenv from "dotenv";

dotenv.config();

export const createFavourite = async (req, res) => {
  try {
    const { userId, from, to } = req.body;

    const newFavourite = await favouriteModel.create({ from, to, userId });

    res.status(200).json(newFavourite);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const checkFavourite = async (req, res) => {
  try {
    const { userId, from, to } = req.body;

    const favourite = await favouriteModel.findOne({ userId, from, to });

    res.status(200).json(favourite);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const unMarkFavourite = async (req, res) => {
  try {
    const { userId, from, to } = req.body;

    await favouriteModel.deleteOne({ userId, from, to });
    res.status(200).json({ message: "Removed from favourite successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFavourites = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const favourites = await favouriteModel.find({ userId: id });
    console.log(favourites);

    res.status(200).json(favourites);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

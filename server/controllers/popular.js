import popularModel from "../mongodb/models/popular.js";
import * as dotenv from "dotenv";

dotenv.config();

export const updateFrequency = async (req, res) => {
  try {
    const { from, to } = req.body;

    // console.log(from, to);

    const currencyPair = await popularModel.findOne({ from, to });

    if (currencyPair) {
      currencyPair.frequency++;
      await currencyPair.save();
    } else {
      await popularModel.create({ from, to, frequency: 1 });
    }

    res.status(200).json({ message: "Data Updated Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPopularPairs = async (req, res) => {
  try {
    const popularPairs = await popularModel
      .find()
      .sort({ frequency: -1 })
      .limit(6);

    res.status(200).json(popularPairs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

import express from "express";

import {
  getFavourites,
  createFavourite,
  checkFavourite,
  unMarkFavourite,
} from "../controllers/favourite.js";

const router = express.Router();

router.post("/", createFavourite);
router.post("/isMarked", checkFavourite);
router.post("/unMark", unMarkFavourite);
router.get("/:id", getFavourites);

export default router;

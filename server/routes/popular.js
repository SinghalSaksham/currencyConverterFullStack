import express from "express";

import { getPopularPairs, updateFrequency } from "../controllers/popular.js";

const router = express.Router();

router.post("/", updateFrequency);
router.get("/", getPopularPairs);

export default router;

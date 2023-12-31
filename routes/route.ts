import express from "express";
import mediaInfo from "../controllers/mediaInfo";
import getEpisodes from "../controllers/getEpisodes";
import getStream from "../controllers/getStream";

const router = express.Router();

router.get("/mediaInfo", mediaInfo);
router.get("/getEpisodes", getEpisodes);
router.get("/getStream", getStream);

export default router;

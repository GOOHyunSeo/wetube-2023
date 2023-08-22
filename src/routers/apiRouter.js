import express from "express";
import { registerview } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerview);

export default apiRouter;

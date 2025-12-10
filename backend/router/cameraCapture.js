import express from "express";
import cameraImg from "../middlware/cameraMulter.js"
import { aiModel } from "../controller/camera-img.js";
import userAuth from "../middlware/userAuth.js";

const cameraRouter = express.Router();
cameraRouter.post(
	"/ai-model",
	userAuth,
	aiModel
);
export default cameraRouter;
import express from "express";
import cameraImg from "../middlware/cameraMulter.js"
import { aiModel, capture, deleteImg, getAll } from "../controller/camera-img.js";
import userAuth from "../middlware/userAuth.js";

const cameraRouter = express.Router();
cameraRouter.post("/capture-img",userAuth,cameraImg.single("image"),capture);
cameraRouter.get("/get-img",userAuth,getAll);
cameraRouter.delete("/delete-img",userAuth,deleteImg);
cameraRouter.post("/ai-model",userAuth,aiModel)
export default cameraRouter;
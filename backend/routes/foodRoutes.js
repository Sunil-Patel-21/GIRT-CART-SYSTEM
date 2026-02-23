import express from "express";
import { addGift,listGift,removeGift,updateGift } from "../controllers/foodControllers.js";
import multer from "multer";

const giftRouter = express.Router();

//image store karne ke liye 

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)

    }
})

const upload = multer({ storage: storage }) // ye middleware h

giftRouter.post("/add",upload.single("image") ,addGift);
giftRouter.get("/list",listGift);
giftRouter.post("/remove",removeGift);
giftRouter.post("/update",upload.single("image"),updateGift);






export default giftRouter;
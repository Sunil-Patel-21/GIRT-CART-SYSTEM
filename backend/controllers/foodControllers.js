import giftModel from "../models/giftModel.js";
import fs from "fs";

//add gift item

const addGift = async (req, res) => {
  let image_filename = req.file.filename;

  const gift = new giftModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await gift.save();
    return res.json({ success: true, message: "Gift Added" });
  } catch (error) {
    console.log("addGift error", error);
    res.json({ success: false, message: "Error" });
  }
};

//fetch karke send karna h frontend pe

const listGift = async (req, res) => {
  try {
    const gifts = await giftModel.find({});
    res.json({ success: true, data: gifts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove gift item
const removeGift = async (req, res) => {
  try {
    const gift = await giftModel.findById(req.body.id);
    
    if (!gift) {
      return res.json({ success: false, message: "Gift not found" });
    }
    
    fs.unlink(`uploads/${gift.image}`, () => {});
    await giftModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Gift Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addGift, listGift, removeGift };

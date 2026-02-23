import mongoose from "mongoose";

const giftSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true,enum:['Flowers','Chocolates','Cakes','Toys','Personalized','Jewelry','Gift Hampers','Plants']}
})


const giftModel = mongoose.models.gift || mongoose.model("gift",giftSchema)


export default giftModel
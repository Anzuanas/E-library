const mongoose=require("mongoose")


const BookSchema=new mongoose.Schema(
    {
        title:{type:String, required:true , unique:true},
        desc:{type:String, required:true,},
        img:{type:String, required:true},
        categories:{type:Array, },
        author:{type:String,required:true },
        price:{type:Number, required:true},
        isAvailable:{type:Boolean, default:true},


    },
    {timestamps:true}
);
module.exports=mongoose.model("Book",BookSchema)
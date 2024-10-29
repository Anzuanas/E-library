const router=require("express").Router();
const Book = require("../models/Product");
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}=require("./verifyToken")

//CREATE
router.post("/",verifyTokenAndAdmin,async(req,res)=>{
    const newProduct=new Book(req.body)

    try{
        const savedProduct=await newProduct.save();
        res.status(200).json(savedProduct);

    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE 
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    
    try{
        const updatedProduct= await Book.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{
            new:true
        })
        res.status(500).json(updatedProduct)
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE

router.delete("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted")
    }catch(err){
        res.status(500).json(err);
    }
})

//GET PRODUCT

router.get("/find/:id",async (req,res)=>{
    try{
       const product= await Book.findById(req.params.id);   
       res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})

//GET ALL PRODUCT

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const products = await Book.find(); // Fetch all products
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  
const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const eventModel=require('../models/eventModel');
router.get('/',(req,res)=>{
eventModel.find()
.exec()
.then(anythin=>{
    res.send(anythin);
})
})


module.exports=router;


// const userModel=require('../models/userModel');
// router.get('/',function(req,res){
  
//     userModel.find({instrument:"guitar"})
//     .exec()
//     .then(anythin=>{
//    // res.json(anythin).status(200);
//     res.send(anythin);
// })});
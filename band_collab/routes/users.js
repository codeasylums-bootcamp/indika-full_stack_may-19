const express=require('express');
const router =express.Router();
const mongoose=require('mongoose');
//const bcryptjs=require('bcryptjs');
const userModel=require('../models/userModel');



router.post('/',function(req,res,next){

    if( req.body.userName &&
        req.body.email &&
        req.body.password &&
        req.body.phoneNumber &&
        req.body.city &&
        req.body.instrument &&
        req.body.genre &&
        req.body.level
        ){
    const newUser= new userModel({
        _id: new mongoose.Types.ObjectId(),
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
        phoneNumber:req.body.phoneNumber,
        city:req.body.city,
        instrument:req.body.instrument,
        genre:req.body.genre,
        level:req.body.level,

 });
 



 userModel.find({email:req.body.email})
 .exec()
 .then(users=>{
     if(users.length>0){
         res.send("Account already exits").status(400);
     }
     else{
         
 userModel.find({userName:req.body.userName})
 .exec()
 .then(user=>{
     if(user.length>0){
         res.send("Account already exits").status(400);
     }
     else{
         newUser.save();
        res.send("account created");
     }
 });
     }
 });
}

else if (req.body.loguserName && req.body.logpassword){
    userModel.authenticate(req.body.loguserName, req.body.logpassword,function(error,userModel){
            if(error ||!userModel){
                // var err = new Error('Wrong email or password.');
                // err.status = 401;

                return res.send("Wrong UserName or Password");
             }
            else{
                
                
                 res.render('login');
        
             }

});

}


});
// router.get('/profile', function (req, res, next) {
//     userModel.findById(req.session.userId)
//       .exec(function (error, user) {
//         if (error) {
//           return next(error);
//         } else {
//           if (user === null) {
//             var err = new Error('Not authorized! Go back!');
//             err.status = 400;
//             return next(err);
//           } else {
//             return res.render('login');
//           }
//         }
//       });
//   });
// userModel.find()
//                 .exec()
//                 .then(array=>
//                     {let citi = userModel.city;
//                    // res.json(array).status(200);
//                    res.render('login',{cities:citi});}
            
//                 )
//                 //var logusername=req.body.loguserName;

//                 //req.session.userId = userModel._id;
//                 //return res.send("login");
                
//              }

// });


module.exports =router;
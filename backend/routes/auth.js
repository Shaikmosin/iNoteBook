const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");
const fetchuser=require("../middleware/fetchuser")
const JWT_SECRET="MOsin";
//ROUTE 1:create a user using:post "/api/auth/" .Doesnt require auth .N o login required
router.post('/createuser',
    [body('email', "enter a valid email").isEmail(), body('name', "enter a valid name").isLength({ min: 5 }), body('password', "enter a valid password").isLength({ min: 5 })],
    async (req, res) => {
        let success=false
        // if there are errors, return bad request and errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // handle validation errors
            return res.status(400).json({ success,errors: errors.array(), message: errors.isEmpty() })

        }
        // check weather the user with this email exists already
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ success,error: "Sorry a user with this email already exists" })
            }
            const salt=await bcrypt.genSalt(10);

            secPass=await bcrypt.hash(req.body.password,salt);
            //create new User
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email

            })

            //   .then(user => res.json(user))
            // .catch(err=>{console.log(err)
            // res.json({error:"please enter a unique value for email",message:err.message})
            // }); 
            // 2nd way to create new User
            // const {name,password,email}=req.body;
            //  user = new User({
            //     name,email,password
    
            // })
            // const savedNote = await user.save()
            
            const data={
                user:{
                    id:user.id
                }
            }
            success=true
            const authToken=jwt.sign(data,JWT_SECRET)
            res.json({success,authToken})
         
        } catch (error) {
            console.error(error.message)
            return res.status(500).send("Internal Server Error")
        }

    })

//ROUTE 2:authenticate a user using:POST "api/auth/login", no login required
router.post('/login',[
    body("email","enter a valid email").isEmail(),
    body("password","password cannot be a blank").exists()
],async(req,res)=>{
    let success=false;
    //if there are errors,return bad request and the errors
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    try{
       let user=await User.findOne({email});
       if(!user){

        return res.status(400).json({success,error:"Please try to login with correct credentials"});
       }
       
       const passwordCompare=await bcrypt.compare(password,user.password);
       if(!passwordCompare){
        success=false;
        return res.status(400).json({success,error:"Please try to login with correct credentials"});
       } 
       const data={
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success, authtoken}); 

    }catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal Server Error")
    }

})
// ROUTE 3: get user using:POST "/api/auth/login". login required
router.post('/getuser',fetchuser,async(req,res)=>{
    try{

        userId=req.user.id
        const user =await User.findById(userId).select("-password")
        res.send(user)


    }catch (error) {
        console.error(error.message)
        return res.status(500).send("Internal Server Error")
    }

}) 

module.exports = router
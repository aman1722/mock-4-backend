const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");



const userRouter = express.Router();



userRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        const isUserExists = await UserModel.findOne({ email });
        if (isUserExists) return res.status(400).send({ msg: "User Already Exists! Please login!" });

        const hashPassword = bcrypt.hashSync(password, +(process.env.SALT_ROUND));
        const newUser = new UserModel({ ...req.body, password: hashPassword });
        await newUser.save();

        res.status(201).send({ msg: "Registration Successful!" });

    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})



userRouter.post('/login', async (req, res) => {
    try {
        const { email,password } = req.body;
        const isUserExists = await UserModel.findOne({ email });
        if(!isUserExists) return res.status(400).send({ msg: "User does not exists! Please login!"});

        const isPasswordCorrect = bcrypt.compareSync(password,isUserExists.password);
        if(!isPasswordCorrect) return res.status(400).send({ msg:"Wrong Credentials"});

        const accessToken = jwt.sign({id:isUserExists._id,address:isUserExists.address},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"5m"});

        res.status(201).send({msg:"Login Sucessfull",accessToken})

    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})



userRouter.patch('/user/:id/reset',async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id);
        const {currentPassword , newPassword} = req.body;
        console.log(currentPassword,newPassword)

        const isUser =await UserModel.findOne({_id:id});

        console.log(isUser)

        const isPasswordCorrect = bcrypt.compareSync(currentPassword,isUser.password);
        if(!isPasswordCorrect) return res.status(400).send({ msg:"Wrong Current Password!"});

        const newHashPassword = bcrypt.hashSync(newPassword, +(process.env.SALT_ROUND));


        await UserModel.findByIdAndUpdate({_id:id},{password:newHashPassword});
        res.status(204).send({msg:"Password Updated Sucessfully!"})
    } catch (error) {
        res.status(400).send({ msg: error,message });
    }
})




module.exports = {
    userRouter
}
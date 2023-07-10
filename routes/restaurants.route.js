const express = require("express");
const { RestaurantModel } = require("../model/restaurant.model");


const restaurantRouter = express.Router();



restaurantRouter.post("/add",async(req,res)=>{
    try {
        const {name} = req.body;
        isResPresent = await RestaurantModel.findOne({name});
        if(isResPresent) return res.status(400).send({msg:"resturant already present!"});
 
        const newRes = new RestaurantModel({...req.body});
        await newRes.save();
        res.status(201).send({msg:"resturent added!"})
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
      
})




restaurantRouter.get("/" ,async(req,res)=>{
    try {
        const restaurant = await RestaurantModel.find({});
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})



restaurantRouter.get("/:id" ,async(req,res)=>{
    try {
        const { id } = req.params;
        const restaurant = await RestaurantModel.findOne({_id:id});
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})





restaurantRouter.get("/:id/menu" ,async(req,res)=>{
    try {
        const { id } = req.params;
        const restaurant = await RestaurantModel.findOne({_id:id});
        res.status(200).send(restaurant.menu);
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})





restaurantRouter.patch("/:id/menu" ,async(req,res)=>{
    try {
        const { id } = req.params;
        const payload = req.body;
        const restaurant = await RestaurantModel.findOne({_id:id});
        await restaurant.menu.push(payload);

        await RestaurantModel.findByIdAndUpdate({_id:id},restaurant)
        res.status(201).send({msg:'new item added!'})
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})





// restaurantRouter.delete("/:resid/menu/:itemid" ,async(req,res)=>{
//     try {
//         const { resid,itemid } = req.params;

//         // const resturant = await RestaurantModel.findOne({_id:resid});

//         // const payload = await resturant.menu.filter((el)=>{
//         //    return el.id !== itemid
//         // });
//         // await RestaurantModel.findByIdAndUpdate({_id:resid},payload)
//         await RestaurantModel.findByIdAndDelete({_id:itemid});
//         res.send("deleted")
//     } catch (error) {
//         res.status(400).send({ msg: error.message });
//     }
// })











module.exports={
    restaurantRouter
}
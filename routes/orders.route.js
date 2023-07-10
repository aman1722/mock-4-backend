const express = require("express");
const { OrderModel } = require("../model/order.model");
const { auth } = require("../middleware/auth");


const orderRouter = express.Router();



orderRouter.post("/", auth, async (req, res) => {
    try {
        const newOrder = new OrderModel({ ...req.body });
        await newOrder.save();
        res.status(201).send({ msg: "Order Place Successfully!" });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})


orderRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findOne({ _id: id });
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})



orderRouter.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {status} = req.body;
        await OrderModel.findByIdAndUpdate({ _id: id },{status:status});
        res.status(204).send({msg:"status updated Successfully!"});

        
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})








module.exports = {
    orderRouter
}
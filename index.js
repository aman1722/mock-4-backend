const express = require("express");
const { connection } = require("./connection/db");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/users.route");
const { restaurantRouter } = require("./routes/restaurants.route");
const { orderRouter } = require("./routes/orders.route");



const app = express();

app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).send("Food Delivery App Home Route!")
})


app.use("/api",userRouter);
app.use("/api/restaurants",restaurantRouter);
app.use("/api/orders",orderRouter);









app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to db!")
    } catch (error) {
        console.log("Unable to connect db!")
        console.log(error.message)
    }
    console.log(`App is running on thr port ${process.env.PORT}!`)
})




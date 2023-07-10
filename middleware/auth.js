const jwt = require("jsonwebtoken");
require("dotenv").config();



const auth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[0] || req.headers.authorization;
    if (token) {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded);
        if (decoded) {
            req.body.user = decoded.id;
            req.body.deliveryAddress=decoded.address;
            next()
        }else{
            res.status(400).send({msg:"please Login First!"})
        }
    }else{
        res.status(400).send({msg:"please Login First!"})
    }
}



module.exports={
    auth
}
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

// console.log(hash);

// const compare = bcrypt.compareSync("pran", hash);
// console.log(compare);
const auth = (req,res,next) => {
    const password = req.body.password;
    if(password){
        const hash = bcrypt.hashSync(password,10);
        req.body.password = hash;
        next();
    }else{
        return res.status(400).json({
            success: false,
            error: "Something is not right"
        })
    }
}

const verifyAuth = async (req,res,next) => {
    try {
        const password = req.body.password;
        const user = await User.findOne({
            email: req.body.email
        })
        if(user){
            const hash = bcrypt.compareSync(password,user.password);
            if(hash){
                req.body = user;
                next();
            }else{
                throw new Error("Password is incorrect");
            }
        }else{
            throw new Error("User not found");
        }
        
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.message
        })
    }
}

const verifyJWT = async (req,res,next) => {
    try {
        console.log(req.headers.token);

        jwt.verify(req.headers.token, process.env.SECRET_KEY, (err,data) => {
            if(err){
                throw new Error("Unauthorized");
            }else{
                next();
            }
        });
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {auth,verifyAuth,verifyJWT};
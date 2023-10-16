const User = require("../models/users");
const jwt = require("jsonwebtoken");

exports.signup = async (req,res) => {
    try {
        const user = await User.create(req.body);
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error
        })
    }
}

exports.login = async (req,res) => {
    try {
        const token = jwt.sign({id: req.body.id, email: req.body.email}, process.env.SECRET_KEY);
        return res.status(200).json({success: true,token});
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}
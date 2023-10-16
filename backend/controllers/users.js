const User = require("../models/users");

exports.signup = async (req,res) => {
    try {
        const user = await User.create(req.body);
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}
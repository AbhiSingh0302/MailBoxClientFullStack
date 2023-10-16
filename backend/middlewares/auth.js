const bcrypt = require("bcryptjs");

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

module.exports = auth;
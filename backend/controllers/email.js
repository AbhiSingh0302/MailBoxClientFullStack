const Email = require("../models/emails");

exports.sendMail = async (req,res) => {
    try {
        const email = await Email.create(req.body);
        
        return res.status(200).json({
            success: true,
            data: email
        })

    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.message
        })
    }
}
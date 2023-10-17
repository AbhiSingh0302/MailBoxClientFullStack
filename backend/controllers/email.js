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

exports.getMail = async (req,res) => {
    try {
        const {status, email} = req.query;
        if(status === "inbox"){
            const emails = await Email.find({to: email})
            return res.status(200).json({
                success: true,
                data: emails
            })
        }
        if(status === "sent"){
            const emails = await Email.find({from: email})
            return res.status(200).json({
                success: true,
                data: emails
            })
        }
        throw new Error("Something went wrong!!");
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

exports.getMessage = async (req,res) => {
    try {
        const id = req.params.id;
        const email = await Email.findById(id);
        email.read = true;
        await email.save();
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
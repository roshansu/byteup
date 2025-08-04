import Session from "../models/session.js";

const handleNewSession = async (req, res) =>{
    await Session.create(req.body)
    res.json({success: true})
}

export default handleNewSession;
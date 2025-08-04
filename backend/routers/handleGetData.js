import User from "../models/user.js";

const handleGetData = async (req, res)=>{
    const data = await User.find({verified: true})
    res.json(data)
}

export default handleGetData
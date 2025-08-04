import User from "../models/user.js"
import { welcomUser } from "../libs/email.config.js";

const handleApprove = async (req, res)=>{
    const {id, verified} = req.body;

    console.log(id, verified)
    const data = await User.findByIdAndUpdate(
        id,
      { verified: verified},
    )
    welcomUser(data.name, data.email)
    res.json({success: true})
}

export default handleApprove
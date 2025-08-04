import User from '../models/user.js'
import verifyPassword from '../libs/verifyPass.js'

const  handleLogin = async (req, res) =>{
    const {email, password, role} = req.body.formData
    console.log('request',req.body.formData.email)
    const exist = await User.findOne({email:email})
    console.log('exist',exist)

    if(!exist){
        return res.json({ message: "Invalid email or password", success: false });
    }
    if(!exist.verified){
        return res.json({ message: "Invalid email or password", success: false });
    }

    const verify = await verifyPassword(password, exist.password)
    if(!verify)
    {
        return res.json({ message: "Invalid email or password", success: false });
    }

    return res.json({ message: "Login success", success: true, id:exist._id, role:exist.role });
    
}

export default handleLogin
import Admin from "../models/admin.js"
import verifyPassword from "../libs/verifyPass.js"

const handleAdminLogin = async (req, res)=>{


    const exist = await Admin.findOne({email:req.body.email})
    console.log(req.body.email, req.body.password)
    console.log(exist)
    if(!exist){
        return res.json({ message: "Invalid email or password", success: false });
    }

    const verify = await verifyPassword(req.body.password, exist.password)
    if(!verify)
    {
        return res.json({ message: "Invalid email or password", success: false });
    }
    
    return res.json({ message: "Login success", success: true, id:exist._id, role:'admin' });
        

}

export default handleAdminLogin
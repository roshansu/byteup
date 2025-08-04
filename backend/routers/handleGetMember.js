 import User from "../models/user.js";
 
 const handleGetMember = async ()=>{
  try {
    const data = await User.find({ role: 'member', verified: true })
    .select('-email -phone -password -review -verified otpVerified');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch member' });
  }

}
export default handleGetMember


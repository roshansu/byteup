 import User from "../models/user.js";
 
 const handleGetTeam = async ()=>{
  try {
    const data = await User.find({ role: 'mentor', verified: true, otpVerified: true })
    .select('-email -phone -password -review -verified otpVerified');;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch mentor' });
  }

}
export default handleGetTeam


import User from "../models/user.js"

const handleGetAdmin = async (req, res) =>{
    try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
}

export default handleGetAdmin
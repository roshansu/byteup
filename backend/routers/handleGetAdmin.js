import User from "../models/user.js"

const handleGetAdmin = async (req, res) =>{
  const {verified} = req.params
    try {
    const data = await User.find({verified:verified});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
}

export default handleGetAdmin
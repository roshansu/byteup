import User from "../models/user.js";

// not using this api

const handleGetSessionUser = async (req, res)=>{
    const userId = req.query.id;

  try {
    const user = await User.findById(userId).select('name course passout photo phone specialization');
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error' });

  }
}

export default handleGetSessionUser
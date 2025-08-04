import User from "../models/user.js";

const handleUserUpdate = async (req, res)=>{
    const { field, id } = req.params;
  const update = {};
  update[field] = req.body[field];

  try {
    const user = await User.findByIdAndUpdate(id, update, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update field' });
  }
}

export default handleUserUpdate
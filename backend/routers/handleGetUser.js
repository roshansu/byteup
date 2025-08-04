import User from '../models/user.js'

const handleGetUser = async (req, res)=>{
    const { id } = req.params;
    try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export default handleGetUser
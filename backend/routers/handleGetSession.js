import Session from "../models/session.js"

const handleGetSession = async (req, res) =>{
    try {
    const data = await Session.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
}

export default handleGetSession
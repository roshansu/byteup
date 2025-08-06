import Session from "../models/session.js";

const getSessionMember = async (req, res) =>{
  const { id } = req.params;

  try {
    const sessions = await Session.find({ joined: id })
      .populate('user', 'name course passout phone photo specialization linkedin github')

    if (!sessions.length) {
      return res.status(404).json({ message: 'No sessions joined by this user' });
    }

    res.json(sessions);
  } catch (err) {
    console.error('Error fetching joined sessions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export default getSessionMember
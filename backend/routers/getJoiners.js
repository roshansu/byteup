import Session from "../models/session.js";

const getJoiners = async (req, res) =>{
    const { id } = req.params;

  try {
    const session = await Session.findById(id)
      .populate('joined', 'name course specialization passout phone photo linkedin github');

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json(session.joined);
  } catch (err) {
    console.error('Error fetching joined users:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export default getJoiners
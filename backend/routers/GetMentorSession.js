import Session from "../models/session.js";
import User from "../models/user.js";

const GetMentorSession = async (req, res)=>{
    try {
    const { id } = req.params;
    console.log(id)

    const sessions = await Session.find({ user: id })
      .populate('user', 'name course passout phone photo specialization linkedin github') // full planner detail
        console.log(sessions)
    if (!sessions.length) {
      return res.status(404).json({ message: 'No sessions found for this planner' });
    }
    console.log(sessions)
    res.json(sessions);
  } catch (err) {
    console.error('Error fetching sessions by planner:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export default GetMentorSession
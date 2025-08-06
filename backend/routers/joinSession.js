
import Session from "../models/session.js"

const joinSession = async (req, res) =>{
    const {sessionId, id} = req.params
    console.log(sessionId, id)

    try {
    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      { $addToSet: { joined: id } }, 
      { new: true }
    )
    console.log(updatedSession)
    if (!updatedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json(updatedSession);
  } catch (err) {
    console.error('Error joining session:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export default joinSession
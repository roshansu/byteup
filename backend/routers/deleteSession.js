import Session from "../models/session.js";

const deleteSession = async (req, res) =>{
const { sessionId } = req.params;
console.log(sessionId)

  try {
    const deleted = await Session.findByIdAndDelete(sessionId);

    if (!deleted) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json({ message: 'Session deleted successfully' });
  } catch (err) {
    console.error('Error deleting session:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export default deleteSession
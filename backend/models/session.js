import mongoose from "mongoose";
import User from "./user.js";

const sessionSchema = new mongoose.Schema({
  day: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  detail: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  joined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
});


 const Session = mongoose.model('session', sessionSchema);

 

 export default Session
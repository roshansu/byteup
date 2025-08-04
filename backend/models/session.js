import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
   day:String,
   time:String,
   location:String,
   detail:String,
   user:String
});

 const Session = mongoose.model('session', sessionSchema);

 

 export default Session
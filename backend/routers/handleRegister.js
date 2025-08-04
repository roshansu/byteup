import User from "../models/user.js";
import cloudinary from "../libs/cloudinary.js"
import streamifier from "streamifier"
import hashPassword from "../libs/hashPass.js";
import { registerUser } from "../libs/email.config.js";

export default async function handleRegister(req, res) {
console.log(req.body)
    const existingUser = await User.findOne({
      $or: [
        { email: req.body.email },
        { phone: req.body.email }
      ]
    });

    
    if (existingUser) {
        return res.json({ message: "Email or phone already exists", success: false });
   }

      let imageUrl = '';
        console.log(req.file)
            if (req.file) {
                const streamUpload = (req) => {
                    return new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream(
                            { folder: 'profile-pictures' },
                            (error, result) => {
                                if (result) {
                                    resolve(result);
                                } else {
                                    reject(error);
                                }
                            }
                        );
                        streamifier.createReadStream(req.file.buffer).pipe(stream);
                    });
                };

                const uploadResult = await streamUpload(req);
                imageUrl = uploadResult.secure_url;
                console.log(imageUrl)
                req.body.photo = imageUrl
            }
   
    try {
        const  hashPass = await hashPassword(req.body.password);
        const tempPass = req.body.password
        req.body.password = hashPass;
        console.log(hashPass, req.body)
        const userId = await User.create(req.body);
        console.log(userId)

        registerUser(req.body.name, req.body.email, tempPass)
        res.json({message: "Registered successfully", success: true})
        
      } catch (err) {
        res.json({message: "error "+err, success: false});
      }
      
}
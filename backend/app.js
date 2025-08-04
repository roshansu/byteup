import express from "express";
import multer from "multer";
import cors from 'cors'
import dotenv from "dotenv";

import connectDb from "./db/database.js";
import handleRegister from "./routers/handleRegister.js";
import handleLogin from "./routers/handleLogin.js";
import handleGetAdmin from "./routers/handleGetAdmin.js";
import handleGetSession from "./routers/handleGetSession.js";
import handleGetSessionUser from "./routers/handleGetSessionUser.js";
import handleGetMember from "./routers/handleGetMember.js";
import handleGetMentor from "./routers/handleGetMentor.js";
import handleApprove from "./routers/handleApprove.js";
import handleGetUser from "./routers/handleGetUser.js";
import handleUserUpdate from "./routers/handleUserUpdate.js";
import handlePhotoUpdate from "./routers/handlePhotoUpdate.js";
import handleAdminLogin from "./routers/handleAdminLogin.js";
import handleNewSession from "./routers/handleNewSession.js";
import handleGetData from "./routers/handleGetData.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const upload =  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB max
});

app.use(cors({
  origin: 'https://byteup-83bv.vercel.app' // or your frontend production URL
}));

app.use(express.json({ limit: '10mb', type: 'application/json' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

connectDb()

app.listen(PORT, ()=>{
    console.log("server is running on", PORT)
})

app.post('/register',upload.single('photo'), handleRegister)
app.post('/login', handleLogin)
app.get('/getadmin', handleGetAdmin);
app.get('/getsession', handleGetSession);
app.get('/sessionuser', handleGetSessionUser);
app.get('/getmentor', handleGetMentor)
app.get('/getmember', handleGetMember)
app.get('/user/:id', handleGetUser)
app.patch('/approve', handleApprove)
app.patch('/user/update/:field/:id', handleUserUpdate)
app.post('/user/update/photo/:id', upload.single('photo'), handlePhotoUpdate)
app.post('/adminlogin', handleAdminLogin)
app.post('/newsession', handleNewSession)
app.get('/getdata', handleGetData)
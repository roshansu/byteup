import nodemailer from "nodemailer"
import registerEmail from "./registerEmail.js";
import verifyEmail from "./verifyEmail.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "roshanjaiswal.bca@gmail.com",
    pass: "mfwacaoezdnwrtxs",
  },
});


export async function registerUser(name, email, pass) {
  const htmlContent = registerEmail
    .replaceAll("[User's Name]", name)
    .replaceAll("[password]", pass); // if you have this placeholder

  const info = await transporter.sendMail({
    from: '"ByteUP" <roshanjaiswal.bca@gmail.com>',
    to: email,
    subject: "Registration Success – " + name,
    text: "Mandatory",
    html: htmlContent,
  });

  return info;
}


export async function welcomUser(name, email) {
  const info = await transporter.sendMail({
    from: '"ByteUP" <roshanjaiswal.bca@gmail.com>',
    to: email,
    subject: "Welcom "+name,
    text: "Hello world?", 
    html: verifyEmail.replace("[User's Name]", name),
  });
  return info;
}



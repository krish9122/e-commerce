import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.GMAIL,
        pass:process.env.GMAIL_APP_PASSWORD
    }
});

async function sendMail(Subject,Text,From,To){
    await transporter.sendMail({
        from: From,
        to:To,
        subject:Subject,
        text:Text
    });
    console.log("email sent");
}

export default sendMail;
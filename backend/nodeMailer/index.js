//Nodemailer 
import nodemailer from "nodemailer";


export const scheduleMail = ({to, subject, html})=>{
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : "navinvenkatv@gmail.com",
            pass : "nbtngmghheazdrzj"
        }
    })
    
    const detail = {
        from: 'navinvenkatv@gmail.com',
        to: to,
        subject: subject,
        html: html
    }
    
    transporter.sendMail(detail, (err, info)=>{
        if(err){
            console.log("error sending mail")
        }else{
            console.log('mail sent Successfully ', info.messageId)
        }
    });
}


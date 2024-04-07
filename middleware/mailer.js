const nodemailer = require('nodemailer');

export const nodeMailer = ({ mailId, sub, txt, html }) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, // Secure port, alternatively use 587 for non-secure (with secure: false)
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'rahulmangukiya05@gmail.com', // Your Gmail address
            pass: 'awbh fmsm xneb rmad' // Your Gmail "App Password" 
        }
    });
    let mailOptions = {
        from: 'rahulmangukiya05@gmail.com',
        to: mailId,
        subject: sub,
        text: txt,
        html: html
    };
    // console.log('mailOptions====>', mailOptions)
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}
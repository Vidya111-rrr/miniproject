import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the root directory
dotenv.config({ path: join(__dirname, '../.env') });
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const sendMail = async (to, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


// uncomment below to test the functionlty , make sure to comment it back after testing , update the email address to your  another email address and remove the comment after proper working
//sendMail("toemail.com", 'subject', 'text');
sendMail('dhanyakrishnan284@gmail.com','HELLO','This is test mail');
export default sendMail;

// const nodemailer = require('nodemailer');
// const jwt = require("jsonwebtoken")
// const userEmail = "kishanrajput4580@gmail.com"
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'SECRET_REMOVED',
//     pass: 'SECRET_REMOVED'
//   }
// });
// const token = jwt.sign({userEmail}, "gjhjhhj", {expiresIn : "5m"});
// const resetLink = `http://localhost/reset-password?token=${token}`;
// transporter.sendMail({
//   to: userEmail,
//   subject: 'Create your password',
//   html: `<a href="${resetLink}">Click here to Create your password</a>`
// }).then(info => {
//   console.log('Email sent: ' + info.response);
// }).catch(error => {
//   console.error('Error sending email: ' + error);
// });

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = {
  sendMail: async function (to, subject, text, html) {
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.GMAIL_USER,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token
        }
      });

      const mailOptions = {
        from: `SkinCare Co. <${process.env.GMAIL_USER}>`,
        to,
        subject,
        text,
        html
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent:", result.response);
      return result;
    } catch (err) {
      console.error("❌ Email send failed:", err);
    }



  }
}

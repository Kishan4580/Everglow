const { sendMail } = require("./useNodemailer")


const jwt = require("jsonwebtoken")

const clientURL = process.env.client_URL;
// console.log(clientURL);

module.exports = {
    sentEmailToUser: async function (stream, userEmail) {
        console.log("user email", userEmail);

        console.log("Sent email function called and processing to send the email .");

        const token = await generateToken(userEmail)
        const result = await sendMail(
            userEmail,
            "Create Your Password - SkinCare",
            "Click the link below to reset your password.",
            `<p>Click <a href="${clientURL}/create-password?token=${token}"/>here</a> to reset your password.</p>`
        );

        // sentEmail()
        if (result) {
            stream.respond({
                ':status': 200,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            stream.end(JSON.stringify({ message: 'Email sent successfully' }));
            return;
        }
        stream.end(JSON.stringify({ ":status": 500, 'Content-Type': 'application/json', "message": "Somenthing went wrong on server side. " }))
    }
}

const generateToken = async (payload) => {
    return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "5m" });
}
const express = require("express");
const sgMail = require('@sendgrid/mail');
const APIKey = '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';
sgMail.setApiKey(APIKey);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/sendEmail', (req, res) => {

    const email = {
        to: req.body.email,
        from: 'molarknave1@gmail.com',
        templateId: 'd-f944609d94444984809acb82a117280b',
        dynamic_template_data: {
        subject: req.body.emailSubject,
        name: req.body.emailName,
        body: req.body.emailBody,
        },
    };

    sgMail.send(email)
    .then(Response => console.log('Email sent'))
    .catch(error => console.log(error.email));

    res.json({'message' : 'The email has been sent'});
})

app.listen(3000, (req, res) => {
    console.log("server starting on port 3000")
})

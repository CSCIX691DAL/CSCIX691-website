const sgMail = require('@sendgrid/mail');

// TODO: the api key and the email stuff here were never tested, just migrated from
//       https://github.com/CSCIX691DAL/CSCIX691-website-node-server and our own sgmail account is waiting for approval.
const APIKey = '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';
sgMail.setApiKey(APIKey);

exports.sendEmail = (request, response) => {
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
}

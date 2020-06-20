// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
const msg = {
  to: "ahmatdanis24@gmail.com",
  from: "bob@sendgrid.net",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail.send(msg);

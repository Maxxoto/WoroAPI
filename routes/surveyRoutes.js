const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const requireCredit = require("../middlewares/requireCredit");

const surveyTemplate = require("../services/emailTemplates");
const Survey = mongoose.model("surveys");

// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env

module.exports = (App) => {
  app.post("/api/surveys", requireAuth, requireCredit, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      recipients: recipients.split(",").map((email) => ({
        //automatic return ES6
        email: email.trim(),
      })),
      _user: req.user.id,
      dateSent: Date.now,
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
  });
};

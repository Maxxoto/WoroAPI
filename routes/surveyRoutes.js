const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const requireCredit = require("../middlewares/requireCredit");

const surveyTemplate = require("../services/emailTemplates");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
module.exports = (app) => {
  app.get("/api/survey/:survey-id/:vote", (req, res) => {
    res.send("Thanks you for the feedback");
  });

  app.post("/api/surveys", requireAuth, requireCredit, async (req, res) => {
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
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (e) {
      console.error("ERROR : " + e);
      res.status(422).send(e);
    }
  });
};

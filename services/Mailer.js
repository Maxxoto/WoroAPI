const sg = require('@sendgrid/mail');
const { classes } = require('@sendgrid/helpers');
const client = require('@sendgrid/client');
// const helper = sendgrid.mail;
const keys = require('../config/keys');

client.setApiKey(keys.sendGridKey);

class Mailer extends classes.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.setFrom('no-reply@woroapps.com');
    this.setSubject(subject);
    // this.body = new helpers.Content("text/html", content);
    // this.setContent(content);
    this.body = this.addHtmlContent(content);
    this.recipients = this.formatAddresses(recipients);

    // this.addContent(this.body);
    // this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new classes.EmailAddress(email);
    });
  }

  // addClickTracking() {
  // const trackingSettings = new helper.TrackingSettings();
  //   const trackingSettings = new client.
  //   const clickTracking = new helper.ClickTracking(true, true);
  //   trackingSettings.setClickTracking(clickTracking);
  //   this.addTrackingSettings(trackingSettings);
  // }

  addRecipients() {
    const personalize = new classes.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });

    this.addPersonalization(personalize.toJSON());
  }

  async send() {
    // const request = this.sgAPI.emptyRequest({

    try {
      const request = {
        method: 'POST',
        url: '/v3/mail/send',
        body: this.toJSON(),
      };

      // console.log("THIS JSON :" + JSON.stringify(this.toJSON()));
      return await client.request(request);
    } catch (e) {
      console.log('Error :' + e);
    }
  }
}

module.exports = Mailer;

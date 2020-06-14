const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = (app) => {
  app.post("/api/stripe", async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ error: "You must log in!" });
    }
    const charge = await stripe.charges.create({
      amount: 100,
      currency: "USD",
      description: "1$ for 1 Credits",
      source: req.body.id,
    });
    req.user.credits += 1;
    const user = await res.user.save();

    res.send(user);
  });
};

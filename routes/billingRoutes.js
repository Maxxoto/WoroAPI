const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireAuth = require("../middlewares/requireAuth");
module.exports = (app) => {
  app.post("/api/stripe", requireAuth, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 100,
      currency: "USD",
      description: "1$ for 1 Credits",
      source: req.body.id,
    });
    req.user.credits += 1;
    const user = await req.user.save();

    res.send(user);
  });
};

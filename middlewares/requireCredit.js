module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res
      .status(403)
      .send({ error: "You must have atleast 1 credits to send surveys" });
  }
  next();
};

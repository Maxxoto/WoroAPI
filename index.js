//Top level import
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//Models import
require("./models/User");

//Services import
require("./services/passport");

//Routes import
const AuthRoute = require("./routes/authRoutes");
const BillingRoute = require("./routes/billingRoutes");

//Additional Import
const mongoose = require("mongoose");
const keys = require("./config/dev");
const cookieSession = require("cookie-session");
const passport = require("passport");

//Set connection into mongoDB
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 Days , 24 Hours , 60 Minutes , 60 Seconds , 1000 Milliseconds,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

AuthRoute(app);
BillingRoute(app);
//or
//require('./routes/auth')(app)

app.listen(PORT);

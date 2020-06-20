//Top level import
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
//Models import
require("./models/User");
require("./models/Survey");
//Middlewares import
// const requireAuth = require("./middlewares/requireAuth");

//Services import
require("./services/passport");

//Routes import
const AuthRoute = require("./routes/authRoutes");
const BillingRoute = require("./routes/billingRoutes");
const SurveyRoute = require("./routes/surveyRoutes");
//Additional Import
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

//Set connection into mongoDB
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
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
SurveyRoute(app);
//or
//require('./routes/auth')(app)

app.listen(PORT);

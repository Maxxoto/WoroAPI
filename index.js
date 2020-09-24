//Top level import
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");

const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URL);
const redisStore = require("connect-redis")(session);

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
const session = require("express-session");
const passport = require("passport");

//Set connection into mongoDB
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

redisClient.on("error", (err) => {
  console.log("Redis error: ", err);
});

app.use(
  cors({
    origin: "https://woroapps.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.set("trust proxy", 1);
app.use(
  session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: 60000,
    },
    store: new redisStore({
      // host: "ec2-54-80-72-92.compute-1.amazonaws.com",
      // port: 25179,
      client: redisClient,
      ttl: 86400,
    }),
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

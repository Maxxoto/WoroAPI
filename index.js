//Main import
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

//Additional import
require('./models/User')
require('./services/passport')
const AuthRoute = require('./routes/auth')
const mongoose = require('mongoose')
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true , useUnifiedTopology: true })
AuthRoute(app)

//or
//require('./routes/auth')(app)



app.listen(PORT)

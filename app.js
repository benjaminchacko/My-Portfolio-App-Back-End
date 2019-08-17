const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

const app = express();

app.get('/', (req, res) => {
  res.send('We are on home');
});

// Enviroment Variables
dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
mongoose.Promise = global.Promise;

const blogRoutes = require('./api/routes/blogs');
const fireBaseRoute = require('./api/routes/fileUploader');
const loginRoutes = require('./api/routes/login');
const signupRoutes = require('./api/routes/signup');

// Routes that should handle requests
app.use('/blogs', blogRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/upload', fireBaseRoute);

/* app.use(session({
  secret: 'honeyBadger',
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
})); */
module.exports = app;
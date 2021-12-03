const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');

const users = require('./routes/users');
const graphRouter = require('./routes/graph');

// Allow Heroku to access environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Connect to MongoDB
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URI;
mongoose
  .connect(mongoDB, {useNewUrlParser: true , useUnifiedTopology: true})
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

// Create Express App
const app = express();

// CORS middleware
app.use(cors())

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/graph', graphRouter);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('frontend/build'));

  // Express serve up index.html file if it doesn't recognize route
  app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Get port from environment.
var PORT = process.env.PORT || '9000'

// Listen on provided port.
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

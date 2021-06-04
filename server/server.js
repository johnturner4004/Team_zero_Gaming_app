const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const upcomingRouter = require('./routes/upcoming.router');
const participantRouter = require('./routes/participant.router');
const attendingRouter = require('./routes/attending.router');
const gameRouter = require('./routes/game.router');
const myEventsRouter = require('./routes/myEvents.router');
const editRouter = require('./routes/edit.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/upcoming', upcomingRouter);
app.use('/api/participant', participantRouter);
app.use('/api/attending', attendingRouter);
app.use('/api/game', gameRouter);
app.use('/api/my-events', myEventsRouter);
app.use('/api/edit/', editRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

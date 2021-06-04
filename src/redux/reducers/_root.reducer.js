import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import upcoming from './upcoming.reducer';
import participant from './participant.reducer';
import attending from './attending.reducer';
import game from './game.reducer';
import myEvents from './myEvents.reducer';
import addEvent from './addEvent.reducer';
import editDetails from './edit.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  upcoming, //list of all events and details
  participant, //list of all users playing in a single event
  attending, //list of events current user is playing in
  game, //list of games
  myEvents, // list of events for current user
  addEvent, //  event_id of newly added event
  editDetails, // original details for file being edited
});

export default rootReducer;

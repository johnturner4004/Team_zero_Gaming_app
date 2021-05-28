import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_PASSWORD':
      return 'password'; //no password
    case 'LOGIN_INPUT_GAMERTAG':
      return 'gamertag'; //no gamertag
    case 'LOGIN_INPUT_ERROR':
      return 'missing'; //no password or gamertag
    case 'LOGIN_FAILED':
      return "fail"; //incorrect user or password
    case 'LOGIN_FAILED_NO_CODE':
      return 'none';
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
      case 'REGISTRATION_INPUT_PASSWORD':
      return 'registerPassword'; //no password
    case 'REGISTRATION_INPUT_GAMERTAG':
      return 'registerGamertag'; //no gamertag
    case 'REGISTRATION_INPUT_ERROR':
      return 'registerMissing';
    case 'REGISTRATION_FAILED':
      return 'registerFail';
    default:
      return state;
  }
};

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
});

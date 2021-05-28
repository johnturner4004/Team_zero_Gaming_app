import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function RegisterForm() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [passwordMatch, setPasswordMatch] = useState();

  const registerUser = (event) => {
    event.preventDefault();
    if (password && passwordCheck && (password === passwordCheck)) {
      setPasswordMatch(true)
    } else {
      setPasswordMatch(false)
    }
    switch (passwordMatch, username, password) {
      case (passwordMatch && username && password):
        dispatch({
          type: 'REGISTER',
          payload: {
            username: username,
            password: password,
          },
        });
        break;
      case (username):
        dispatch({ type: 'REGISTRATION_INPUT_PASSWORD' });
        break;
      case (password):
        dispatch({type: 'REGISTRATION_INPUT_GAMERTAG'})
        break;
      default:
        dispatch({type: 'REGISTRATION_INPUT_ERROR'})
    }
  
  }; // end registerUser

  return (
    <>
    <div className="center">
    <Paper className="form">
    {errors.registrationMessage === 'none' ? 
    <>
    <h1>We're sorry</h1>
    <p>We appear to be experiencing some minor difficulty right now. Please refresh and try again.</p> 
    </>:
    <form className={classes.root} noValidate autoComplete="on" onSubmit={registerUser}>
      {errors.registrationMessage === "registerMissing" || 
      errors.registrationMessage === "registerGamertag" ?
      <TextField
          error
          id="outlined-error"
          label="Error"
          value={username}
          variant="outlined"
          helperText="Gamertag is required"
          onChange={(event) => setUsername(event.target.value)}
          required
          /> :
          errors.registrationMessage === 'registerFail' ?
          <>
          <h1>Something went wrong</h1>
          <p>That username may have already been taken.</p>
          <TextField
          error
          id="outlined-error"
          label="Error"
          value={username}
          variant="outlined"
          helperText="Username may already be taken"
          onChange={(event) => setUsername(event.target.value)}
          required
          /></> :
          <TextField
          id="username"
          label="Gamertag"
          variant="outlined"
          color="primary"
          required
          onChange={(event) => setUsername(event.target.value)}
          />}
      {errors.registrationMessage === 'registerMissing' || 
      errors.registrationMessage === 'registerPassword' ? 
      <TextField
      error
      id="outlined-error password"
      type="password"
      label="Error"
      variant="outlined"
      color="primary"
      helperText="Password is required"
      required
      onChange={(event) => setPassword(event.target.value)}
      /> :
      errors.registrationMessage === 'registerFail' ?
      <TextField
      error
      id="outlined-error password"
      type="password"
      label="Error"
      variant="outlined"
      color="primary"
      required
      onChange={(event) => setPassword(event.target.value)}
      /> :
      <TextField
        id="password"
        type="password"
        label="Password"
        variant="outlined"
        color="primary"
        required
        onChange={(event) => setPassword(event.target.value)}
      />}
      {passwordMatch ?
      <TextField
        id="password-2"
        type="password"
        label="Confirm password"
        variant="outlined"
        color="primary"
        required
        onChange={(event) => setPasswordCheck(event.target.value)}
      /> :
      <TextField
        error
        id="password-2"
        type="password"
        label="Error"
        variant="outlined"
        color="primary"
        helperText="Passwords do not match"
        required
        onChange={(event) => setPasswordCheck(event.target.value)}
      />}
      {errors.registrationMessage ? 
        <Button variant="contained" color="success" type="submit">Register</Button>
        :
        <Button variant="contained" type="submit">Register</Button>}
      </form>}
    </Paper>
    </div>
    </>
  );
}

export default RegisterForm;

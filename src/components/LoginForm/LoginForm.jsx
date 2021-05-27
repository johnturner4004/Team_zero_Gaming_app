import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Paper } from '@material-ui/core';

import './LoginForm.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else if (username) {
      dispatch({ type: 'LOGIN_INPUT_PASSWORD' });
    } else if (password) {
      dispatch({type: 'LOGIN_INPUT_GAMERTAG'})
    } else {
      dispatch({type: 'LOGIN_INPUT_ERROR'})
    }
  }; // end login

  

  return (
    <div className="center">
    <Paper className="form">
    {errors.loginMessage === 'none' ? 
    <>
    <h1>We're sorry</h1>
    <p>We appear to be experiencing some minor difficulty right now. Please refresh and try again.</p> 
    </>:
    <form className={classes.root} noValidate autoComplete="on" onSubmit={login}>
      {errors.loginMessage === 'missing' || 
      errors.loginMessage === 'gamertag' ?
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
          errors.loginMessage === 'fail' ?
          <TextField
          error
          id="outlined-error"
          label="Error"
          value={username}
          variant="outlined"
          helperText="Incorrect gamertag or password"
          onChange={(event) => setUsername(event.target.value)}
          required
          /> :
          <TextField
          id="username"
          label="Gamertag"
          variant="outlined"
          color="primary"
          required
          onChange={(event) => setUsername(event.target.value)}
          />}
      {errors.loginMessage === 'missing' || 
      errors.loginMessage === 'password' ? 
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
      errors.loginMessage === 'fail' ?
      <TextField
      error
      id="outlined-error password"
      type="password"
      label="Error"
      variant="outlined"
      color="primary"
      helperText="Incorrect gamertag or password"
      required
      onChange={(event) => setPassword(event.target.value)}
      /> :
      <TextField
        id="password"
        type="password"
        label="password"
        variant="outlined"
        color="primary"
        required
        onChange={(event) => setPassword(event.target.value)}
      />}
      {errors.loginMessage ? 
        <Button variant="contained" color="success" type="submit">Log in</Button>
        :
        <Button variant="contained" type="submit">Log in</Button>}
      </form>}
    </Paper>
    </div>
  );
}

export default LoginForm;

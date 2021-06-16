import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Container, Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    justifyContent: "center",
    width: 300,
    paddingLeft: 10,
    paddingRight: 10,
  },
  field: {
    marginTop: 10,
    display: "block",
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
    display: "block",
  },
}));


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors.loginMessage);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  // Sends login info when submit is clicked
  const handleSubmit = (e) => {
    e.preventDefault();
    // Resets errors to false each time the function is run
    setErrorUsername(false);
    setErrorPassword(false);
    // Test to see if username and password are empty
    // Sets errors for both to true if they are
    if (username == '' && password == ''){
      setErrorUsername(true);
      setErrorPassword(true);
      // Tests just the username
    } else if (username == '') {
      setErrorUsername(true);
      // Tests just the password
    } else if (password == '') {
      setErrorPassword(true);
    } else {
      // If the errors are still set to false the login info is dispatched to the server 
      dispatch ({ type: 'LOGIN', payload: ({ username: username, password: password})})
    }
  }
  
  return (
    <Container className={classes.form}>
      {/* If the server denys the login this warning alerts the user they username and password don't match */}
      {errors === "fail" ?
      <Alert
      onClose={() => { dispatch({ type: 'CLEAR_LOGIN_ERROR' })}}
      severity="error"
      >
        <AlertTitle>"You shall not pass!!!"</AlertTitle>
        We're sorry but either your username and password don't match or you haven't registered yet. Please register or try again.
      </Alert>
      : errors === "none" ?
      // If there is an error sending or receiving data from the server this warning lets the user know
      <Alert
      onClose={() => { dispatch({ type: 'CLEAR_LOGIN_ERROR' })}}
      severity="error"
      >
        <AlertTitle>"Great Scott!"</AlertTitle>
        It looks like we're having some trouble with our server. Please refresh and try again.
      </Alert>
      :
      // If no errors are received from the server the form will render
      <Paper 
      className={classes.form}
      >
      <form 
      noValidate 
      autoComplete="off" 
      onSubmit={handleSubmit}
      >
        <TextField
        className={classes.field}
        variant="outlined"
        label="username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        // If no username is entered the text field turns red and helper text appears below the field. 
        // No data is sent to the server if this is blank
        error={errorUsername}
        helperText={errorUsername ? "Please enter gamertag" : ""}
        />
        <TextField
        className={classes.field}
        variant="outlined"
        label="password"
        value={password}
        type="password"
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
        required
        // If no password is entered the text field turns red and helper text appears below the field. 
        // No data is sent to the server if this is blank
        error={errorPassword}
        helperText={errorPassword ? "Please enter password" : ""}
        />
        <Button
        className={classes.btn}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        >
          Submit
        </Button>
      </form>
      </Paper>
      }
    </Container>
  );
}

export default LoginForm;

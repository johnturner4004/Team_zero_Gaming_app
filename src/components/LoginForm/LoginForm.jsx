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
    width: 250,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    setErrorUsername(false);
    setErrorPassword(false);
    if (username == '' && password == ''){
      setErrorUsername(true);
      setErrorPassword(true);
    } else if (username == '') {
      setErrorUsername(true);
    } else if (password == '') {
      setErrorPassword(true);
    } else {
      dispatch ({ type: 'LOGIN', payload: ({ username: username, password: password})})
    }
  }
  
  return (
    <Container className={classes.form}>
      {errors === "fail" ?
      <Alert
      onClose={() => { dispatch({ type: 'CLEAR_LOGIN_ERROR' })}}
      severity="error"
      >
        <AlertTitle>"You shall not pass!!!"</AlertTitle>
        We're sorry but either your username and password don't match or you haven't registered yet. Please register or try again.
      </Alert>
      : errors === "none" ?
      <Alert
      onClose={() => { dispatch({ type: 'CLEAR_LOGIN_ERROR' })}}
      severity="error"
      >
        <AlertTitle>"Great Scott!"</AlertTitle>
        It looks like we're having some trouble with our server. Please refresh and try again.
      </Alert>
      :
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
        error={errorPassword}
        helperText={errorPassword ? "Please enter password" : ""}
        />
        <Button
        className={classes.btn}
        type="submit"
        variant="contained"
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

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Container, FormControl, FormHelperText, InputLabel, OutlinedInput, Paper, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'  
import AlertTitle from '@material-ui/lab/AlertTitle'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    marginTop: 20,
  },
  form: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    width: 250,
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

function RegisterForm() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const errors = useSelector((store) => store.errors);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    setUsernameError(false);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
    if (e.target.value === passwordCheck) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    };
  }

  const handleChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
    if (e.target.value === password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    };
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Gamertag: ${username}, Password: ${password}, Check Password: ${passwordCheck}`);
    if (username == '' & password == '') {
      setUsernameError(true);
      setPasswordError(true);
      return;
    } else if (username == '') {
      setUsernameError(true);
      return;
    } else if (password == '') {
      setPasswordError(true);
      return;
    } else if (!passwordMatch) {
      return;
    } else {
      dispatch({ type: 'REGISTER', payload: {username: username, password: password}});
    };
  };

  return (
    <>
      <Typography
      className={classes.title}
      variant="h3"
      component="h1"
      >
        Registration
      </Typography>
    <Container className={classes.form}>
      { errors.registrationMessage === 'registerFail' ?
      <Alert 
      severity="error"
      onClose={() => { dispatch({ type: 'CLEAR_REGISTRATION_ERROR' })}}
      >
        <AlertTitle>"It's a trap"</AlertTitle>
        We're sorry but that didn't work. That username may have already been taken.
      </Alert>
      :
      <>
    <Paper className={classes.form}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
        className={classes.field}
        variant="outlined"
        label="Gamertag"
        value={username}
        onChange={(e) => handleChangeUsername(e)}
        fullWidth
        required
        error={usernameError}
        helperText={usernameError ? "Gamertag is required" : ""}
        />
        <FormControl fullWidth required className={classes.field} variant="outlined">
        <InputLabel error={passwordError}>Password</InputLabel>
        <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        label="Password"
        value={password}
        onChange={(e) => handleChangePassword(e)}
        error={passwordError}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        }

        />
          <FormHelperText error>{passwordError ? "Password is required" : ""}</FormHelperText>
        </FormControl>
        <FormControl fullWidth required className={classes.field} variant="outlined">
          <InputLabel error={!passwordMatch}>Check Password</InputLabel>
        <OutlinedInput 
        type={showPassword ? 'text' : 'password'}
        label="Check password"
        value={passwordCheck}
        onChange={(e) => handleChangePasswordCheck(e)}
        error={!passwordMatch}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        }
        />
        <FormHelperText error>{!passwordMatch ? "Passwords do not match" : ""}</FormHelperText>
        </FormControl>
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
    </>
  }
    </Container></>
  );
}

export default RegisterForm;

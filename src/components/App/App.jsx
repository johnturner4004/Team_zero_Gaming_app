import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';


import Home from '../Home/Home';
import Upcoming from '../Upcoming/Upcoming';
import MyEvents from '../MyEvents/MyEvents';
import Profile from '../Profile/Profile';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AddEvent from '../AddEvent/AddEvent';
import Edit from '../Edit/Edit'
import About from '../About/About'
import { 
  Typography,
  Paper, 
  makeStyles, 
  Container 
} from '@material-ui/core';

import './App.css';

const useStyles = makeStyles({
  center: {
    textAlign: "center",
    width: 300,
    margin: 10,
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
})

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const theme = {
    spacing: 4,
    palette: {
      primary: '#007bff',
    },
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Header />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/upcoming"
          >
            <Upcoming />
          </Route>
          <Route
          exact
          path="/home"
          >
            <Home />
          </Route>
          <Route
          exact
          path="/about"
          >
            <About />
          </Route>
          {/* <Route exact path=""> */}
          
          {/* </Route> */}

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/add-event will show the AddEvent page if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/add-event */}

          <ProtectedRoute
            exact
            path="/my-events"
            >
              <MyEvents />
            </ProtectedRoute>

          <ProtectedRoute
            // This path is for future use
            exact
            path="/profile"
          >
          <Profile />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            exact
            path="/login"
            authRedirect="/home"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/registration"
            authRedirect="/profile"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path="/add-event">
            <AddEvent />
          </ProtectedRoute>
          
          <ProtectedRoute
          path="/edit/:id">
            <Edit />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <Container className={classes.container}>
              <Paper className={classes.center}>
                <Typography variant="h1" >404</Typography>
                <Typography variant="h5" component="h2">This is not the page we're looking for.</Typography>
                <Typography>Try reloading or going back to the homepage. It's possible you got logged out. If so, please log back in again.</Typography>
              </Paper>
            </Container>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;

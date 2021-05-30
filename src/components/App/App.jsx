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

import './App.css';

function App() {
  const dispatch = useDispatch();

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
          {/* <Route exact path=""> */}
          
          {/* </Route> */}

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

          <ProtectedRoute
            exact
            path="/my-events"
            >
              <MyEvents />
            </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
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
            path="/profile"
            >
              <Profile />
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

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;

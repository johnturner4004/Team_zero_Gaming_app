/***********************************************************
************************************************************
**                                                        ** 
**  This is the code for the menu in the hamburger        **
**  button. I will do my best to explain all the code     **
**  in my comments. However, it may be easiest to start   **
**  reading the code from the bottom return and reference **
**  the code above to see what each element does. Most    **
**  of this code is taken straight from Material-UI's     **
**  website.                                              **
**                                                        **
************************************************************
***********************************************************/



import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menu: {
    color: '#fafafa'
  },
});


// This function creates a custom component to use for each link
function ListItemLink(props) {
  const { icon, primary, to } = props;

  // This makes the link itself
  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );
  // This puts the link in a ListItem as a button component
  return (
    <li>
      <ListItem button component={renderLink}>
        {/* If there is an icon for the link this will render it in front of the text */}
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        {/* This is the text for the link */}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

// This sets the type for each argument passed into the ListItemLink component
// constructed above
ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};


export default function Drawer() {

  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const user = useSelector(store => store.user)

  // This function toggles whether the drawer is displayed or not
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // This is the logs out the user then forwards them back to the homepage when
  // "Logout" is clicked
  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
    history.push('/home')
  }

  // This sets up the list of links that are rendered when the drawer is open
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItemLink to="/home" primary="Home" />
        <ListItemLink to="/upcoming" primary="Upcoming Events" />
        {user.username ?
        <>
        {/* The following links are only displayed if the user is logged in */}
        <ListItemLink to="/add-event" primary="Add Event" />
        <ListItemLink to="/my-events" primary="My Events" />
        </>
        : ''}
        <ListItemLink to="/about" primary="About" />
      </List>
      {/* This divider renders a dividing line between the page nagivation links and the user account links */}
      <Divider />
      {!user.username ?
      // The following link only displays if a user is not logged in and the remaining links after the colon are rendered when a user is logged in
      <ListItemLink to="/login" primary="Login" /> :
      <>
      {/* The profile link is currently disables and will be added in a future update */}
      {/* <ListItemLink to="/profile" primary="Profile" /> */}
      <ListItem>
      <ListItemText  primary="Log out" 
      onClick={() => handleLogout()}/>
      </ListItem></> }
    </div>
  );

  // This descrips the part of the display the drawer comes from. Top makes it look
  // like the drawer is being pulled down from the top of the page
  const anchor='top'

  // The return statement takes all the elements described above and puts them
  // together with the MenuIcon. The menu icon is the button made of three lines that
  // is frequently called a hamburger button
  return (
    <div>
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon className={classes.menu}/></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}

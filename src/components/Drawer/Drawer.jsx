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

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

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

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
    history.push('/home')
  }

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
        <ListItemLink to="/add-event" primary="Add Event" />
        <ListItemLink to="/my-events" primary="My Events" />
        </>
        : ''}
      </List>
      <Divider />
      {!user.username ?
      <ListItemLink to="/login" primary="Login" /> :
      <><ListItemLink to="/profile" primary="Profile" />
      <ListItem>
      <ListItemText  primary="Log out" 
      onClick={() => handleLogout()}/>
      </ListItem></> }
    </div>
  );

  const anchor='top'

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
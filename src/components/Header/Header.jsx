import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import Drawer from '../Drawer/Drawer';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './Header.css'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: grey[50]
    },
  },
});

function Header() {

  const history = useHistory();

  // This gets the current location from the path and uses it to render the proper
  // link for the link in the right side of the header
  const location = useLocation();
  const currLocation = location.pathname;

  const user = useSelector(store => store.user)

  // Uses the location above and whether of not there is a user signed in to set the
  // link
  function setLink() {
    console.log('currlocation', currLocation);
    // Conditions for Register link
    if (currLocation === '/login' || (currLocation === '/home' && !user.username)) {
      return <Button color="secondary" onClick={() => history.push("/registration")}>Register</Button>
    } else

    // Conditions for Cancel link
    if (currLocation === '/registration' || currLocation === '/profile' || currLocation === '/add-event' || currLocation === '/edit') {
      return <Button color="secondary" onClick={() => history.goBack()}>Cancel</Button>
    } else

    // Conditions for Login button
    if (!user.username) {
      return <Button color="secondary" onClick={() => history.push("/login")}>Login</Button>
    } else {

    // If none of the other conditions are met, the Profile link is rendered
    return <Button color="secondary" onClick={() => history.push("/profile")}>Profile</Button>
  }
}

  return (
    <div className="header">
      <Drawer />
      <ThemeProvider theme={theme}>
      <div className="navLink">{setLink()}</div>
    </ThemeProvider>
    </div>
  )
}

export default Header;
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

  const user = useSelector(store => store.user)
  const location = useLocation();
  const currLocation = location.pathname;

  function setLink() {
    if (currLocation === '/login') {
      return <Button color="secondary" onClick={() => history.push("/registration")}>Register</Button>
    } else
    if (currLocation === '/registration' || currLocation === '/profile') {
      return <Button color="secondary" onClick={() => history.goBack()}>Cancel</Button>
    } else
    if (!user.username) {
      return <Button color="secondary" onClick={() => history.push("/login")}>Login</Button>
    } else {
    return <Button color="secondary" onClick={() => history.push("/profile")}>Profile</Button>
  }
}

  return (
    <ThemeProvider theme={theme}>
    <div className="header">
      <Drawer />
      <div className="navLink">{setLink()}</div>
    </div>
    </ThemeProvider>
  )
}

export default Header;
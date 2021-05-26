import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import Drawer from '../Drawer/Drawer';

import './Header.css'

function Header() {

  const user = useSelector(store => store.user)
  const location = useLocation();
  const currLocation = location.pathname;
  let link = <p>Not working</p>;

  function setLink() {
    if (currLocation === '/login') {
      return <Link to="/registration">Register</Link>
    }
    if (currLocation === '/registration' || currLocation === '/profile') {
      return <p>Cancel</p>
    }
    if (user.username  && currLocation !=='/profile') {
      return <Link to="/profile">Profile</Link>
    }
    if (!user.username) {
      return <Link to="/login">Login</Link>
    }
    return <p>Not working</p>
  }

  return (
    <div className="header">
      <Drawer />
      <div className="navLink">{setLink()}</div>
    </div>
  )
}

export default Header;
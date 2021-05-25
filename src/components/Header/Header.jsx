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
    if (user.gamertag) {
      return <p>Profile</p>
    }
    if (!user.gamertag) {
      return <Link to="/login">Login</Link>
    }
    return <p>Not working</p>
  }

  return (
    <div className="header">
      <Drawer />
      {setLink()}
    </div>
  )
}

export default Header;
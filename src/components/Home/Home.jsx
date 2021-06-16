import { useSelector } from 'react-redux'
import image from '../../images/Team zero profile high res.png'
import LoginForm from '../LoginForm/LoginForm'

import './Home.css'

export default function Home() {

  const user = useSelector(store => store.user)

  return(
    <div className="home">
    <img id="logo" src={image} />
    {/* This will render "Hello, <username>" if a user is signed in or the login form if not */}
    {user.username ?
      <h1 className="welcome">Hello, {user.username}</h1>
      :
      <LoginForm />
    }
    </div>
  )
}
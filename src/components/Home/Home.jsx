import image from '../../images/Team zero profile high res.png'
import LoginForm from '../LoginForm/LoginForm'

import './Home.css'

export default function Home() {

  return(
    <div className="home">
    <img id="logo" src={image} />
    <LoginForm />
    </div>
  )
}
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Drawer from '../../Drawer/Drawer';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      
    </div>
  );
}

export default LandingPage;

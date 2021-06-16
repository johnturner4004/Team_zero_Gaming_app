import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  // This component will eventually be removes once links are fixed as its use has depreciated
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;

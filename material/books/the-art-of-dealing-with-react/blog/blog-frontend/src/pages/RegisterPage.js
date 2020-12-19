import React from 'react';
import RegisterForm from '../containers/auth/RegisterForm';
import AuthTemplate from '../components/auth/AuthTemplate';

export const RegisterPage = () => {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
};

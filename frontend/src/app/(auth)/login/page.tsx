import React from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import LoginForm from '@/components/auth/login-form';


const LoginPage = () => {


  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>

      <LoginForm></LoginForm>
    </div>
  );
};

export default LoginPage;
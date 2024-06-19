'use client';

import React, { useState } from 'react';

import styles from './page.module.scss';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import { LendsqrLogo } from '@/public/icons/icons';
import LayoutWithAuth from '@/components/ui/LayoutWithAuth';

function Login() {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <LayoutWithAuth>
    <section className={`flex flex-col full-width ${styles.signIn}`}>
      <span className={`container flex ${styles.logo}`}>
        <LendsqrLogo />
        <span onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </span>
      </span>
      {isSignIn ? <SignUp /> : <SignIn />}
      </section>
      </LayoutWithAuth>
  );
}

export default Login;

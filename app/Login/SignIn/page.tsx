'use client';

import React, { useState } from 'react';

import styles from '../page.module.scss';
import SignInx from './SignIn';
import SignUpx from '../SignUp/SignUp';
import { LendsqrLogo } from '@/public/icons/icons';

function SignIn() {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <section className={`flex flex-col full-width ${styles.signIn}`}>
      <span className={`container flex ${styles.logo}`}>
        <LendsqrLogo />
        <button onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </button>
      </span>
      <SignInx />
    </section>
  );
}

export default SignIn;

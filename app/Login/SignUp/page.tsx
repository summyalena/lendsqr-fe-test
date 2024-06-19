'use client';

import React, { useState } from 'react';

import styles from '../page.module.scss';
import SignIn from '../SignIn/SignIn';
import SignUpx from '../SignUp/SignUp';
import { LendsqrLogo } from '@/public/icons/icons';

function SignUp() {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <section className={`flex flex-col full-width ${styles.signIn}`}>
      <span className={`container flex ${styles.logo}`}>
        <LendsqrLogo />
        <span onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </span>
      </span>
      {isSignIn ? <SignIn /> : <SignUpx />}
    </section>
  );
}

export default SignUp;

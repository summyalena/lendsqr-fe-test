'use client';

import React, {useState} from 'react'

import styles from './page.module.scss';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { LendsqrLogo } from '@/public/icons/icons';

function Login() {

  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <section className={`flex flex-col full-width ${styles.signIn}`}>
      <span className={`container flex ${styles.logo}`}>
        <LendsqrLogo/>
        <span onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </span>
      </span>
      {isSignIn ? <SignIn /> : <SignUp />}
    
    </section>
  )
}

export default Login
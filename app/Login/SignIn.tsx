import React from 'react';

import Image from 'next/image';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { LendsqrLogo } from '@/public/icons/icons'
import LoginImage from '../../public/images/pablo_signin.svg';
import styles from './page.module.scss';
import Input from '@/components/ui/Input/input';

function SignIn() {
  return (
    <div className={`container full-width flex ${styles.authWrapper}`}>
    <div>
      <Image src={LoginImage} alt="login_image"/>
    </div>

    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string().required('Username is Required'),
        password: Yup.string().required('Password is Required'),
      })}
      onSubmit={(values, { resetForm }) => {  
      }}
    >
      {({ handleSubmit }) => (
        <form
          className={`full-width flex flex-col ${styles.form}`}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h1>Welcome</h1>
          <p>Enter details to login</p>
          <Input
            type="text"
            name="username"
            label="username"
            placeholder="username"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
          />

          <button type="submit" className={`full-width`}>
            Sign In
          </button>
        </form>
      )}
    </Formik>
  </div>
  )
}

export default SignIn
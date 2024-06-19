'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Formik } from 'formik';

import LoginImage from '@/public/images/pablo_signin.svg';
import styles from '../page.module.scss';
import Input from '@/components/ui/Input/input';
import { addUser } from '../../../components/utils/indexedDB';

interface SignUpFormValues {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

function SignUp() {
  const router = useRouter();

  const onSubmitForm = async (
    values: SignUpFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log('Form values:', values);

    try {
      await addUser(values);
      resetForm();

      router.push('/Login/SignIn');
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };

  return (
    <div className={`container full-width flex ${styles.authWrapper}`}>
      <div>
        <Image src={LoginImage} alt="login_image" />
      </div>

      <Formik
        initialValues={{
          name: '',
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is Required'),
          username: Yup.string().required('Username is Required'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is Required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is Required'),
        })}
        onSubmit={onSubmitForm}
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
            <p>Enter details to Sign Up</p>

            <Input type="text" name="name" label="Name" placeholder="Name" />
            <Input
              type="text"
              name="username"
              label="Username"
              placeholder="Username"
            />
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
            />
            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
            />

            <button type="submit" className={`full-width button-fill`}>
              Sign Up
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SignUp;

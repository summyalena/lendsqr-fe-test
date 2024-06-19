import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import LoginImage from '@/public/images/pablo_signin.svg';
import styles from '../page.module.scss';
import Input from '@/components/ui/Input/input';
import { getUserByUsername } from '@/components/utils/indexedDB';
import { useAuth } from '@/components/utils/context/authContext';

interface SignInFormValues {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const onSubmitForm = async (
    values: SignInFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const userData = await getUserByUsername(values.username);
      if (userData && userData.password === values.password) {
        localStorage.setItem('username', values.username);
        setUser(values.username);
        router.push('/');
      } else {
        console.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Error handling form submission:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`container full-width flex ${styles.authWrapper}`}>
      <div>
        <Image src={LoginImage} alt="login_image" />
      </div>

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string().required('Username is Required'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is Required'),
        })}
        onSubmit={onSubmitForm}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form
            className={`full-width flex flex-col ${styles.form}`}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <h1>Welcome</h1>
            <p>Enter details to Sign In</p>

            <Field
              type="text"
              name="username"
              label="Username"
              placeholder="Username"
              as={Input}
            />
            <ErrorMessage name="username" component="div" />
            
            <Field
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              as={Input}
            />
            <ErrorMessage name="password" component="div" />

            <button
              type="submit"
              className={`full-width button-fill`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;

import { useField } from 'formik';

import styles from './input.module.scss';

// import { DangerIcon } from '@/public/svg/icons';

type InputProps = {
  label: string;
  name: string;
  type: string;
  className?: string;
  placeholder: string;
};

function Input({ label, className, ...props }: InputProps) {
  const [field, meta] = useField(props);

  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      <div className={` flex flex-col ${styles.inputField}`}>
        <label htmlFor={props.name}>{label}</label>
        <input
          className={meta.touched && meta.error ? styles.error : ''}
          {...field}
          {...props}
        />
      </div>

      {meta.touched && meta.error ? (
        <div className={`flex align-y ${styles.invalid}`}>
          {/* <DangerIcon /> */}

          {meta.error}
        </div>
      ) : null}
    </div>
  );
}

export function TextArea({ label, ...props }: InputProps) {
  const [field, meta] = useField(props);

  return (
    <div className={`${styles.textField}`}>
      <label htmlFor={props.name}>{label}</label>
      <textarea
        className={meta.touched && meta.error ? 'invalid' : ''}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.invalid}>{meta.error}</div>
      ) : null}
    </div>
  );
}

export default Input;

import React from 'react';

import styles from './loader.module.scss'; 
import { LendsqrLogo } from '@/public/icons/icons';

function Loader() {
  return (
    <div className={`flex-col ${styles.loaderContainer}`}>
      <LendsqrLogo/>
      <div className={styles.loader}></div>
        </div>
  )
}

export default Loader